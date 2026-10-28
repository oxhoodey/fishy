# FISHY PUSH - one-button updater for Windows (PowerShell 5.1+, WinForms, no installs)
# Takes the newest Downloads\fishy*.zip, unpacks it over Downloads\fishy (git history kept),
# commits and pushes to GitHub. Railway redeploys on every push to main.
Add-Type -AssemblyName System.Windows.Forms
Add-Type -AssemblyName System.Drawing
[System.Windows.Forms.Application]::EnableVisualStyles()

$DL     = Join-Path $env:USERPROFILE 'Downloads'
$Repo   = Join-Path $DL 'fishy'
$Remote = 'https://github.com/oxhoodey/fishy.git'
$GitHub = 'https://github.com/oxhoodey/fishy'
$env:GIT_TERMINAL_PROMPT = '0'
$ARROW  = [string][char]0x2192

# ---------- palette (cream / yellow / ink, like a bold mobile game UI) ----------
function RGB([int]$r,[int]$g,[int]$b){ [System.Drawing.Color]::FromArgb($r,$g,$b) }
$CREAM = RGB 244 241 234; $INK = RGB 17 17 17; $YEL = RGB 255 198 46; $YEL2 = RGB 242 169 0; $WHITE = RGB 255 255 255; $LINE = RGB 226 221 210; $MUTED = RGB 120 112 98
function Mk-Font([string]$name,[float]$size,[System.Drawing.FontStyle]$style){
  $f = New-Object System.Drawing.Font($name,$size,$style)
  if ($f.Name -ne $name) { $f = New-Object System.Drawing.Font('Arial Black',$size,$style) }
  return $f
}
$FT_TITLE = Mk-Font 'Segoe UI Black' 30 ([System.Drawing.FontStyle]::Regular)
$FT_HERO  = Mk-Font 'Segoe UI Black' 22 ([System.Drawing.FontStyle]::Regular)
$FT_BTN   = Mk-Font 'Segoe UI Black' 15 ([System.Drawing.FontStyle]::Regular)
$FT_BOLD  = Mk-Font 'Segoe UI' 10 ([System.Drawing.FontStyle]::Bold)
$FT_STAT  = Mk-Font 'Segoe UI Black' 13 ([System.Drawing.FontStyle]::Regular)
$FT_SMALL = Mk-Font 'Segoe UI' 8.5 ([System.Drawing.FontStyle]::Regular)
$FT_MONO  = New-Object System.Drawing.Font('Consolas', 9)

$FISH = @(
  '.......oooooooo..........',
  '.....oo11112222oo........',
  '....o111222242223o.......',
  '...o11owwwo2244223o...oo.',
  '..o112owweo22222333o.o33o',
  '..o122owweo22224433oo333o',
  '.opppooooo222224433o3333o',
  'oppppPPo22222222333o333o.',
  'ommmmmmo22242222333oo33o.',
  'oppppPPbbbbbbbbb333o.oo..',
  '.oPPPbbbbbbbbbbBB3o......',
  '..ooBbbbbbbbbBBBoo.......',
  '....ooBBBBBBBBoo.........',
  '......oooooooo...........'
)
$FISHPAL = New-Object 'System.Collections.Generic.Dictionary[string,System.Drawing.Color]' ([System.StringComparer]::Ordinal)
foreach ($kv in @(@('o',$INK),@('1',(RGB 255 222 110)),@('2',$YEL),@('3',$YEL2),@('4',$INK),@('b',$WHITE),@('B',(RGB 236 230 216)),@('p',(RGB 255 229 138)),@('P',(RGB 242 200 80)),@('m',$INK),@('w',$WHITE),@('e',$INK))) { $FISHPAL[$kv[0]] = $kv[1] }

function Find-Git {
  $c = Get-Command git -ErrorAction SilentlyContinue
  if ($c) { return $c.Source }
  foreach ($p in @("$env:ProgramFiles\Git\cmd\git.exe", "${env:ProgramFiles(x86)}\Git\cmd\git.exe",
                   "$env:LOCALAPPDATA\Programs\Git\cmd\git.exe", 'C:\msys64\usr\bin\git.exe', 'C:\msys64\ucrt64\bin\git.exe')) {
    if ($p -and (Test-Path $p)) { return $p }
  }
  return $null
}
function Get-NewestZip { Get-ChildItem -Path $DL -Filter 'fishy*.zip' -File -ErrorAction SilentlyContinue | Sort-Object LastWriteTime -Descending | Select-Object -First 1 }

function Round-Path([System.Drawing.RectangleF]$r, [float]$rad) {
  $p = New-Object System.Drawing.Drawing2D.GraphicsPath
  $d = [Math]::Min($rad * 2, [Math]::Min($r.Width, $r.Height))
  $p.AddArc($r.X, $r.Y, $d, $d, 180, 90); $p.AddArc($r.Right - $d, $r.Y, $d, $d, 270, 90)
  $p.AddArc($r.Right - $d, $r.Bottom - $d, $d, $d, 0, 90); $p.AddArc($r.X, $r.Bottom - $d, $d, $d, 90, 90)
  $p.CloseFigure(); return $p
}
function Smooth($g) { $g.SmoothingMode = 'AntiAlias'; $g.TextRenderingHint = 'ClearTypeGridFit' }
$DB = [System.Windows.Forms.Control].GetProperty('DoubleBuffered', [System.Reflection.BindingFlags]'NonPublic,Instance')
function Buffered($ctl) { $DB.SetValue($ctl, $true, $null) }

# ---------- state shown in the UI ----------
$script:busy = $false; $script:hover = $false
$script:zipText = 'no fishy*.zip yet'; $script:zipTime = '--:--'; $script:zipSize = '--'; $script:lastPush = '--'
$script:heroTitle = 'READY TO SHIP'

$form = New-Object System.Windows.Forms.Form
$form.Text = 'FISHY PUSH'; $form.ClientSize = New-Object System.Drawing.Size(440, 760)
$form.StartPosition = 'CenterScreen'; $form.BackColor = $CREAM; $form.FormBorderStyle = 'FixedSingle'; $form.MaximizeBox = $false
Buffered $form
$form.Add_Paint({ param($s, $e)
  $g = $e.Graphics; Smooth $g
  $pen = New-Object System.Drawing.Pen($LINE, 1.4)
  for ($i = 0; $i -lt 9; $i++) { $g.DrawEllipse($pen, 250 - $i * 34, 520 - $i * 26, 120 + $i * 68, 90 + $i * 52) }
  for ($i = 0; $i -lt 6; $i++) { $g.DrawEllipse($pen, -120 - $i * 30, -60 - $i * 22, 200 + $i * 60, 150 + $i * 44) }
  $g.DrawString('FISHY', $FT_TITLE, (New-Object System.Drawing.SolidBrush($INK)), 18, 10)
  $pill = Round-Path (New-Object System.Drawing.RectangleF(160, 26, 74, 30)) 15
  $g.FillPath((New-Object System.Drawing.SolidBrush($INK)), $pill)
  $g.DrawString('PUSH', $FT_BOLD, (New-Object System.Drawing.SolidBrush($YEL)), 175, 31)
  $g.FillEllipse((New-Object System.Drawing.SolidBrush($INK)), 380, 18, 42, 42)
  $g.DrawString('F', $FT_STAT, (New-Object System.Drawing.SolidBrush($YEL)), 391, 26)
  # pager dots, like the reference
  for ($i = 0; $i -lt 5; $i++) { $w = 8; if ($i -eq 0) { $w = 22 }; $x = 176 + $i * 16; if ($i -gt 0) { $x += 14 }
    $c = $LINE; if ($i -eq 0) { $c = $YEL }; $g.FillPath((New-Object System.Drawing.SolidBrush($c)), (Round-Path (New-Object System.Drawing.RectangleF($x, 736, $w, 8)) 4)) }
})

# ---------- hero card ----------
$hero = New-Object System.Windows.Forms.Panel
$hero.Location = New-Object System.Drawing.Point(18, 76); $hero.Size = New-Object System.Drawing.Size(404, 270); $hero.BackColor = $CREAM
Buffered $hero
$hero.Add_Paint({ param($s, $e)
  $g = $e.Graphics; Smooth $g
  $r = New-Object System.Drawing.RectangleF(1, 1, 401, 267)
  $g.FillPath((New-Object System.Drawing.SolidBrush($YEL)), (Round-Path $r 30))
  $g.DrawPath((New-Object System.Drawing.Pen($INK, 3)), (Round-Path $r 30))
  # doodle stars and bubbles
  $ink = New-Object System.Drawing.SolidBrush($INK); $wb = New-Object System.Drawing.SolidBrush($WHITE); $pen = New-Object System.Drawing.Pen($INK, 3)
  foreach ($st in @(@(330, 34, 14), @(364, 80, 8), @(300, 92, 6), @(40, 200, 9))) {
    $cx = $st[0]; $cy = $st[1]; $R = $st[2]; $pts = New-Object 'System.Drawing.PointF[]' 10
    for ($k = 0; $k -lt 10; $k++) { $a = -[Math]::PI / 2 + $k * [Math]::PI / 5; $rr = $R; if ($k % 2) { $rr = $R * 0.45 }; $pts[$k] = New-Object System.Drawing.PointF(($cx + [Math]::Cos($a) * $rr), ($cy + [Math]::Sin($a) * $rr)) }
    $g.FillPolygon($wb, $pts); $g.DrawPolygon((New-Object System.Drawing.Pen($INK, 2.5)), $pts)
  }
  foreach ($bb in @(@(66, 60, 10), @(86, 36, 6), @(52, 30, 4))) { $g.FillEllipse($wb, $bb[0], $bb[1], $bb[2], $bb[2]); $g.DrawEllipse((New-Object System.Drawing.Pen($INK, 2)), $bb[0], $bb[1], $bb[2], $bb[2]) }
  # the chunky FISHY fish, drawn pixel by pixel
  $px = 9; $ox = 92; $oy = 42
  for ($j = 0; $j -lt $FISH.Count; $j++) { $row = $FISH[$j]
    for ($i = 0; $i -lt $row.Length; $i++) { $ch = [string]$row[$i]; if ($ch -eq '.') { continue }
      if (-not $FISHPAL.ContainsKey($ch)) { continue }; $col = $FISHPAL[$ch]
      $g.FillRectangle((New-Object System.Drawing.SolidBrush($col)), $ox + $i * $px, $oy + $j * $px, $px, $px) } }
  $g.DrawString($script:heroTitle, $FT_HERO, $ink, 22, 180)
  $g.DrawString($script:zipText, $FT_BOLD, $ink, 25, 222)
})
$form.Controls.Add($hero)

# ---------- stat bubbles ----------
$stats = New-Object System.Windows.Forms.Panel
$stats.Location = New-Object System.Drawing.Point(18, 356); $stats.Size = New-Object System.Drawing.Size(404, 92); $stats.BackColor = $CREAM
Buffered $stats
$stats.Add_Paint({ param($s, $e)
  $g = $e.Graphics; Smooth $g
  $items = @(@('ZIP', $script:zipTime), @('SIZE', $script:zipSize), @('LAST PUSH', $script:lastPush))
  for ($k = 0; $k -lt 3; $k++) {
    $r = New-Object System.Drawing.RectangleF((2 + $k * 135), 2, 128, 86)
    $g.FillPath((New-Object System.Drawing.SolidBrush($WHITE)), (Round-Path $r 40)); $g.DrawPath((New-Object System.Drawing.Pen($INK, 2)), (Round-Path $r 40))
    $sf = New-Object System.Drawing.StringFormat; $sf.Alignment = 'Center'
    $g.DrawString($items[$k][1], $FT_STAT, (New-Object System.Drawing.SolidBrush($INK)), (New-Object System.Drawing.RectangleF($r.X, 18, $r.Width, 30)), $sf)
    $g.DrawString($items[$k][0], $FT_SMALL, (New-Object System.Drawing.SolidBrush($MUTED)), (New-Object System.Drawing.RectangleF($r.X, 52, $r.Width, 20)), $sf)
  }
})
$form.Controls.Add($stats)

# ---------- commit message ----------
$msgCard = New-Object System.Windows.Forms.Panel
$msgCard.Location = New-Object System.Drawing.Point(18, 458); $msgCard.Size = New-Object System.Drawing.Size(404, 54); $msgCard.BackColor = $CREAM
Buffered $msgCard
$msgCard.Add_Paint({ param($s, $e) $g = $e.Graphics; Smooth $g; $r = New-Object System.Drawing.RectangleF(1, 1, 401, 51)
  $g.FillPath((New-Object System.Drawing.SolidBrush($WHITE)), (Round-Path $r 26)); $g.DrawPath((New-Object System.Drawing.Pen($INK, 2)), (Round-Path $r 26)) })
$msgBox = New-Object System.Windows.Forms.TextBox
$msgBox.BorderStyle = 'None'; $msgBox.Font = New-Object System.Drawing.Font('Segoe UI', 11); $msgBox.BackColor = $WHITE
$msgBox.Location = New-Object System.Drawing.Point(22, 16); $msgBox.Size = New-Object System.Drawing.Size(360, 24)
$hint = 'Commit message (optional)'
$msgBox.Text = $hint; $msgBox.ForeColor = $MUTED
$msgBox.Add_GotFocus({ if ($msgBox.Text -eq $hint) { $msgBox.Text = ''; $msgBox.ForeColor = $INK } })
$msgBox.Add_LostFocus({ if (-not $msgBox.Text.Trim()) { $msgBox.Text = $hint; $msgBox.ForeColor = $MUTED } })
$msgCard.Controls.Add($msgBox)
$form.Controls.Add($msgCard)

# ---------- the button ----------
$btn = New-Object System.Windows.Forms.Panel
$btn.Location = New-Object System.Drawing.Point(18, 522); $btn.Size = New-Object System.Drawing.Size(404, 70); $btn.BackColor = $CREAM
$btn.Cursor = [System.Windows.Forms.Cursors]::Hand
Buffered $btn
$btn.Add_Paint({ param($s, $e)
  $g = $e.Graphics; Smooth $g; $r = New-Object System.Drawing.RectangleF(1, 1, 401, 67)
  $fill = $INK; if ($script:busy) { $fill = (RGB 70 70 70) }
  $g.FillPath((New-Object System.Drawing.SolidBrush($fill)), (Round-Path $r 34))
  $txt = 'Push to GitHub   ' + $ARROW; if ($script:busy) { $txt = 'Pushing...' }
  $tc = $WHITE; if ($script:hover -and -not $script:busy) { $tc = $YEL }
  $sf = New-Object System.Drawing.StringFormat; $sf.Alignment = 'Center'; $sf.LineAlignment = 'Center'
  $g.DrawString($txt, $FT_BTN, (New-Object System.Drawing.SolidBrush($tc)), $r, $sf)
})
$btn.Add_MouseEnter({ $script:hover = $true; $btn.Invalidate() })
$btn.Add_MouseLeave({ $script:hover = $false; $btn.Invalidate() })
$form.Controls.Add($btn)

# ---------- log card ----------
$logCard = New-Object System.Windows.Forms.Panel
$logCard.Location = New-Object System.Drawing.Point(18, 602); $logCard.Size = New-Object System.Drawing.Size(404, 124); $logCard.BackColor = $CREAM
Buffered $logCard
$logCard.Add_Paint({ param($s, $e) $g = $e.Graphics; Smooth $g; $r = New-Object System.Drawing.RectangleF(1, 1, 401, 121)
  $g.FillPath((New-Object System.Drawing.SolidBrush($WHITE)), (Round-Path $r 22)); $g.DrawPath((New-Object System.Drawing.Pen($INK, 2)), (Round-Path $r 22)) })
$log = New-Object System.Windows.Forms.RichTextBox
$log.Font = $FT_MONO; $log.BackColor = $WHITE; $log.ForeColor = $INK; $log.ReadOnly = $true; $log.BorderStyle = 'None'
$log.Location = New-Object System.Drawing.Point(16, 12); $log.Size = New-Object System.Drawing.Size(372, 100)
$logCard.Controls.Add($log)
$form.Controls.Add($logCard)

$open = New-Object System.Windows.Forms.LinkLabel
$open.Text = 'Open repo'; $open.LinkColor = $INK; $open.ActiveLinkColor = $YEL2; $open.Font = $FT_BOLD; $open.BackColor = $CREAM
$open.AutoSize = $true; $open.Location = New-Object System.Drawing.Point(352, 731)
$open.Add_LinkClicked({ Start-Process $GitHub })
$form.Controls.Add($open)

function Log([string]$text, [string]$kind = '') {
  $c = $INK
  if ($kind -eq 'ok')   { $c = (RGB 30 140 70) }
  if ($kind -eq 'err')  { $c = (RGB 205 40 60) }
  if ($kind -eq 'warn') { $c = (RGB 190 120 0) }
  $log.SelectionStart = $log.TextLength; $log.SelectionColor = $c
  $log.AppendText($text + "`r`n"); $log.ScrollToCaret()
  [System.Windows.Forms.Application]::DoEvents()
}

function Refresh-Info {
  $z = Get-NewestZip
  if ($z) { $script:zipText = "$($z.Name)  -  downloaded $($z.LastWriteTime.ToString('dd MMM HH:mm'))"; $script:zipTime = $z.LastWriteTime.ToString('HH:mm')
            $script:zipSize = ('{0:N1} MB' -f ($z.Length / 1MB)) }
  else { $script:zipText = 'no fishy*.zip in Downloads yet'; $script:zipTime = '--:--'; $script:zipSize = '--' }
  $g = Find-Git
  if ($g -and (Test-Path (Join-Path $Repo '.git'))) { $lp = & $g -C $Repo log -1 --format=%cr 2>$null; if ($lp) { $script:lastPush = ($lp -replace ' ago', '') } }
  $hero.Invalidate(); $stats.Invalidate()
}

function Run-Git([string[]]$GitArgs) {
  $out = & $script:Git -C $Repo @GitArgs 2>&1
  foreach ($line in $out) { if ("$line".Trim()) { Log ("  " + "$line") } }
  return $LASTEXITCODE
}

function Do-Push {
  if ($script:busy) { return }
  $script:busy = $true; $btn.Invalidate(); $log.Clear(); $script:heroTitle = 'SHIPPING...'; $hero.Invalidate()
  $ok = $false
  try {
    $script:Git = Find-Git
    if (-not $script:Git) { Log 'Git not found. Install Git for Windows (git-scm.com) and reopen.' 'err'; return }
    if ($script:Git -like 'C:\msys64\*') { $mh = "C:\msys64\home\$env:USERNAME"; if (Test-Path $mh) { $env:HOME = $mh } }
    $zip = Get-NewestZip
    if (-not $zip) { Log "No fishy*.zip in $DL" 'err'; return }
    Log "zip  $($zip.Name)  ($($zip.LastWriteTime.ToString('dd/MM HH:mm')))"
    $tmp = Join-Path $env:TEMP ('fishy_push_' + [guid]::NewGuid().ToString('N'))
    Log 'unpacking...'
    Expand-Archive -LiteralPath $zip.FullName -DestinationPath $tmp -Force
    $src = Join-Path $tmp 'fishy'
    if (-not (Test-Path $src)) { Log 'The zip has no fishy\ folder inside' 'err'; return }
    if (-not (Test-Path $Repo)) { New-Item -ItemType Directory -Path $Repo | Out-Null }
    robocopy "$src" "$Repo" /E /NFL /NDL /NJH /NJS /NP /R:1 /W:1 | Out-Null
    if ($LASTEXITCODE -ge 8) { Log "Copy failed (robocopy $LASTEXITCODE)" 'err'; return }
    Remove-Item -LiteralPath $tmp -Recurse -Force -ErrorAction SilentlyContinue
    if (-not (Test-Path (Join-Path $Repo '.git'))) {
      Log "linking folder to $Remote" 'warn'
      Run-Git @('init', '-q') | Out-Null; Run-Git @('branch', '-M', 'main') | Out-Null; Run-Git @('remote', 'add', 'origin', $Remote) | Out-Null
      if ((Run-Git @('fetch', '-q', 'origin', 'main')) -eq 0) { Run-Git @('reset', '-q', '--soft', 'origin/main') | Out-Null }
    }
    Run-Git @('add', '-A') | Out-Null
    & $script:Git -C $Repo diff --cached --quiet 2>$null
    if ($LASTEXITCODE -eq 0) { Log 'Nothing changed. This zip is probably old or already pushed.' 'warn'; Run-Git @('log', '--oneline', '-1') | Out-Null; return }
    Log 'changed files:'; Run-Git @('status', '--short') | Out-Null
    $msg = $msgBox.Text.Trim(); if (-not $msg -or $msg -eq $hint) { $msg = 'Update FISHY ' + (Get-Date).ToString('yyyy-MM-dd HH:mm') }
    if ((Run-Git @('commit', '-q', '-m', $msg)) -ne 0) { Log 'Commit failed. First time? git config --global user.name / user.email' 'err'; return }
    Log 'pushing to GitHub...'
    if ((Run-Git @('push', '-u', 'origin', 'main')) -ne 0) { Log 'Push failed. If it is about login: run "git push" once in Git Bash so GitHub remembers you.' 'err'; return }
    Log "DONE. Railway is deploying: $msg" 'ok'; $ok = $true
    $msgBox.Text = $hint; $msgBox.ForeColor = $MUTED
  } catch { Log ('Error: ' + $_.Exception.Message) 'err' }
  finally {
    $script:busy = $false; if ($ok) { $script:heroTitle = 'SHIPPED!' } else { $script:heroTitle = 'READY TO SHIP' }
    $btn.Invalidate(); Refresh-Info
  }
}

$btn.Add_Click({ Do-Push })
$form.Add_Activated({ Refresh-Info })
Refresh-Info
[void]$form.ShowDialog()
