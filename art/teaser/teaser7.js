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


SPR.botfish=["....R.......","....o.......","..ooooooo.oo",".oRWWWWWWowo","oWWwWWwWWwwo",".oWWWWWWWowo","..ooooooo.oo"];PALS.botfish={o:"#241527",R:"#FF3B3B",W:"#C9CED9",w:"#8A93A6"};
const H0=118,FL=172,BX=96;
function heart(x,y,col){prect(c,x,y,2,2,col);prect(c,x+3,y,2,2,col);prect(c,x,y+1,5,2,col);prect(c,x+1,y+3,3,1,col);prect(c,x+2,y+4,1,1,col)}
const fmtN=n=>n>=1000?Math.floor(n/1000)+","+String(Math.floor(n%1000)).padStart(3,"0"):String(Math.round(n));
function followers(t){if(t<6)return 0;if(t<10)return Math.round(E.out(seg(t,6.2,9.6))*5000);if(t<13.2)return 5000;if(t<14.6)return Math.max(3,Math.round(5000*(1-E.out(seg(t,13.2,14.4)))));if(t<16.4)return 3;return Math.round(3+E.out(seg(t,16.4,21))*125)}
function hud(t){const n=followers(t),bad=t>=10.6&&t<13.2,x=112,y=157,w=64,h=19;prect(c,x-1,y-1,w+2,h+2,"#241527");prect(c,x,y,w,h,bad?"#D7263D":"#14286E");txt("FOLLOWERS",x+5,y+3,1,"#BDF4FF");txt(fmtN(n),x+w-5,y+11,1,"#FFF6DC",null,"r");
  if(t>16.4&&t<21.5&&Math.floor(t*4)%2)txt("+",x+5,y+11,1,"#5FCB6A")}
function sign(x,y,label,col){const w=tw(label,1)+8;x=Math.max(2,Math.min(W-w-2,Math.round(x-w/2)));prect(c,x-1,y-1,w+2,11,"#241527");prect(c,x,y,w,9,col||"#FFF6DC");txt(label,x+4,y+2,1,"#241527");prect(c,x+Math.floor(w/2),y+10,1,12,"#8B5A2B")}
function panel(t,t0,t1){const k=E.back(seg(t,t0,t0+.4))-(t>t1?E.out(seg(t,t1,t1+.3)):0);if(k<=0)return;const x=Math.round(-170+k*178),y=10,w=164,h=78;
  prect(c,x-2,y-2,w+4,h+4,"#0A1640");prect(c,x,y,w,h,"#14286E");prect(c,x,y,w,12,"#3E8E5E");txt("FISHY · FOLLOWER CHECK",x+5,y+3,1,"#FFF6DC");
  const rows=[["FOLLOWERS","5,000",10.4,0],["REAL TRADERS","3",10.9,1],["BOTS","4,912",11.4,1],["AIRDROP CRABS","85",11.9,1]];
  rows.forEach(([a,b,tt,bad],i)=>{if(t<tt)return;const yy=y+18+i*14;txt(a,x+5,yy,1,"#BDF4FF");txt(b,x+w-(bad?18:5),yy,1,bad?"#FF8F7A":"#FFF6DC",null,"r");if(bad){prect(c,x+w-14,yy-1,9,9,"#D7263D");txt("X",x+w-12,yy,1,"#FFFFFF")}})}
function menu4(t,t0,sel,opts){const x=64,y=134;frameBox(x,y,W-x,46,"#FFF6DC");opts.forEach((o,i)=>{const oy=y+5+i*10;txt(o,x+16,oy,1,i===sel?"#D7263D":"#3B2416");if(i===sel&&Math.floor(t*4)%2===0)txt(">",x+8,oy,1,"#D7263D")});
  frameBox(0,y,x+1,46);["WHAT","WILL","ROBIN","DO?"].forEach((l,i)=>txt(l,8,y+5+i*10,1,"#3B2416"))}
function card(t,t0,t1,x,y,sym,verdict,bad){const k=E.back(seg(t,t0,t0+.25))-(t>t1?E.out(seg(t,t1,t1+.25)):0);if(k<=0)return;const w=100,h=24,xx=Math.round(x),yy=Math.round(y+(1-k)*14);
  prect(c,xx-1,yy-1,w+2,h+2,"#241527");prect(c,xx,yy,w,h,"#FFF6DC");prect(c,xx,yy,w,9,"#14286E");txt("FISHY",xx+4,yy+2,1,"#FFD23F");txt(sym,xx+4,yy+13,1,"#241527");txt(verdict,xx+w-4,yy+13,1,bad?"#D7263D":"#2E7D46",null,"r")}
const BOTS=Array.from({length:16},(_,i)=>({x0:200+i*12+((i*37)%17),y:H0+6+((i*13)%34),crab:i%4===3,sp:26+(i%5)*6,tag:["F4F","GM","DM ME","AIRDROP?","F4F","FOLLOW BACK"][i%6]}));
const REAL=[{k:"bass",y:H0+10,d:16.6},{k:"koi",y:H0+24,d:17.4},{k:"trout",y:H0+16,d:18.2},{k:"salmon",y:H0+32,d:19.0},{k:"bass",y:H0+28,d:19.8}];
function frame(t){const now=t*1000;c.setTransform(1,0,0,1,0,0);c.clearRect(0,0,W,H);
 const bg=()=>seaBase(c,W,H,now,H0,FL,{dock:false,rich:false});
 if(t<2.6){bg();c.fillStyle="rgba(10,22,64,.62)";c.fillRect(0,0,W,H);const k=E.back(seg(t,.1,.6));drawLogoAt(W/2,Math.round(-40+k*(14+40)),2);
   if(t>.5)txt("EPISODE 5",W/2,70,1,"#FFD23F","#241527","c");
   if(t>.8){const s=E.back(seg(t,.8,1.2));txt("FISHING FOR",W/2,Math.round(84+(1-s)*16),2,"#FFF6DC","#241527","c");txt("FOLLOWERS",W/2,Math.round(102+(1-s)*16),2,"#FFD23F","#9E1B2E","c")}
   if(t>1.4){for(let i=0;i<5;i++)spr(c,"botfish",20+i*30+Math.round(Math.sin(now/200+i)*2),132+(i%2)*8)}
   if(t>2.35){c.fillStyle="rgba(255,255,255,.7)";c.fillRect(0,0,W,H)}return}
 if(t>=25){const u=t-25;bg();c.fillStyle="rgba(10,22,64,.62)";c.fillRect(0,0,W,H);const k=E.back(seg(u,0,.5));drawLogoAt(W/2,Math.round(-50+k*(14+50)),2);
   if(u>.4){const s="IS THIS TOKEN FISHY?",w=tw(s,1)+14;prect(c,W/2-w/2-2,74,w+4,15,"#BDF4FF");prect(c,W/2-w/2,76,w,11,"#14286E");txt(s,W/2,78,1,"#FFF6DC",null,"c")}
   if(COIN&&u>.7){const a=(u-.7)*4,sx=Math.abs(Math.cos(a)),cw=Math.max(2,Math.round(38*sx));c.drawImage(COIN,0,0,64,64,Math.round(W/2-cw/2),96,cw,38)}
   if(u>1.0)txt("BUILT ON ROBINHOOD CHAIN",W/2,144,1,"#FFF6DC","#241527","c");if(u>1.3)txt("NEXT: EP. 6 · YOUR CA CHECKS",W/2,158,1,"#FFD23F","#241527","c");return}
 bg();
 // bots swarm toward the F4F bait (6-13), then scatter (13.2-14.6)
 if(t>6&&t<14.8){const flee=seg(t,13.2,14.4);BOTS.forEach((b,i)=>{const arrive=Math.max(BX+6+(i%6)*9,b.x0-(t-6)*b.sp),x=Math.round(arrive+flee*flee*220+(flee>0?0:Math.sin(now/150+i)*1)),y=b.y+Math.round(Math.sin(now/300+i)*1);
   if(x>W+5)return;spr(c,b.crab?"crab":"botfish",x,y);if(t>7&&t<13&&i===[1,9,14][Math.floor(t*1.3)%3]&&x<W-tw(b.tag,1)-6){const lab=b.tag,w=tw(lab,1)+4;prect(c,x-1,y-10,w+2,9,"#241527");prect(c,x,y-9,w,7,"#FFFFFF");txt(lab,x+2,y-8,1,"#241527")}})}
 // real traders swim in for the real data (16.4+)
 if(t>16.4){REAL.forEach((f,i)=>{if(t<f.d)return;const x=Math.round(Math.max(BX+4+i*16,W+10-(t-f.d)*60)),y=f.y+Math.round(Math.sin(now/350+i)*1);c.save();c.translate(x,y);spr(c,f.k,0,0,false);c.restore();
   if(x<W-10&&Math.sin(now/300+i*1.7)>.6)heart(x+6,y-7,"#FF6B6B")})}
 // Robin + rod + line + bait sign
 const face=t>8.3&&t<10.4?"grin":t>10.4&&t<15.6?"strain":t>19?"grin":"";const P0={ang:45,bend:0,dx:0,face,spin:false,shake:0};
 const bob=boatRobin(c,4,H0,now,P0),rx=14,ry=H0-31+bob,hdx=rx+28,hdy=ry+23;robinArm(c,rx+25,ry+21,hdx,hdy);if(face)robinFace(c,rx,ry,face,now);
 rodBent(c,hdx+2,hdy+1,45,36,2,false,now);const tx=hdx+2+25,ty=hdy+1-25,by=H0+Math.round(Math.sin(now/500));
 c.strokeStyle="rgba(255,255,255,.75)";c.lineWidth=1;c.beginPath();c.moveTo(tx+.5,ty+.5);c.lineTo(BX+.5,by-1);c.stroke();spr(c,"bobber",BX-3,by-4);
 if(t>4.8&&t<14.8)sign(BX,by-26,"FOLLOW 4 FOLLOW","#FFD23F");else if(t>15.8&&t<21.2)sign(BX,by-26,"REAL DATA","#5FCB6A");
 // story
 if(t<6.0)bubble("I NEED FOLLOWERS. HOW HARD CAN IT BE?",t,2.8,58,40,30);
 else if(t<8.2){}
 else if(t<10.3)bubble("5,000 FOLLOWERS?! I'M FAMOUS!",t,8.3,58,40,30);
 else if(t<12.6)panel(t,10.3,99);
 else if(t<13.4){panel(t,10.3,12.7);bubble("...THEY'RE ALL BOTS.",t,12.75,58,40,30)}
 else if(t<14.0)bubble("...THEY'RE ALL BOTS.",t,12.75,58,40,99);
 else if(t<15.8)menu4(t,14.0,t<15.0?0:2,["BUY FOLLOWERS","DO A GIVEAWAY","BE USEFUL","CRY"]);
 else if(t<21.0){if(t<16.6)bubble("NEW BAIT: REAL DATA.",t,15.8,58,40,30);
   card(t,16.6,20.6,78,6,"PEPE2","LURE 80",true);card(t,17.4,20.6,78,33,"FR0G","LURE 65",true);card(t,18.2,20.6,78,60,"TUNA","REAL FISH",false);
   if(t>19.0){const s=E.back(seg(t,19.0,19.3));if(s>.2){txt("REAL TRADERS",38,22,1,"#FFFFFF","#241527","c");txt("BITE",38,32,1,"#FFFFFF","#241527","c");txt("REAL DATA.",38,42,1,"#FFD23F","#9E1B2E","c")}}}
 else{bubble("NO BOTS. JUST FISH.",t,21.0,58,40,30);
   if(t>21.8){const k=E.back(seg(t,21.8,22.1)),y=Math.round(40+(1-k)*20);prect(c,10,y-1,160,24,"#241527");prect(c,11,y,158,22,"#FFD23F");txt("FOLLOW FISHY FOR",W/2,y+4,1,"#241527",null,"c");txt("DAILY LURE CHECKS",W/2,y+13,1,"#9E1B2E",null,"c")}
   if(t>22.8){const k=E.back(seg(t,22.8,23.1)),y=Math.round(70+(1-k)*20);prect(c,10,y-1,160,24,"#241527");prect(c,11,y,158,22,"#FFF6DC");txt("REPLY WITH A CA",W/2,y+4,1,"#241527",null,"c");txt("ROBIN CHECKS IT IN EP. 6",W/2,y+13,1,"#2E7D46",null,"c")}}
 if(!(t>=14&&t<15.8))hud(t);
 if(t>24.7){c.fillStyle=`rgba(255,255,255,${(seg(t,24.7,25)*.8).toFixed(2)})`;c.fillRect(0,0,W,H)}
}
return{cv,frame,setCoin(u){return new Promise(r=>{const im=new Image();im.onload=()=>{COIN=im;r()};im.src=u})}};
})();
