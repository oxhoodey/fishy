// Teaser renderer: runs inside the FISHY page so it can reuse the game's engine (seaBase, sprites, Robin poses).
window.TZ=(function(){
const W=320,H=180;const cv=document.createElement('canvas');cv.width=W;cv.height=H;const c=cv.getContext('2d');c.imageSmoothingEnabled=false;
const G={A:"01110100011000111111100011000110001",B:"11110100011111010001100011000111110",C:"01111100001000010000100001000001111",D:"11110100011000110001100011000111110",E:"11111100001111010000100001000011111",F:"11111100001111010000100001000010000",G:"01111100001000010111100011000101111",H:"10001100011111110001100011000110001",I:"11111001000010000100001000010011111",J:"00111000010000100001100011000101110",K:"10001100101110010010100011000110001",L:"10000100001000010000100001000011111",M:"10001110111010110001100011000110001",N:"10001110011010110011100011000110001",O:"01110100011000110001100011000101110",P:"11110100011000111110100001000010000",Q:"01110100011000110001101011001001101",R:"11110100011000111110100101000110001",S:"01111100000111000001000010000111110",T:"11111001000010000100001000010000100",U:"10001100011000110001100011000101110",V:"10001100011000110001010100101000100",W:"10001100011000110101101011101110001",X:"10001010100010000100010101000110001",Y:"10001100010101000100001000010000100",Z:"11111000010001000100010001000011111",
"0":"01110100011001110101110011000101110","1":"00100011000010000100001000010001110","2":"01110100010000100110010001000011111","3":"11110000010111000001000011000101110","4":"00010001100101010010111110001000010","5":"11111100001111000001000011000101110","6":"01110100001111010001100011000101110","7":"11111000010001000100010000100001000","8":"01110100011000101110100011000101110","9":"01110100011000101111000010000101110",
"!":"00100001000010000100001000000000100","?":"01110100010000100110001000000000100",".":"00000000000000000000000000000000100",":":"00000001000000000000000000010000000","%":"11001110010001000100010001001110011","$":"00100011111010001110001011111000100","-":"00000000000000011111000000000000000","+":"00000001000010011111001000010000000","·":"00000000000000000100000000000000000","'":"00100001000100000000000000000000000",",":"00000000000000000000000000010001000","/":"00001000010001000100010001000010000"," ":"00000000000000000000000000000000000"};
function tw(s,k){return s.length*6*k-k}
function txt(s,x,y,k,col,out,align){s=s.toUpperCase();if(align==="c")x=Math.round(x-tw(s,k)/2);else if(align==="r")x=Math.round(x-tw(s,k));
  const draw=(ox,oy,cl)=>{let cx=x+ox;for(const ch of s){const g=G[ch]||G[" "];for(let i=0;i<35;i++)if(g[i]==="1")prect(c,cx+(i%5)*k,y+oy+Math.floor(i/5)*k,k,k,cl);cx+=6*k}};
  if(out){for(const[ox,oy]of[[-1,0],[1,0],[0,-1],[0,1],[1,1],[2,2]])draw(ox*Math.max(1,k>>1)||ox,oy*Math.max(1,k>>1)||oy,out)}draw(0,0,col)}
function box(x,y,w,h,fill,edge){prect(c,x-3,y-3,w+6,h+6,"#241527");prect(c,x-2,y-2,w+4,h+4,edge||"#8B5A2B");prect(c,x-1,y-2,w+2,1,"#C9894E");prect(c,x,y,w,h,fill||"#F6E7C1")}
const E={out:t=>1-Math.pow(1-t,3),back:t=>{const s=1.7;t=t-1;return t*t*((s+1)*t+s)+1},bounce:t=>{const n=7.5625,d=2.75;if(t<1/d)return n*t*t;if(t<2/d)return n*(t-=1.5/d)*t+.75;if(t<2.5/d)return n*(t-=2.25/d)*t+.9375;return n*(t-=2.625/d)*t+.984375}};
const cl=(v,a,b)=>Math.max(a,Math.min(b,v)),seg=(t,a,b)=>cl((t-a)/(b-a),0,1);
let LOGO=null,COIN=null;
function logoImg(){if(!LOGO){drawLogo();LOGO=document.getElementById('logo')}return LOGO}
function drawLogoAt(cx,y,k){const L=logoImg();c.drawImage(L,0,0,L.width,L.height,Math.round(cx-L.width*k/2),Math.round(y),L.width*k,L.height*k)}
function stage(label,t0,t){const k=E.back(seg(t,t0,t0+.5)),x=Math.round(-200+k*(200+12));box(x,10,tw(label,2)+16,22,"#3E8E5E","#2A5E3E");txt(label,x+8,14,2,"#FFF6DC","#1E4A2E")}
function stamp(s,x,y,t,t0,col,mn){mn=mn||1;if(t<t0)return;const k=seg(t,t0,t0+.18),sc=Math.max(mn,Math.round(mn+3-3*k)),sh=k<1?0:Math.round(Math.sin((t-t0)*60)*Math.max(0,1-(t-t0-.18)*4)*2);
  const w=tw(s,sc)+14,h=7*sc+12;prect(c,x-w/2-2+sh,y-2,w+4,h+4,"#241527");prect(c,x-w/2+sh,y,w,h,col||"#D7263D");prect(c,x-w/2+2+sh,y+2,w-4,h-4,col||"#D7263D");
  for(let i=0;i<w;i+=2){prect(c,x-w/2+i+sh,y+1,1,1,"#FF8F7A")}txt(s,x+sh,y+6,sc,"#FFFFFF",null,"c")}
function pop(s,x,y,t,t0,k,col,out){if(t<t0)return;const a=E.back(seg(t,t0,t0+.25));txt(s,x,Math.round(y+(1-a)*14),k,col||"#FFFFFF",out||"#241527","c")}
function robinPose(bx,H0,now,P0){const bob=boatRobin(c,bx,H0,now,P0),rx=bx+10+P0.dx,ry=H0-31+bob,lift=cl((P0.ang-30)/60,0,1),hdx=Math.round(rx+28-lift*3),hdy=Math.round(ry+23-lift*6);
  robinArm(c,rx+25,ry+21,hdx,hdy);if(P0.face)robinFace(c,rx,ry,P0.face,now);const tip=rodBent(c,hdx+2,hdy+1,P0.ang,46,P0.bend,P0.spin,now);return{x:Math.round(tip.x),y:Math.round(tip.y),bob}}
function confetti(t,t0,n){if(t<t0)return;const cols=["#FFD23F","#FF6B6B","#5FCB6A","#7FE3FF","#FFFFFF","#B27BEF"];for(let i=0;i<n;i++){const r=Math.sin(i*91.7)*43758.5453%1,r2=Math.sin(i*12.9)*12345.678%1,x=(Math.abs(r)*W+Math.sin((t-t0)*3+i)*8)|0,y=((t-t0)*(60+Math.abs(r2)*60)+Math.abs(r2)*-120)|0;if(y>0&&y<H)prect(c,x,y,2,2,cols[i%6])}}
const GOLD={"1":"#FFF3C4","2":"#FFD36B","3":"#F5A23E","4":"#C26A22","z":"#FFF8DD","Z":"#FFE08A","f":"#FFC452"};
function frame(t){const now=t*1000;c.setTransform(1,0,0,1,0,0);c.clearRect(0,0,W,H);
 // S0 title 0-2.6
 if(t<2.6){seaBase(c,W,H,now,113,167,{dock:true,rich:true});c.fillStyle="rgba(10,22,64,.25)";c.fillRect(0,0,W,H);
   const k=E.bounce(seg(t,.2,1.3));drawLogoAt(W/2,-80+k*(20+80),3);
   if(t>1.4){const fast=t>2.0;if(fast?Math.floor(t*14)%2:Math.floor(t*2.5)%2===0)txt("PRESS START",W/2,106,2,"#FFF6DC","#241527","c")}
   txt("2026 FISHY · ROBINHOOD CHAIN",W/2,169,1,"#FFF6DC","#241527","c");
   if(t>2.0&&t<2.15){c.fillStyle="rgba(255,255,255,.8)";c.fillRect(0,0,W,H)}return}
 // S1 CHECK 2.6-7.0
 if(t<7){const H0=104,u=t-2.9;seaBase(c,W,H,now,H0,168,{dock:true,rich:true});
   for(const[n,x,y,f]of[["koi",30,140,true],["minnow",240,130,false]])spr(c,n,x+Math.sin(now/700)*6,y,f);
   [[78,0],[228,1],[244,2]].forEach(([x,i])=>spr(c,"duck",x+Math.sin(now/900+i)*3,H0-6+Math.round(Math.sin(now/280+i)),i%2===1));
   const P0={ang:45,bend:0,dx:0,face:"",spin:false,shake:0};let ph="pre";
   if(u<0)ph="pre";else if(u<.8){ph="cast";P0.ang=u<.3?45+65*(u/.3):u<.55?110-85*((u-.3)/.25):25+17*((u-.55)/.25)}else if(u<1.6){ph="sink";P0.ang=42}
   else if(u<2.3){ph="bite";P0.ang=36;P0.bend=6+Math.sin(now/50)*2;P0.face="wow"}else if(u<3.0){ph="reel";P0.ang=55+(u-2.3)*25;P0.bend=4;P0.dx=-1;P0.spin=true;P0.face="strain"}
   else{ph="catch";P0.ang=82;P0.face="wow"}
   const bx=96,tip=robinPose(bx,H0,now,P0),fx=bx+92;
   if(ph==="catch"){const sw=Math.round(Math.sin(now/140)*2);pline(c,tip.x,tip.y,tip.x+sw,tip.y+8,"#FFFFFF");spr(c,"duck",tip.x+sw-5,tip.y+8)}
   else if(!(ph==="pre"||ph==="cast"&&u<.5)){const lx=ph==="cast"?tip.x+(fx-tip.x)*seg(u,.5,.8):fx;pline(c,tip.x,tip.y,lx,H0-1,"#FFFFFF");spr(c,"bobber",lx-1,H0-3+(ph==="bite"?Math.round(Math.sin(now/40)):0));
     if(ph==="sink"||ph==="bite"||ph==="reel"){const hy=ph==="sink"?H0+40*seg(u,.8,1.6):ph==="bite"?H0+40:H0+40-40*seg(u,2.3,3.0);pline(c,lx,H0+1,lx,hy,"rgba(255,255,255,.75)");if(ph!=="sink")spr(c,"duck",lx-4,hy+1)}}
   if(ph==="bite"){const X=fx+12,Y=H0-30;for(let a=0;a<16;a++){const an=a/16*Math.PI*2,r=a%2?12:8;prect(c,X+Math.cos(an)*r,Y+Math.sin(an)*r,2,2,"#FFFFFF")}prect(c,X-6,Y-6,13,13,"#FFFFFF");txt("!",X,Y-6,2,"#D7263D",null,"c")}
   stage("STAGE 1 · CHECK",2.6,t);
   pop("...A RUBBER DUCK?!",238,44,t,6.0,1,"#FFF6DC");stamp("73% FAKE VOLUME",238,56,t,6.3);
   return}
 // S2 LARP SCAN 7.0-10.6
 if(t<10.6){seaBase(c,W,H,now,28,171,{dock:false});const u=t-7;
   const k1=E.out(seg(u,.2,1.2)),y=88+Math.round(Math.sin(now/500)*2);const ax=Math.round(-50+k1*(48+50)),bx=Math.round(W+10-k1*(W+10-226));
   c.save();c.translate(ax,y);c.scale(2,2);spr(c,"bass",0,0,true);c.restore();
   c.save();c.translate(bx,y);c.scale(2,2);spr(c,"bass",0,0,false);
   const off=u>2.2?(u-2.2)*30:0;if(u<3.4){const gy=Math.round(3-off*.4),my=Math.round(8+off*.6);prect(c,1,gy,7,1,"#241527");prect(c,1,gy,1,4,"#241527");prect(c,5,gy,1,4,"#241527");prect(c,1,gy+3,5,1,"#241527");prect(c,2,gy+1,3,2,"rgba(160,230,255,.6)");prect(c,8,gy+1,3,1,"#241527");prect(c,2,my,6,1,"#3B1E18");prect(c,1,my+1,2,1,"#3B1E18");prect(c,7,my+1,2,1,"#3B1E18")}
   c.restore();
   if(u>1.0){const a="PEPE · $3.1M",b2="PEPE · $12K · 1H";box(ax-2,y-20,tw(a,1)+8,11,"#CDEFD3");txt(a,ax+2,y-17,1,"#241527");box(bx-14,y-20,tw(b2,1)+8,11,"#FFE1DC");txt(b2,bx-10,y-17,1,"#9E1B2E")}
   if(u>1.4&&u<2.3){const sx=bx-4+seg(u,1.4,2.2)*50;c.fillStyle="rgba(127,227,255,.35)";c.fillRect(sx-4,y-8,8,34);prect(c,sx,y-10,1,38,"#BDF4FF");txt("SCANNING...",W/2,140,1,"#BDF4FF","#0A1640","c")}
   stage("STAGE 2 · LARP SCAN",7.0,t);
   stamp("CLONE!",bx+22,y+26,t,9.4,null,2);pop("SAME TICKER. DIFFERENT FISH.",W/2,150,t,9.7,1,"#FFF6DC");
   return}
 // S3 BOSS 10.6-15.0
 if(t<15){const u=t-10.6,drop=u>2.35?Math.round(E.out(seg(u,2.35,3.2))*22):0,H0=104+drop;seaBase(c,W,H,now,H0,168,{dock:true,rich:true,base:104});
   const sx=220,P0={ang:40,bend:0,dx:Math.round(Math.sin(now/30)),face:"strain",spin:false,shake:1};const tip=robinPose(56,H0,now,P0);
   if(u<2.3){pline(c,tip.x,tip.y,sx,H0-1,"#FFFFFF");spr(c,"bobber",sx-1,H0-3)}
   if(u>1.4){const k=seg(u,1.4,2.3),Y=Math.round(176-k*(176-(H0-6)));c.save();c.translate(sx-32,Y);c.scale(2,2);spr(c,"shark",0,0,false);c.restore();
     if(u>2.3&&u<2.8)for(let i=0;i<14;i++){const an=i/14*Math.PI+Math.PI,r=8+(u-2.3)*36;prect(c,sx+Math.cos(an)*r*1.4,H0-2+Math.sin(an)*r*.6,2,2,"#FFFFFF")}}
   const pulse=.18+.14*Math.sin(now/90);c.fillStyle=`rgba(215,38,61,${pulse.toFixed(3)})`;c.fillRect(0,0,W,H);
   if(u<1.5){const on=Math.floor(u*6)%2===0,y0=46;for(let x=-20;x<W+20;x+=16){const o=Math.floor(now/40)%16;c.fillStyle="#FFD23F";c.beginPath();c.moveTo(x+o,y0);c.lineTo(x+o+8,y0);c.lineTo(x+o,y0+8);c.lineTo(x+o-8,y0+8);c.fill();c.beginPath();c.moveTo(x-o,y0+44);c.lineTo(x-o+8,y0+44);c.lineTo(x-o,y0+52);c.lineTo(x-o-8,y0+52);c.fill()}
     prect(c,0,y0+8,W,36,"#241527");if(on)txt("WARNING",W/2,y0+12,4,"#FF3B3B",null,"c");txt("A HUGE LIQUIDITY DROP IS APPROACHING",W/2,y0+58,1,"#FFF6DC","#241527","c")}
   if(u>1.5)txt("BOSS: RUG PULL",W/2,8,2,"#FFFFFF","#9E1B2E","c");
   stamp("-94% LIQUIDITY",W/2,30,t,13.0);pop("SHARK WATCH SAW IT COMING.",W/2,56,t,13.8,1,"#FFF6DC");
   return}
 // S4 VICTORY 15.0-18.0
 if(t<18){const u=t-15,H0=104;seaBase(c,W,H,now,H0,168,{dock:true,rich:true});
   const P0=u<1.0?{ang:55+u*25,bend:4,dx:-1,face:"grin",spin:true,shake:0}:{ang:82,bend:2,dx:0,face:"grin",spin:false,shake:0};const tip=robinPose(96,H0,now,P0);
   if(u<1.0){pline(c,tip.x,tip.y,tip.x+20,H0+24-u*24,"#FFFFFF");spr(c,"bass",tip.x+12,H0+20-u*24,false,GOLD)}
   else{const sw=Math.round(Math.sin(now/140)*2);pline(c,tip.x,tip.y,tip.x+sw,tip.y+8,"#FFFFFF");c.save();c.translate(tip.x+sw-20,tip.y+8);c.scale(2,2);spr(c,"bass",0,0,false,GOLD);c.restore();
     for(let k=0;k<8;k++)if(Math.sin(now/90+k*1.3)>0)spr(c,"sparkle",tip.x-30+((k*23)%62),tip.y-4+((k*13)%34))}
   confetti(t,16.0,70);stamp("GRADE A",246,34,t,16.0,"#3E8E5E",2);pop("REAL VOLUME · DEEP EXIT · SAFE TO SWIM",W/2,158,t,16.5,1,"#FFF6DC");
   txt("STAGE CLEAR!",W/2,8,2,"#FFD23F","#241527","c");return}
 // S5 END CARD 18.0-21.0
 {const u=t-18;seaBase(c,W,H,now,130,170,{dock:true,rich:true});c.fillStyle="rgba(10,22,64,.55)";c.fillRect(0,0,W,H);
   const k=E.back(seg(u,0,.6));drawLogoAt(W/2,Math.round(-70+k*(8+70)),3);
   if(u>.5){const s="IS THIS TOKEN FISHY?",w=tw(s,1)+20;prect(c,W/2-w/2-3,85,w+6,17,"#BDF4FF");prect(c,W/2-w/2-1,87,w+2,13,"#0A1640");prect(c,W/2-w/2,88,w,11,"#14286E");txt(s,W/2,90,1,"#FFF6DC",null,"c")}
   if(COIN&&u>.8){const a=(u-.8)*4,sx=Math.abs(Math.cos(a)),cw=Math.max(2,Math.round(44*sx));c.drawImage(COIN,0,0,64,64,Math.round(W/2-cw/2),106,cw,44);if(sx<.3)prect(c,W/2-1,106,2,44,"#C26A22")}
   if(u>1.2)txt("$FISHY · BUILT ON ROBINHOOD CHAIN",W/2,156,1,"#FFF6DC","#241527","c");
   if(u>1.5&&Math.floor(u*2.5)%2===0)txt("INSERT COIN · COMING SOON",W/2,168,1,"#FFD23F","#241527","c")}
}
return{cv,frame,setCoin(u){return new Promise(r=>{const im=new Image();im.onload=()=>{COIN=im;r()};im.src=u})}};
})();
