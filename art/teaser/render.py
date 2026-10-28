import base64,sys,os
from playwright.sync_api import sync_playwright
V=sys.argv[1];port=sys.argv[2];times=[float(x) for x in sys.argv[3].split(",")] if len(sys.argv)>3 and sys.argv[3]!="all" else None
coin="data:image/png;base64,"+base64.b64encode(open("/home/claude/reavol/art/token/coin64.png","rb").read()).decode()
with sync_playwright() as p:
    b=p.chromium.launch();errs=[];pg=b.new_page(viewport={"width":1240,"height":900});pg.route("**/*",lambda r:r.abort() if r.request.url.startswith("https") else r.continue_());pg.on("pageerror",lambda e:errs.append(str(e)))
    pg.goto(f"http://localhost:{port}/");pg.wait_for_timeout(1500)
    pg.add_script_tag(content=open(f"{V}/teaser.js").read());pg.evaluate("u=>TZ.setCoin(u)",coin)
    fps=30;ts=times if times else [i/fps for i in range(int(21*fps))]
    for i,t in enumerate(ts):
        u=pg.evaluate("t=>{TZ.frame(t);return TZ.cv.toDataURL()}",t)
        name=f"{V}/frames/f{i:04d}.png" if not times else f"{V}/test_{t:.2f}.png"
        open(name,"wb").write(base64.b64decode(u.split(",")[1]))
        if errs:print(errs[:2]);break
    print("done",len(ts),errs[:2]);b.close()
