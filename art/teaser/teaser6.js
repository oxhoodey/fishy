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


SPR.lilfrog=["..oo....oo..",".oWWo..oWWo.",".oWeo..oeWo.","oggggggggggo","oggLLLLLLggo","ogmmmmmmmmgo",".oggggggggo.","oggo.gg.oggo","oLLo.oo.oLLo",".oo......oo."];PALS.lilfrog={o:"#241527",W:"#FFFFFF",e:"#241527",g:"#5FCB6A",L:"#B4E67E",m:"#E8443F"};
const H0=118,FL=172;
function heart(x,y,col){prect(c,x,y,2,2,col);prect(c,x+3,y,2,2,col);prect(c,x,y+1,5,2,col);prect(c,x+1,y+3,3,1,col);prect(c,x+2,y+4,1,1,col)}
function money(v){return v>=1e6?"$"+(v/1e6).toFixed(2)+"M":v>=1e3?"$"+(v/1e3).toFixed(v%1000?1:0)+"K":"$"+Math.round(v)}
function slideK(t,t0,t1){return E.back(seg(t,t0,t0+.35))-(t>t1?E.out(seg(t,t1,t1+.3)):0)}
// news card (generic, no brand)
function news(t,t0,t1){const k=slideK(t,t0,t1);if(k<=0)return;const x=8,y=Math.round(8-(1-k)*60),w=164,h=62;
  prect(c,x-1,y-1,w+2,h+2,"#241527");prect(c,x,y,w,h,"#FFFFFF");prect(c,x,y,w,12,"#D7263D");txt("BREAKING",x+5,y+3,1,"#FFFFFF");if(Math.floor(t*3)%2)prect(c,x+w-10,y+4,4,4,"#FFFFFF");
  ["YOU CAN NOW SEND","MONEY TO ANYONE WITH","A PHONE NUMBER."].forEach((l,i)=>txt(l,x+6,y+17+i*10,1,"#241527"));
  txt("· LIVE ON STREAM ·",x+w/2,y+50,1,"#8B8B9A",null,"c")}
// phone app panel
function phoneBox(x,y,w,h,title,col){prect(c,x-2,y-2,w+4,h+4,"#241527");prect(c,x-1,y-1,w+2,h+2,"#3A3A55");prect(c,x,y,w,h,"#FFF6DC");prect(c,x,y,w,12,col||"#3E8E5E");txt(title,x+5,y+3,1,"#FFF6DC")}
function avatar(name,x,y){c.save();c.beginPath();c.rect(x,y,14,14);c.clip();prect(c,x,y,14,14,"#BDF4FF");
  if(name==="chefcat")scaled("chefcat",x-1,y,.6);else if(name==="kraken")scaled("kraken",x-2,y-1,.7);else scaled(name,x-1,y+1,.85);c.restore();prect(c,x,y,14,1,"#241527");prect(c,x,y+13,14,1,"#241527");prect(c,x,y,1,14,"#241527");prect(c,x+13,y,1,14,"#241527")}
const REQ=[["duck","DUCK · EP.1",200,"PROMO FEE",11.2],["kraken","KRAKEN · EP.2",1000,"WHITELIST SPOT",12.3],["chefcat","CHEF CAT · EP.3",500,"FOR THE POT",13.4]];
function requests(t,t0,t1){const k=slideK(t,t0,t1);if(k<=0)return;const x=Math.round(186-k*178),y=6,w=164,h=94;phoneBox(x,y,w,h,"REQUESTS","#D7263D");
  const n=REQ.filter(r=>t>=r[4]).length+(t>14.4?Math.min(97,Math.floor((t-14.4)*90)):0);txt(String(n),x+w-6,y+3,1,"#FFF6DC",null,"r");
  REQ.forEach(([sp,nm,amt,why,tt],i)=>{if(t<tt)return;const p=E.back(seg(t,tt,tt+.2)),yy=y+15+i*22,xx=Math.round(x+4+(1-p)*30);
    prect(c,xx,yy,w-8,20,"#FFFFFF");avatar(sp,xx+2,yy+3);txt(nm,xx+19,yy+3,1,"#241527");txt("WANTS "+money(amt),xx+19,yy+12,1,"#D7263D");
    if(t>17.5){const j=i,tt2=18.0+j*.6;if(t>tt2){const s=seg(t,tt2,tt2+.12)<1?2:1;prect(c,xx+w-26,yy+2,16,16,"#241527");prect(c,xx+w-25,yy+3,14,14,"#D7263D");txt("X",xx+w-21+(s>1?0:0),yy+7,1,"#FFFFFF")}}});
  if(t>14.4)txt("+"+Math.min(97,Math.floor((t-14.4)*90))+" MORE...",x+w/2,y+h-9,1,"#8B5A2B",null,"c")}
function sendPanel(t,t0,t1){const k=slideK(t,t0,t1);if(k<=0)return;const x=Math.round(186-k*178),y=6,w=164,h=80;phoneBox(x,y,w,h,"SEND MONEY");
  avatar("lilfrog",x+6,y+18);txt("TO: LIL FROG",x+25,y+18,1,"#241527");txt("NOTE: BAIT MONEY",x+25,y+27,1,"#8B5A2B");
  const amt=t<8.9?"$"+Math.min(5,Math.floor((t-t0)*8)):"$5";txt(amt,x+w/2,y+40,3,"#241527",null,"c");
  const sent=t>9.6,press=t>9.4&&t<9.6;prect(c,x+30,y+64+(press?1:0),w-60,12,"#241527");prect(c,x+31,y+64+(press?1:0),w-62,press?11:10,sent?"#5FCB6A":"#FFD23F");txt(sent?"SENT!":"SEND",x+w/2,y+66+(press?1:0),1,sent?"#FFFFFF":"#241527",null,"c")}
function verdicts(t){if(t<17.6||t>21)return;const k=slideK(t,17.6,20.6);if(k<=0)return;const x=8,y=Math.round(104+(1-k)*40);prect(c,x-1,y-1,166,14,"#241527");prect(c,x,y,164,12,"#14286E");
  const lab=t<18.0?"FISHY IS CHECKING...":t<18.6?"DUCK? A PAID SHILL.":t<19.2?"KRAKEN? DM SCAMMER.":"CAT? RUGGED HIS POT.";txt(lab,x+82,y+3,1,"#FFD23F",null,"c")}
function frame(t){const now=t*1000;c.setTransform(1,0,0,1,0,0);c.clearRect(0,0,W,H);
 const bg=()=>seaBase(c,W,H,now,H0,FL,{dock:true,rich:false});
 if(t<2.6){bg();c.fillStyle="rgba(10,22,64,.62)";c.fillRect(0,0,W,H);
   for(let i=0;i<9;i++){const yy=((t*60+i*37)%200)-20,xx=(i*41)%170+5;spr(c,"coin",xx,yy)}
   const k=E.back(seg(t,.1,.6));drawLogoAt(W/2,Math.round(-40+k*(14+40)),2);
   if(t>.5)txt("EPISODE 4",W/2,70,1,"#FFD23F","#241527","c");
   if(t>.8){const s=E.back(seg(t,.8,1.2));txt("SEND",W/2,Math.round(84+(1-s)*16),2,"#FFF6DC","#241527","c");txt("MONEY",W/2,Math.round(102+(1-s)*16),3,"#5FCB6A","#0A4A2A","c")}
   if(t>1.4)txt("TO ANYONE?!",W/2,132,1,"#FFD23F","#241527","c");
   if(t>2.35){c.fillStyle="rgba(255,255,255,.7)";c.fillRect(0,0,W,H)}return}
 if(t>=25){const u=t-25;bg();c.fillStyle="rgba(10,22,64,.62)";c.fillRect(0,0,W,H);const k=E.back(seg(u,0,.5));drawLogoAt(W/2,Math.round(-50+k*(14+50)),2);
   if(u>.4){const s="IS THIS TOKEN FISHY?",w=tw(s,1)+14;prect(c,W/2-w/2-2,74,w+4,15,"#BDF4FF");prect(c,W/2-w/2,76,w,11,"#14286E");txt(s,W/2,78,1,"#FFF6DC",null,"c")}
   if(COIN&&u>.7){const a=(u-.7)*4,sx=Math.abs(Math.cos(a)),cw=Math.max(2,Math.round(38*sx));c.drawImage(COIN,0,0,64,64,Math.round(W/2-cw/2),96,cw,38)}
   if(u>1.0)txt("BUILT ON ROBINHOOD CHAIN",W/2,144,1,"#FFF6DC","#241527","c");if(u>1.3)txt("NEXT: EP. 5",W/2,158,1,"#FFD23F","#241527","c");return}
 bg();
 // lily pad + frog friend
 spr(c,"lily",74,H0+3);const fj=t>9.9&&t<10.8?-Math.round(Math.abs(Math.sin((t-9.9)*7))*6):0;spr(c,"lilfrog",75,H0-7+fj);
 if(t>10&&t<11.4){heart(80,H0-16+Math.round(-(t-10)*6),"#FF6B6B");if(t>10.2)txt("THX!",88,H0-22,1,"#FFFFFF","#241527")}
 // villains arrive with their requests and flee after the check
 const flee=seg(t,20.0,20.9);
 if(t>11.2){const dx=Math.round(108+Math.sin(now/400)*3+flee*90);spr(c,"duck",dx,H0-2)}
 if(t>12.3){const ky=Math.round(H0+18-E.out(seg(t,12.3,12.8))*6+flee*90);spr(c,"kraken",120,ky)}
 if(t>13.4){const cx=Math.round(150-E.back(seg(t,13.4,13.8))*12+flee*60);spr(c,"chefcat",cx,H0-28)}
 // coin from Robin to frog
 if(t>9.6&&t<10.1){const k=seg(t,9.6,10.1),X=44+(80-44)*k,Y=H0-10-Math.sin(k*Math.PI)*22+(k*6);spr(c,"coin",X,Y)}
 // a single coin to the frog again at the end (the only send that checked out)
 if(t>22.0&&t<22.5){const k=seg(t,22.0,22.5),X=44+(80-44)*k,Y=H0-10-Math.sin(k*Math.PI)*22+(k*6);spr(c,"coin",X,Y)}
 // Robin
 const face=t>4.0&&t<8?"wow":t>13.4&&t<17.5?"strain":t>20.0?"grin":"";const P0={ang:45,bend:0,dx:0,face,spin:false,shake:t>14.4&&t<15.5?1:0};
 const bob=boatRobin(c,4,H0,now,P0),rx=14,ry=H0-31+bob,hdx=rx+28,hdy=ry+23;robinArm(c,rx+25,ry+21,hdx,hdy);if(face)robinFace(c,rx,ry,face,now);
 const holdPhone=t>=6&&t<21;if(holdPhone){prect(c,hdx-1,hdy-6,8,11,"#241527");prect(c,hdx,hdy-5,6,9,"#3FA9F5");prect(c,hdx+1,hdy-4,4,2,"#BDF4FF");if(t>11.2&&t<17.5&&Math.floor(t*6)%2)prect(c,hdx+4,hdy-8,3,3,"#D7263D")}
 else rodBent(c,hdx+2,hdy+1,48,36,2,false,now);
 // story
 if(t<6.0){news(t,2.7,4.0);if(t>4.3)bubble("SEND MONEY TO ANYONE?! LET'S GO!",t,4.3,58,40,30)}
 else if(t<8.0)bubble("FIRST: $5 TO LIL FROG FOR BAIT.",t,6.0,58,40,30);
 else if(t<11.0)sendPanel(t,8.0,10.7);
 else if(t<15.6)requests(t,11.0,99);
 else if(t<17.5){requests(t,11.0,99);menu(t,15.6,t<16.7?0:1,["SEND","CHECK","PANIC","HIDE"])}
 else if(t<21.0){requests(t,11.0,20.6);verdicts(t)}
 else{bubble("SENDING IS EASY. UN-SENDING ISN'T.",t,21.0,58,40,30);
   if(t>23.0){const k=E.back(seg(t,23.0,23.3));const y=Math.round(52+(1-k)*20);prect(c,10,y-1,160,38,"#241527");prect(c,11,y,158,36,"#FFD23F");txt("CHECK WHO'S ASKING",W/2,y+5,1,"#241527",null,"c");txt("BEFORE YOU HIT",W/2,y+15,1,"#241527",null,"c");txt("SEND.",W/2,y+26,1,"#9E1B2E",null,"c")}}
 if(t>24.7){c.fillStyle=`rgba(255,255,255,${(seg(t,24.7,25)*.8).toFixed(2)})`;c.fillRect(0,0,W,H)}
}
return{cv,frame,setCoin(u){return new Promise(r=>{const im=new Image();im.onload=()=>{COIN=im;r()};im.src=u})}};
})();
