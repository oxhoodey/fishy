window.TZ=(function(){
const W=180,H=180;const cv=document.createElement('canvas');cv.width=W;cv.height=H;const c=cv.getContext('2d');c.imageSmoothingEnabled=false;
const G={">":"10000010000010000010001000100010000",A:"01110100011000111111100011000110001",B:"11110100011111010001100011000111110",C:"01111100001000010000100001000001111",D:"11110100011000110001100011000111110",E:"11111100001111010000100001000011111",F:"11111100001111010000100001000010000",G:"01111100001000010111100011000101111",H:"10001100011111110001100011000110001",I:"11111001000010000100001000010011111",J:"00111000010000100001100011000101110",K:"10001100101110010010100011000110001",L:"10000100001000010000100001000011111",M:"10001110111010110001100011000110001",N:"10001110011010110011100011000110001",O:"01110100011000110001100011000101110",P:"11110100011000111110100001000010000",Q:"01110100011000110001101011001001101",R:"11110100011000111110100101000110001",S:"01111100000111000001000010000111110",T:"11111001000010000100001000010000100",U:"10001100011000110001100011000101110",V:"10001100011000110001010100101000100",W:"10001100011000110101101011101110001",X:"10001010100010000100010101000110001",Y:"10001100010101000100001000010000100",Z:"11111000010001000100010001000011111",
"0":"01110100011001110101110011000101110","1":"00100011000010000100001000010001110","2":"01110100010000100110010001000011111","3":"11110000010111000001000011000101110","4":"00010001100101010010111110001000010","5":"11111100001111000001000011000101110","6":"01110100001111010001100011000101110","7":"11111000010001000100010000100001000","8":"01110100011000101110100011000101110","9":"01110100011000101111000010000101110",
"!":"00100001000010000100001000000000100","?":"01110100010000100110001000000000100",".":"00000000000000000000000000000000100",":":"00000001000000000000000000010000000","%":"11001110010001000100010001001110011","$":"00100011111010001110001011111000100","-":"00000000000000011111000000000000000","+":"00000001000010011111001000010000000","·":"00000000000000000100000000000000000","'":"00100001000100000000000000000000000",",":"00000000000000000000000000010001000","/":"00001000010001000100010001000010000"," ":"00000000000000000000000000000000000"};
function tw(s,k){return s.length*6*k-k}
function txt(s,x,y,k,col,out,align){s=s.toUpperCase();if(align==="c")x=Math.round(x-tw(s,k)/2);else if(align==="r")x=Math.round(x-tw(s,k));
  const draw=(ox,oy,cl)=>{let cx=x+ox;for(const ch of s){const g=G[ch]||G[" "];for(let i=0;i<35;i++)if(g[i]==="1")prect(c,cx+(i%5)*k,y+oy+Math.floor(i/5)*k,k,k,cl);cx+=6*k}};
  if(out){for(const[ox,oy]of[[-1,0],[1,0],[0,-1],[0,1],[1,1]])draw(ox,oy,out)}draw(0,0,col)}
const cl=(v,a,b)=>Math.max(a,Math.min(b,v)),seg=(t,a,b)=>cl((t-a)/(b-a),0,1);
const E={out:t=>1-Math.pow(1-t,3),back:t=>{const s=1.7;t=t-1;return t*t*((s+1)*t+s)+1},bounce:t=>{const n=7.5625,d=2.75;if(t<1/d)return n*t*t;if(t<2/d)return n*(t-=1.5/d)*t+.75;if(t<2.5/d)return n*(t-=2.25/d)*t+.9375;return n*(t-=2.625/d)*t+.984375}};
let LOGO=null,COIN=null;function logoImg(){if(!LOGO){drawLogo();LOGO=document.getElementById('logo')}return LOGO}
function drawLogoAt(cx,y,k){const L=logoImg();c.drawImage(L,0,0,L.width,L.height,Math.round(cx-L.width*k/2),Math.round(y),L.width*k,L.height*k)}
function frameBox(x,y,w,h,fill){prect(c,x,y,w,h,"#241527");prect(c,x+1,y+1,w-2,h-2,"#8B5A2B");prect(c,x+2,y+1,w-4,1,"#C9894E");prect(c,x+3,y+3,w-6,h-6,fill||"#F6E7C1")}
function wrap(s,n){const out=[];let line="";for(const w of s.split(" ")){if((line+" "+w).trim().length>n){out.push(line.trim());line=w}else line+=" "+w}out.push(line.trim());return out}
function dialog(s,t,t0,cps){const shown=s.slice(0,Math.max(0,Math.floor((t-t0)*(cps||42))));frameBox(0,134,W,46);wrap(shown,27).slice(0,3).forEach((l,i)=>txt(l,8,141+i*11,1,"#3B2416"));
  if(shown.length>=s.length&&Math.floor(t*3)%2)txt("+",W-14,168,1,"#8B5A2B")}
function menu(t,t0,sel,opts){const x=80,y=134;frameBox(x,y,W-x,46,"#FFF6DC");opts.forEach((o,i)=>{const ox=x+14+(i%2)*46,oy=y+11+Math.floor(i/2)*15;txt(o,ox,oy,1,i===sel?"#D7263D":"#3B2416");if(i===sel&&Math.floor(t*4)%2===0)txt(">",ox-8,oy,1,"#D7263D")});
  frameBox(0,y,x+1,46);wrap("WHAT WILL ROBIN DO?",10).forEach((l,i)=>txt(l,8,y+10+i*11,1,"#3B2416"))}

function drawIll(name,x,y,k){const rows=ILL[name]||SPR[name];if(!rows)return;const P3=Object.assign({},ICON_PAL,PALS[name]||{});rows.forEach((row,j)=>{for(let i=0;i<row.length;i++){const ch=row[i];if(ch==="."||ch===" ")continue;prect(c,x+i*k,y+j*k,k,k,P3[ch]||PAL[ch])}})}
function scaled(name,x,y,k,flip,pal){c.save();c.translate(Math.round(x),Math.round(y));c.scale(k,k);spr(c,name,0,0,flip,pal);c.restore()}
function bubble(s,t,t0,cx,tailX,cps,col){if(t<t0)return;const shown=s.slice(0,Math.floor((t-t0)*(cps||30)));const lines=wrap(s,26),n=lines.length,w=Math.min(170,Math.max(...lines.map(l=>tw(l,1)))+14),h=n*10+8,x=cl(Math.round(cx-w/2),5,W-5-w),y=8;
  const pop=E.back(seg(t,t0,t0+.15));if(pop<.2)return;prect(c,x-1,y-1,w+2,h+2,"#241527");prect(c,x,y,w,h,col||"#FFFFFF");for(let i=0;i<5;i++)prect(c,tailX-i+2,y+h+i,Math.max(1,5-i),1,i===4?"#241527":col||"#FFFFFF");prect(c,tailX-3,y+h,1,5,"#241527");
  let left=shown.length;lines.forEach((l,i)=>{const part=l.slice(0,Math.max(0,left));left-=l.length+1;txt(part,x+7,y+5+i*10,1,"#241527")})}

SPR.chefcat=["......oooooooo......", ".....oHHHHHHHHo.....", "....oHHHHHHHHHHo....", "....oHHhHHHhHHHo....", ".....oHHHHHHHHo.....", ".....ohhhhhhhho.....", "..oo..oooooooo..oo..", "..o1o.o222222o.o1o..", "..o21oo2222222o12o..", ".o222222222222222o..", ".o22wweo2222wweo22o.", ".o22weeo2222weeo22o.", ".o222WWWWWnWWWWW22o.", ".o222WWWmWWWmWWW22o.", "..o222WWWmmmWWW22o..", "...oo222222222222oo.", "..o3oAAAAAAAAAAo3o..", ".o32oAAAAAAAAAAo23o.", ".o2ooAAAAaAAAAAoo2o.", "..oo.oAAAAAAAAAo.oo.", "....oAAAAAAAAAAAo...", "....o33oooooo33o....", "....oooo....oooo...."];PALS.chefcat={"o": "#241527", "H": "#FFFFFF", "h": "#D9DEE8", "1": "#FFB3A0", "2": "#FF9A3C", "3": "#D96A1E", "w": "#FFFFFF", "e": "#241527", "W": "#FFF3E0", "n": "#F07A98", "m": "#7A2E3A", "A": "#FFFFFF", "a": "#D9DEE8"};

const H0=118,FL=172,DX=134;
function flame(x,y,now,k){k=k||1;for(let i=0;i<5;i++){const h=Math.round((4+((i*7)%4)+Math.sin(now/60+i)*2)*k);prect(c,x+i*2,y-h,2,h,i%2?"#FF6B2C":"#FFD23F");prect(c,x+i*2,y-Math.round(h*.5),2,1,"#FFF3B0")}}
function heart(x,y,col){prect(c,x,y,2,2,col);prect(c,x+3,y,2,2,col);prect(c,x,y+1,5,2,col);prect(c,x+1,y+3,3,1,col);prect(c,x+2,y+4,1,1,col)}
function tweet(lines,likes,x,y,t,t0){if(t<t0)return;const k=E.back(seg(t,t0,t0+.25)),yy=Math.round(y-(1-k)*20);const w=168,h=20+lines.length*10+12;
  prect(c,x-1,yy-1,w+2,h+2,"#241527");prect(c,x,yy,w,h,"#FFFFFF");
  prect(c,x+5,yy+4,12,12,"#FF9A3C");prect(c,x+7,yy+7,2,2,"#241527");prect(c,x+13,yy+7,2,2,"#241527");prect(c,x+5,yy+3,12,2,"#FFFFFF");
  txt("DEV",x+22,yy+5,1,"#241527");txt("· 2M AGO",x+42,yy+5,1,"#8B8B9A");
  lines.forEach((l,i)=>txt(l,x+22,yy+16+i*10,1,"#241527"));
  const ly=yy+h-10;heart(x+22,ly,"#E8443F");txt(likes,x+30,ly,1,"#E8443F");txt("REPOST",x+90,ly,1,"#8B8B9A")}
function pot(x,y,fill,now,lid){prect(c,x-1,y-1,20,13,"#241527");prect(c,x,y,18,11,"#3A3A55");prect(c,x,y,18,2,"#5C5C7A");prect(c,x-4,y+2,4,2,"#241527");prect(c,x+18,y+2,4,2,"#241527");
  const lv=Math.round(fill*8);if(lv>0){prect(c,x+2,y+10-lv,14,lv,"#FFD23F");for(let i=0;i<4;i++)prect(c,x+3+i*3,y+10-lv,2,1,"#FFF3B0")}
  if(lid){prect(c,x-1,y-3,20,3,"#241527");prect(c,x,y-2,18,1,"#7A7A88");prect(c,x+7,y-5,4,2,"#241527")}
  else if(fill>.05)for(let i=0;i<3;i++){const t2=(now/900+i/3)%1;prect(c,x+4+i*5+Math.round(Math.sin(t2*7+i)*2),y-3-Math.round(t2*12),1,2,`rgba(255,255,255,${(1-t2).toFixed(2)})`)}}
function sack(x,y,sz){const w=Math.round(10+sz*12),h=Math.round(10+sz*12);prect(c,x-w/2-1,y-h-1,w+2,h+2,"#241527");prect(c,x-w/2,y-h,w,h,"#A8683A");prect(c,x-w/2,y-h,w,2,"#C98A4B");prect(c,x-3,y-h-4,6,4,"#241527");prect(c,x-2,y-h-3,4,2,"#A8683A");txt("$",x-2,y-h/2-3,1,"#FFE27A")}
function fishPanel(t,t0,t1,pool){const k=E.back(seg(t,t0,t0+.4))-(t>t1?E.out(seg(t,t1,t1+.3)):0);if(k<=0)return;const x=Math.round(-170+k*(170+8)),y=24,w=164,h=78;
  prect(c,x-2,y-2,w+4,h+4,"#0A1640");prect(c,x,y,w,h,"#14286E");prect(c,x,y,w,12,"#3E8E5E");txt("FISHY · SHARK WATCH · DEV",x+5,y+3,1,"#FFF6DC");
  txt("POOL LIQUIDITY",x+5,y+17,1,"#BDF4FF");txt(money(pool),x+w-5,y+17,1,pool<300000?"#FF8F7A":"#FFF6DC",null,"r");
  prect(c,x+5,y+27,w-10,6,"#241527");prect(c,x+6,y+28,Math.round((w-12)*pool/480000),4,pool<300000?"#E8443F":"#5FCB6A");
  const rows=[["DEV WALLET","SELLING",9.8],["LP LOCK","UNLOCKED",10.6]];rows.forEach(([a,b,tt],i)=>{if(t<tt)return;const yy=y+40+i*13;txt(a,x+5,yy,1,"#BDF4FF");txt(b,x+w-18,yy,1,"#FF8F7A",null,"r");prect(c,x+w-14,yy-1,9,9,"#D7263D");txt("X",x+w-12,yy,1,"#FFFFFF")})}
function money(v){return v>=1e6?"$"+(v/1e6).toFixed(2)+"M":v>=1e3?"$"+Math.round(v/1e3)+"K":"$"+Math.round(v)}
function frame(t){const now=t*1000;c.setTransform(1,0,0,1,0,0);c.clearRect(0,0,W,H);
 const bg=()=>seaBase(c,W,H,now,H0,FL,{dock:true,rich:false});
 // title 0-2.6
 if(t<2.6){bg();c.fillStyle="rgba(10,22,64,.62)";c.fillRect(0,0,W,H);const k=E.back(seg(t,.1,.6));drawLogoAt(W/2,Math.round(-40+k*(14+40)),2);
   if(t>.5)txt("EPISODE 3",W/2,70,1,"#FFD23F","#241527","c");
   if(t>.8){const s=E.back(seg(t,.8,1.2));txt("THE DEV IS",W/2,Math.round(84+(1-s)*16),2,"#FFF6DC","#241527","c");txt("COOKING",W/2,Math.round(102+(1-s)*16),3,"#FFD23F","#9E1B2E","c")}
   if(t>1.3){for(let i=0;i<6;i++)flame(32+i*22,150,now,1.4)}
   if(t>2.35){c.fillStyle="rgba(255,255,255,.7)";c.fillRect(0,0,W,H)}return}
 // end card 25-28
 if(t>=25){const u=t-25;bg();c.fillStyle="rgba(10,22,64,.62)";c.fillRect(0,0,W,H);const k=E.back(seg(u,0,.5));drawLogoAt(W/2,Math.round(-50+k*(14+50)),2);
   if(u>.4){const s="IS THIS TOKEN FISHY?",w=tw(s,1)+14;prect(c,W/2-w/2-2,74,w+4,15,"#BDF4FF");prect(c,W/2-w/2,76,w,11,"#14286E");txt(s,W/2,78,1,"#FFF6DC",null,"c")}
   if(COIN&&u>.7){const a=(u-.7)*4,sx=Math.abs(Math.cos(a)),cw=Math.max(2,Math.round(38*sx));c.drawImage(COIN,0,0,64,64,Math.round(W/2-cw/2),96,cw,38)}
   if(u>1.0)txt("BUILT ON ROBINHOOD CHAIN",W/2,144,1,"#FFF6DC","#241527","c");if(u>1.3)txt("NEXT: EP. 4 · YOUR TICKERS",W/2,158,1,"#FFD23F","#241527","c");return}
 bg();
 // liquidity in the pot drains from 8.0 to 17.0; the sack fills
 const pool=t<8?480000:t<17?Math.round(480000-seg(t,8,17)*(480000-12000)):12000,fill=pool/480000,sz=1-fill;
 const lidOn=t<16.6,catGone=seg(t,17.6,18.4);
 // happy holders: little fish in front of the dock
 for(let i=0;i<5;i++){const x=60+i*14+Math.round(Math.sin(now/500+i)*2),y=H0+10+((i*7)%10);spr(c,"minnow",x,y,true);if(t<15&&Math.sin(now/300+i*1.7)>.7)heart(x+3,y-7,"#FF6B6B")}
 // stove table on the dock, the pot, the cat and his sack
 prect(c,124,H0-15,26,3,"#8B5A2B");prect(c,124,H0-15,26,1,"#C9894E");prect(c,126,H0-12,2,8,"#5C3A1A");prect(c,146,H0-12,2,8,"#5C3A1A");
 if(t<17)flame(128,H0-16,now,.8);
 pot(128,H0-27,fill,now,lidOn&&!(t>8&&t<16.6&&Math.floor(t*2)%2===0));
 const cx=Math.round(150+catGone*60),cy=H0-5-23+(catGone>0?-Math.abs(Math.sin(now/60))*2:0);
 if(cx<W+5){spr(c,"chefcat",cx,cy,false);sack(cx+26,H0-5,sz)}
 // coins flying pot -> sack while "cooking"
 if(t>8&&t<16.6)for(let i=0;i<3;i++){const k=((t*1.6+i/3)%1),sx=137,sy=H0-28,ex=176,ey=H0-18,X=sx+(ex-sx)*k,Y=sy+(ey-sy)*k-Math.sin(k*Math.PI)*14;spr(c,"coin",X-1,Y-1)}
 if(t>=16.6&&t<17.6){txt("*CLANG*",137,H0-44,1,"#FFFFFF","#241527","c");prect(c,136,H0-22,3,3,"#FFD23F")}
 // Robin
 const P0={ang:45,bend:0,dx:0,face:t>6&&t<8?"wow":t>17.6&&t<21?"strain":t>21?"grin":"",spin:false,shake:0};
 const bob=boatRobin(c,4,H0,now,P0),rx=14,ry=H0-31+bob,hdx=rx+28,hdy=ry+23;robinArm(c,rx+25,ry+21,hdx,hdy);if(P0.face)robinFace(c,rx,ry,P0.face,now);
 if(t>=8&&t<13){prect(c,hdx-1,hdy-6,8,11,"#241527");prect(c,hdx,hdy-5,6,9,"#3FA9F5");prect(c,hdx+1,hdy-4,4,2,"#BDF4FF")}else rodBent(c,hdx+2,hdy+1,48,36,2,false,now);
 // tweets, dialogue, panel
 if(t<6){tweet(["DEV IS COOKING.","TRUST THE PROCESS."],t<3.4?"1.2K":t<4.6?"6.8K":"12.4K",6,8,t,2.9)}
 else if(t<8)bubble("COOKING WHAT, EXACTLY?",t,6.1,58,40,24);
 else if(t<12.8)fishPanel(t,8.0,12.5,pool);
 else if(t<15.0)tweet(["STILL COOKING.","DON'T FUD."],t<14?"311":"88",6,8,t,12.9);
 else if(t<16.6)bubble("...THE POOL IS ALMOST EMPTY.",t,15.1,58,40,26);
 else if(t<17.6)bubble("WAIT. WHERE'S THE LIQUIDITY?",t,16.7,58,40,30);
 else if(t<21.0){if(t<19.3){const s=E.back(seg(t,17.9,18.2));if(s>.2)txt("THE DEV WAS COOKING...",W/2,22,1,"#FFFFFF","#241527","c")}
   else{const s=E.back(seg(t,19.3,19.6));if(s>.2){txt("...YOUR",W/2,6,2,"#FFD23F","#9E1B2E","c");txt("LIQUIDITY.",W/2,24,2,"#FFD23F","#9E1B2E","c")}
     if(t>19.9){const lab="RUG M7.2",sc=seg(t,19.9,20.05)<1?3:2,ww=tw(lab,sc)+12;prect(c,W/2-ww/2-1,47,ww+2,7*sc+10,"#241527");prect(c,W/2-ww/2,48,ww,7*sc+8,"#D7263D");txt(lab,W/2,52,sc,"#FFFFFF",null,"c")}}}
 else{bubble("WATCH THE POOL, NOT THE TWEETS.",t,21.0,58,40,30);
   if(t>22.4){const k=E.back(seg(t,22.4,22.7));const y=Math.round(52+(1-k)*20);prect(c,10,y-1,160,38,"#241527");prect(c,11,y,158,36,"#FFD23F");txt("REPLY WITH A ROBINHOOD",W/2,y+5,1,"#241527",null,"c");txt("CHAIN TICKER",W/2,y+15,1,"#241527",null,"c");txt("ROBIN CHECKS IT IN EP. 4",W/2,y+26,1,"#9E1B2E",null,"c")}}
 if(t>24.7){c.fillStyle=`rgba(255,255,255,${(seg(t,24.7,25)*.8).toFixed(2)})`;c.fillRect(0,0,W,H)}
}
return{cv,frame,setCoin(u){return new Promise(r=>{const im=new Image();im.onload=()=>{COIN=im;r()};im.src=u})}};
})();
