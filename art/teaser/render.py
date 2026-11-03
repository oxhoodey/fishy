import base64,sys,subprocess,os
from playwright.sync_api import sync_playwright
V=sys.argv[1];port=sys.argv[2];mode=sys.argv[3]
coin="data:image/png;base64,"+base64.b64encode(open("/home/claude/reavol/art/token/coin64.png","rb").read()).decode()
with sync_playwright() as p:
    b=p.chromium.launch();errs=[];pg=b.new_page(viewport={"width":1240,"height":900});pg.route("**/*",lambda r:r.abort() if r.request.url.startswith("https") else r.continue_());pg.on("pageerror",lambda e:errs.append(str(e)))
    pg.goto(f"http://localhost:{port}/");pg.wait_for_timeout(1500);pg.evaluate("c=>window.LIVE_CA=c",os.environ.get("LIVE_CA",""));pg.add_script_tag(content=open(f"{V}/teaser16.js").read());pg.evaluate("u=>TZ.setCoin(u)",coin)
    grab="t=>{TZ.frame(t);const o=document.createElement('canvas');o.width=1080;o.height=1080;const x=o.getContext('2d');x.imageSmoothingEnabled=false;x.drawImage(TZ.cv,0,0,1080,1080);return o.toDataURL('image/jpeg',.92)}"
    if mode!="all":
        for t in [float(x) for x in mode.split(",")]:
            d=pg.evaluate(grab,t);open(f"{V}/t_{t:.2f}.jpg","wb").write(base64.b64decode(d.split(",")[1]))
    else:
        tmp=f"{V}/part.tmp.mp4";ff=subprocess.Popen(["ffmpeg","-y","-loglevel","error","-f","image2pipe","-framerate","30","-c:v","mjpeg","-i","-","-i",f"{V}/live.wav","-c:v","libx264","-preset","veryfast","-crf","18","-pix_fmt","yuv420p","-c:a","aac","-b:a","192k","-shortest",tmp],stdin=subprocess.PIPE)
        for i in range(15*30):
            d=pg.evaluate(grab,i/30);ff.stdin.write(base64.b64decode(d.split(",")[1]))
            if errs:print(errs[:2]);break
        ff.stdin.close()
        if ff.wait()==0:os.replace(tmp,f"{V}/{sys.argv[4]}")
    print("done",errs[:2]);b.close()
