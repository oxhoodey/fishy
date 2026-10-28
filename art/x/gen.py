import base64,sys
from playwright.sync_api import sync_playwright
D=sys.argv[1]
JS_BANNER=r"""()=>{const LW=500,LH=167,H0=125,floorY=159,now=+NOWV;const cv=document.createElement('canvas');cv.width=LW;cv.height=LH;const c=cv.getContext('2d');c.imageSmoothingEnabled=false;
 seaBase(c,LW,LH,now,H0,floorY,{dock:true,rich:true});
 [["bass",40,137,false],["koi",120,145,true],["trout",190,134,false],["minnow",95,131,true],["minnow",410,144,false],["bass",330,138,true],["koi",440,132,false],["trout",280,148,true]].forEach(([n,x,y,f])=>spr(c,n,x,y,f));
 for(const[x,y]of[[100,143],[200,132],[340,149],[452,130]])spr(c,"sparkle",x,y);
 [[150,H0-6,false],[166,H0-6,true],[330,H0-6,false],[452,H0-6,true]].forEach(([x,y,f])=>spr(c,"duck",x,y,f));
 const bx=206,P0={ang:40,bend:5,dx:0,face:"wow",spin:false,shake:0};const bob=boatRobin(c,bx,H0,now,P0),rx=bx+10,ry=H0-31+bob,lift=Math.max(0,Math.min(1,(P0.ang-30)/60)),hdx=Math.round(rx+28-lift*3),hdy=Math.round(ry+23-lift*6);
 robinArm(c,rx+25,ry+21,hdx,hdy);robinFace(c,rx,ry,"wow",now);const tip=rodBent(c,hdx+2,hdy+1,P0.ang,40,P0.bend,true,now),tx=Math.round(tip.x),ty=Math.round(tip.y);
 const fx=bx+104;pline(c,tx,ty,fx,H0-6,"#FFFFFF");
 sprTilt(c,"salmon",fx-9,H0-16,true,null,-.35);for(let q=0;q<7;q++)prect(c,fx-8+q*2,H0-1-((q%2)?4:2),1,1,"#FFFFFF");prect(c,fx-10,H0,20,1,"#E6FBFF");
 for(let a=0;a<12;a++){const an=a/12*Math.PI*2,r=a%2?9:6;prect(c,fx+16+Math.cos(an)*r,H0-26+Math.sin(an)*r,2,2,"#FFFFFF")}prect(c,fx+12,H0-30,9,9,"#FFFFFF");prect(c,fx+16,H0-29,1,5,"#D7263D");prect(c,fx+16,H0-23,1,1,"#D7263D");
 return cv.toDataURL()}"""
JS_PFP=r"""()=>{const W=50;const cv=document.createElement('canvas');cv.width=W;cv.height=W;const c=cv.getContext('2d');
 const sk=["#1F86E0","#2A93E8","#379FEE","#46ABF2","#57B6F5","#6CC1F8","#83CCFA","#9DD8FB"];for(let i=0;i<8;i++)prect(c,0,i*4,W,4,sk[i]);
 for(let dy=-5;dy<=5;dy++){const w2=Math.round(Math.sqrt(25-dy*dy));prect(c,37-w2,10+dy,w2*2,1,dy<-2?"#FFF8D0":dy>2?"#FFC93C":"#FFE066")}
 ridge(c,W,33,16,"pfp",["#8FA9DA","#7590C6","#6A82B4"],true);
 for(let x=-2;x<W+3;x+=4)pine(c,x,35,6+((x*7)%4),["#123A22","#1D5A33","#2E7D46","#4FA35E"]);
 prect(c,0,34,W,2,"#6DCB5A");const deep=["#5AD2F2","#45C0EA","#36ABDD","#2B95CC"];for(let i=0;i<4;i++)prect(c,0,36+i*4,W,4,deep[i]);prect(c,0,36,W,1,"#D8F7FF");
 for(let x=1;x<W;x+=5)prect(c,x,38+(x%3),3,1,"#9BE9F8");
 spr(c,"robinUp",8,19);
 // boat rim across the bottom
 prect(c,0,44,W,6,"#663624");prect(c,0,44,W,1,"#241527");prect(c,0,45,W,2,"#E8A866");prect(c,0,47,W,1,"#D39452");prect(c,0,48,W,2,"#9C5C33");for(let x=4;x<W;x+=11)prect(c,x,48,1,1,"#FFE27A");
 robinFace(c,8,19,"grin",0);
 pline(c,37,41,46,13,"#2A1A10");pline(c,38,41,47,13,"#C9A06A");prect(c,46,12,2,1,"#FFE27A");pline(c,47,13,47,22,"#FFFFFF");
 sprTilt(c,"salmon",6,7,true,null,-.3);for(let q=0;q<4;q++)prect(c,8+q*3,18-(q%2),1,1,"#FFFFFF");spr(c,"sparkle",21,3);spr(c,"sparkle",44,25);
 return cv.toDataURL()}"""
with sync_playwright() as p:
    b=p.chromium.launch();pg=b.new_page(viewport={"width":1240,"height":900});pg.route("**/*",lambda r:r.abort() if r.request.url.startswith("https") else r.continue_())
    pg.goto("http://localhost:8810/");pg.wait_for_timeout(1500)
    for nowv in [52000,61000,76000]:
        u=pg.evaluate(JS_BANNER.replace("NOWV",str(nowv)));open(f"{D}/banner_low_{nowv}.png","wb").write(base64.b64decode(u.split(",")[1]))
    u=pg.evaluate(JS_PFP);open(f"{D}/pfp_low.png","wb").write(base64.b64decode(u.split(",")[1]))
    u=pg.evaluate("()=>{drawLogo();return document.getElementById('logo').toDataURL()}");open(f"{D}/logo_low.png","wb").write(base64.b64decode(u.split(",")[1]))
    b.close()
