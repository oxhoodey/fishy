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


SPR.cricket=["......o.o","..oooooo.","oggggGgo.","o.o.o.o..","........."];PALS.cricket={o:"#241527",g:"#5FCB6A",G:"#36924A"};
const H0=118,FL=172;
function slideK(t,t0,t1){return E.back(seg(t,t0,t0+.35))-(t>t1?E.out(seg(t,t1,t1+.3)):0)}
function phoneBox(x,y,w,h,title,col){prect(c,x-2,y-2,w+4,h+4,"#241527");prect(c,x-1,y-1,w+2,h+2,"#3A3A55");prect(c,x,y,w,h,"#FFF6DC");prect(c,x,y,w,12,col||"#3E8E5E");txt(title,x+5,y+3,1,"#FFF6DC")}
function replies(t,t0,t1){const k=slideK(t,t0,t1);if(k<=0)return;const x=Math.round(186-k*178),y=8,w=164,h=78;phoneBox(x,y,w,h,"EP. 5 · REPLIES","#14286E");
  if(t<7.6){txt("0",x+w/2,y+26,4,"#241527",null,"c");txt("REPLIES",x+w/2,y+58,1,"#8B5A2B",null,"c");if(Math.floor(t*2)%2)txt("...",x+w/2,y+66,1,"#8B5A2B",null,"c")}
  else{const p=E.back(seg(t,7.6,7.8));txt("1 NEW REPLY!",x+w/2,y+18,1,"#2E7D46",null,"c");const yy=Math.round(y+30+(1-p)*10);prect(c,x+6,yy,w-12,30,"#FFFFFF");prect(c,x+10,yy+4,10,10,"#8A93A6");prect(c,x+12,yy+7,2,2,"#FF3B3B");prect(c,x+16,yy+7,2,2,"#FF3B3B");
    txt("BOT_8842",x+25,yy+4,1,"#241527");txt("GM SER! 100X?",x+25,yy+16,1,"#3B2416");if(t>8.4){prect(c,x+w-26,yy+3,21,9,"#D7263D");txt("BOT",x+w-24,yy+5,1,"#FFFFFF")}}}
function net(t,t0){if(t<t0||t>t0+1.6)return;const k=seg(t,t0,t0+.6),x0=46,y0=H0-20,x1=120,y1=H0+16,X=x0+(x1-x0)*k,Y=y0+(y1-y0)*k-Math.sin(k*Math.PI)*30;
  c.strokeStyle="#D9DEE8";c.lineWidth=1;c.beginPath();c.moveTo(x0,y0);c.quadraticCurveTo((x0+X)/2,Math.min(y0,Y)-14,X,Y);c.stroke();
  const r=Math.round(6+k*10);for(let i=-r;i<=r;i+=3){prect(c,Math.round(X+i),Math.round(Y-r/2),1,r,"rgba(217,222,232,.8)");prect(c,Math.round(X-r),Math.round(Y-r/2+(i+r)/2),r*2,1,"rgba(217,222,232,.8)")}
  if(k>=1){const s=seg(t,t0+.6,t0+1.0);for(let i=0;i<6;i++)prect(c,Math.round(x1+Math.cos(i)*s*14),Math.round(y1-s*10*Math.abs(Math.sin(i*2))),2,2,"#FFFFFF")}}
function hookAt(x,y){prect(c,x,y,1,5,"#9AA3B5");prect(c,x-2,y+5,1,2,"#9AA3B5");prect(c,x-1,y+7,3,1,"#9AA3B5");prect(c,x+2,y+5,1,2,"#9AA3B5")}
function stamp(t,t0,label,col,x,y){if(t<t0)return;const k=seg(t,t0,t0+.18),sc=k<1?3-2*E.out(k):1,w=tw(label,2)+12,h=24;c.save();c.translate(x,y);c.rotate(-.18);c.scale(sc,sc);
  prect(c,-w/2-2,-h/2-2,w+4,h+4,col);prect(c,-w/2,-h/2,w,h,"rgba(255,246,220,.92)");prect(c,-w/2+2,-h/2+2,w-4,h-4,col);prect(c,-w/2+3,-h/2+3,w-6,h-6,"rgba(255,246,220,.95)");txt(label,0,-7,2,col,null,"c");c.restore()}
const CATCH=[{sym:"MOONCAT",kind:"bass",v:"LURE",col:"#D7263D",note:"COPIES A BIGGER TICKER",lure:true},
 {sym:"SHRIMPY",kind:"minnow",v:"BABY FISH",col:"#B7791F",note:"BONDING 12% · TOO EARLY"},
 {sym:"DEVGONE",kind:"trout",v:"DEAD",col:"#3B2416",note:"DEV PULLED LIQUIDITY",dead:true},
 {sym:"KOIFI",kind:"koi",v:"REAL FISH",col:"#2E7D46",note:"91% REAL VOL · DEEP POOL"}];
function catchCard(t,i){const t0=12+i*2.1,t1=t0+2.0;if(t<t0||t>t1+.3)return;const C=CATCH[i],k=slideK(t,t0,t1);if(k<=0)return;const x=Math.round(8),y=Math.round(10+(1-k)*-110),w=164,h=104;
  prect(c,x-2,y-2,w+4,h+4,"#241527");prect(c,x,y,w,h,"#FFF6DC");prect(c,x,y,w,12,"#14286E");txt("FISHY CHECK "+(i+1)+"/4",x+5,y+3,1,"#FFD23F");txt("NEW POND",x+w-5,y+3,1,"#BDF4FF",null,"r");
  txt(C.sym,x+w/2,y+17,2,"#241527",null,"c");
  // the catch, swinging on a line
  const sw=Math.round(Math.sin((t-t0)*5)*3*(1-seg(t,t0,t0+1.2))),sx=x+w/2-20+sw,sy=y+40;prect(c,x+w/2,y+33,1,7,"#8A93A6");
  c.save();c.translate(sx,C.dead?sy+16:sy);if(C.dead)c.scale(2,-2);else c.scale(2,2);spr(c,C.kind,0,0,false);c.restore();
  if(C.dead){prect(c,sx+4,sy+7,3,1,"#241527");prect(c,sx+5,sy+6,1,3,"#241527")}
  if(C.lure){hookAt(sx+14,sy+16);hookAt(sx+30,sy+15);prect(c,sx-6,sy+6,6,2,"#D9DEE8");prect(c,sx-3,sy+5,2,1,"#9AA3B5")}
  if(C.kind==="minnow")for(let j=0;j<3;j++)prect(c,sx+40+j*4,sy+6-((t*8+j*3)%6),1,1,"#3FA9F5");
  txt(C.note,x+w/2,y+h-11,1,"#3B2416",null,"c");
  stamp(t,t0+.7,C.v,C.col,x+w/2+6,y+69)}
function frame(t){const now=t*1000;c.setTransform(1,0,0,1,0,0);c.clearRect(0,0,W,H);
 const bg=()=>seaBase(c,W,H,now,H0,FL,{dock:false,rich:false});
 if(t<2.6){bg();c.fillStyle="rgba(10,22,64,.62)";c.fillRect(0,0,W,H);const k=E.back(seg(t,.1,.6));drawLogoAt(W/2,Math.round(-40+k*(14+40)),2);
   if(t>.5)txt("EPISODE 6",W/2,70,1,"#FFD23F","#241527","c");
   if(t>.8){const s=E.back(seg(t,.8,1.2));txt("NOBODY",W/2,Math.round(84+(1-s)*16),2,"#FFF6DC","#241527","c");txt("REPLIED",W/2,Math.round(102+(1-s)*16),2,"#FFD23F","#9E1B2E","c")}
   if(t>1.4){spr(c,"cricket",W/2-4,132);if(Math.floor(t*4)%2)txt("CRI CRI",W/2,142,1,"#B4E67E",null,"c")}
   if(t>2.35){c.fillStyle="rgba(255,255,255,.7)";c.fillRect(0,0,W,H)}return}
 if(t>=25){const u=t-25;bg();c.fillStyle="rgba(10,22,64,.62)";c.fillRect(0,0,W,H);const k=E.back(seg(u,0,.5));drawLogoAt(W/2,Math.round(-50+k*(14+50)),2);
   if(u>.4){const s="IS THIS TOKEN FISHY?",w=tw(s,1)+14;prect(c,W/2-w/2-2,74,w+4,15,"#BDF4FF");prect(c,W/2-w/2,76,w,11,"#14286E");txt(s,W/2,78,1,"#FFF6DC",null,"c")}
   if(COIN&&u>.7){const a=(u-.7)*4,sx=Math.abs(Math.cos(a)),cw=Math.max(2,Math.round(38*sx));c.drawImage(COIN,0,0,64,64,Math.round(W/2-cw/2),96,cw,38)}
   if(u>1.0)txt("BUILT ON ROBINHOOD CHAIN",W/2,144,1,"#FFF6DC","#241527","c");if(u>1.3)txt("NEXT: EP. 7 · DROP A TICKER",W/2,158,1,"#FFD23F","#241527","c");return}
 bg();
 // fish swimming past, ignoring Robin (before he goes fishing himself)
 if(t<10.6)for(let i=0;i<3;i++){const x=Math.round(W+20-((t*18+i*60)%(W+60))),y=H0+12+i*12;spr(c,["bass","koi","trout"][i],x,y,false)}
 // cricket on the bow while it's quiet
 if(t<9.2){spr(c,"cricket",70,H0-4);if(t>4.6&&t<7.6&&Math.floor(t*4)%2)txt("CRI CRI",86,H0-14,1,"#FFFFFF","#241527","c")}
 const face=t>5.2&&t<10.6?"strain":t>20.4?"grin":"";const P0={ang:45,bend:0,dx:0,face,spin:false,shake:0};
 const bob=boatRobin(c,4,H0,now,P0),rx=14,ry=H0-31+bob,hdx=rx+28,hdy=ry+23;robinArm(c,rx+25,ry+21,hdx,hdy);if(face)robinFace(c,rx,ry,face,now);
 if(t>=2.6&&t<10.6){prect(c,hdx-1,hdy-6,8,11,"#241527");prect(c,hdx,hdy-5,6,9,"#3FA9F5");prect(c,hdx+1,hdy-4,4,2,"#BDF4FF");if(t>7.6&&Math.floor(t*6)%2)prect(c,hdx+4,hdy-8,3,3,"#D7263D")}
 else rodBent(c,hdx+2,hdy+1,45,36,2,false,now);
 net(t,10.6);
 if(t<4.6)bubble("EP. 5 IS OUT. LET'S READ THE REPLIES!",t,2.8,58,40,30);
 else if(t<9.0)replies(t,4.6,8.8);
 else if(t<10.6)bubble("FINE. I'LL CATCH THEM MYSELF.",t,9.1,58,40,30);
 else if(t<12.0){const s=E.back(seg(t,10.7,11.0));if(s>.2){txt("CASTING THE FISHY NET",W/2,14,1,"#FFFFFF","#241527","c");txt("INTO THE NEW POND...",W/2,26,1,"#FFD23F","#241527","c")}}
 else if(t<20.4){for(let i=0;i<4;i++)catchCard(t,i);txt("EXAMPLE TICKERS ONLY",W/2,124,1,"rgba(255,255,255,.8)",null,"c")}
 else if(t<22.0){const k=slideK(t,20.4,21.8);if(k>0){const y=Math.round(14-(1-k)*90),x=18,w=144,h=66;prect(c,x-2,y-2,w+4,h+4,"#241527");prect(c,x,y,w,h,"#14286E");txt("TODAY'S CATCH",W/2,y+5,1,"#FFD23F",null,"c");
   [["REAL FISH","1","#5FCB6A"],["LURES","1","#FF8F7A"],["BABY FISH","1","#FFD23F"],["DEAD","1","#D9DEE8"]].forEach(([a,b,col],i)=>{txt(a,x+10,y+18+i*11,1,col);txt(b,x+w-10,y+18+i*11,1,"#FFF6DC",null,"r")})}}
 else{bubble("NEXT TIME, SEND ME YOURS.",t,22.0,58,40,30);
   if(t>22.9){const k=E.back(seg(t,22.9,23.2)),y=Math.round(52+(1-k)*20);prect(c,10,y-1,160,38,"#241527");prect(c,11,y,158,36,"#FFD23F");txt("DROP A TICKER BELOW",W/2,y+5,1,"#241527",null,"c");txt("OR ROBIN FISHES",W/2,y+15,1,"#241527",null,"c");txt("ALONE AGAIN.",W/2,y+26,1,"#9E1B2E",null,"c")}}
 if(t>24.7){c.fillStyle=`rgba(255,255,255,${(seg(t,24.7,25)*.8).toFixed(2)})`;c.fillRect(0,0,W,H)}
}
return{cv,frame,setCoin(u){return new Promise(r=>{const im=new Image();im.onload=()=>{COIN=im;r()};im.src=u})}};
})();
