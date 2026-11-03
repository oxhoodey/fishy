window.TZ=(function(){
const W=180,H=180;const cv=document.createElement('canvas');cv.width=W;cv.height=H;const c=cv.getContext('2d');c.imageSmoothingEnabled=false;
const G={">":"10000010000010000010001000100010000",A:"01110100011000111111100011000110001",B:"11110100011111010001100011000111110",C:"01111100001000010000100001000001111",D:"11110100011000110001100011000111110",E:"11111100001111010000100001000011111",F:"11111100001111010000100001000010000",G:"01111100001000010111100011000101111",H:"10001100011111110001100011000110001",I:"11111001000010000100001000010011111",J:"00111000010000100001100011000101110",K:"10001100101110010010100011000110001",L:"10000100001000010000100001000011111",M:"10001110111010110001100011000110001",N:"10001110011010110011100011000110001",O:"01110100011000110001100011000101110",P:"11110100011000111110100001000010000",Q:"01110100011000110001101011001001101",R:"11110100011000111110100101000110001",S:"01111100000111000001000010000111110",T:"11111001000010000100001000010000100",U:"10001100011000110001100011000101110",V:"10001100011000110001010100101000100",W:"10001100011000110101101011101110001",X:"10001010100010000100010101000110001",Y:"10001100010101000100001000010000100",Z:"11111000010001000100010001000011111",
"0":"01110100011001110101110011000101110","1":"00100011000010000100001000010001110","2":"01110100010000100110010001000011111","3":"11110000010111000001000011000101110","4":"00010001100101010010111110001000010","5":"11111100001111000001000011000101110","6":"01110100001111010001100011000101110","7":"11111000010001000100010000100001000","8":"01110100011000101110100011000101110","9":"01110100011000101111000010000101110",
"!":"00100001000010000100001000000000100","?":"01110100010000100110001000000000100",".":"00000000000000000000000000000000100",":":"00000001000000000000000000010000000","%":"11001110010001000100010001001110011","$":"00100011111010001110001011111000100","-":"00000000000000011111000000000000000","+":"00000001000010011111001000010000000","·":"00000000000000000100000000000000000","'":"00100001000100000000000000000000000",",":"00000000000000000000000000010001000","/":"00001000010001000100010001000010000","_":"00000000000000000000000000000011111","@":"01110100011011110101101111000001110"," ":"00000000000000000000000000000000000"};
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





const H0=118,FL=172;
function slideK(t,t0,t1){return E.back(seg(t,t0,t0+.35))-(t>t1?E.out(seg(t,t1,t1+.3)):0)}
function stamp(t,t0,label,col,x,y,k){k=k||2;if(t<t0)return;const q=seg(t,t0,t0+.18),sc=q<1?3-2*E.out(q):1,w=tw(label,k)+12,h=7*k+10;c.save();c.translate(x,y);c.rotate(-.18);c.scale(sc,sc);
  prect(c,-w/2-2,-h/2-2,w+4,h+4,col);prect(c,-w/2,-h/2,w,h,"rgba(255,246,220,.92)");prect(c,-w/2+2,-h/2+2,w-4,h-4,col);prect(c,-w/2+3,-h/2+3,w-6,h-6,"rgba(255,246,220,.95)");txt(label,0,-Math.round(7*k/2),k,col,null,"c");c.restore()}
function box(x,y,w,h,fill){prect(c,x-1,y-1,w+2,h+2,"#241527");prect(c,x,y,w,h,fill)}
function tick(x,y){prect(c,x,y+3,2,2,"#2E7D46");prect(c,x+2,y+4,2,2,"#2E7D46");prect(c,x+4,y,2,4,"#2E7D46");prect(c,x+5,y-1,2,2,"#2E7D46")}
const STEPS=[{n:"1",t:"GET THE CA",s:"ONLY FROM @FISHY_RH",ic:"x"},{n:"2",t:"CHECK IT ON FISHY",s:"PASTE CA · READ THE GRADE",ic:"check"},{n:"3",t:"OPEN PONS",s:"CONNECT WALLET · RHC 4663",ic:"pons"},{n:"4",t:"BUY WITH ETH",s:"ONLY WHAT YOU CAN LOSE",ic:"buy"}];
function stepCard(t,i){const t0=5.0+i*3.4,t1=t0+3.2;if(t<t0||t>t1+.3)return;const S2=STEPS[i],k=slideK(t,t0,t1);if(k<=0)return;const x=8,y=Math.round(8+(1-k)*-110),w=164,h=94,f=t-t0;
  box(x,y,w,h,"#FFF6DC");prect(c,x,y,w,12,"#3E8E5E");txt("HOW TO CATCH ONE",x+5,y+3,1,"#FFF6DC");txt(S2.n+"/4",x+w-5,y+3,1,"#FFD23F",null,"r");
  box(x+6,y+17,14,14,"#FFD23F");txt(S2.n,x+11,y+21,1,"#241527");txt(S2.t,x+26,y+21,1,"#241527");
  const cx=x+w/2,cy=y+52;
  if(S2.ic==="x"){box(cx-44,cy-12,88,22,"#111018");prect(c,cx-40,cy-8,14,14,"#FFFFFF");for(let j=0;j<10;j++){prect(c,cx-38+j,cy-6+j,2,1,"#111018");prect(c,cx-29-j,cy-6+j,2,1,"#111018")}txt("@FISHY_RH",cx+8,cy-3,1,"#FFFFFF",null,"c");if(f>1.2)stamp(t,t0+1.2,"OFFICIAL","#2E7D46",cx+40,cy+16,1)}
  else if(S2.ic==="check"){box(cx-50,cy-12,74,12,"#FFF6DC");txt("0X12...ABCD",cx-46,cy-9,1,"#241527");box(cx+28,cy-12,22,12,"#3E8E5E");txt("GO",cx+33,cy-9,1,"#FFF6DC");
    if(f>1.0){box(cx-50,cy+4,100,18,"#FFF6DC");box(cx-48,cy+6,14,14,"#2E9E5B");txt("A",cx-44,cy+10,1,"#FFFFFF");txt("REAL FISH",cx-28,cy+10,1,"#2E7D46");tick(cx+36,cy+10)}}
  else if(S2.ic==="pons"){box(cx-50,cy-14,100,36,"#FFF6DC");prect(c,cx-50,cy-14,100,7,"#14286E");txt("PONSFAMILY.COM",cx-46,cy-13,1,"#FFF6DC");
    const on=f>1.0;box(cx-30,cy-2,60,14,on?"#2E9E5B":"#FFD23F");txt(on?"CONNECTED":"CONNECT",cx,cy+2,1,on?"#FFFFFF":"#241527",null,"c")}
  else{spr(c,"coin",cx-40,cy-6);spr(c,"coin",cx-30,cy-2);txt(">",cx-14,cy-4,2,"#241527");c.save();c.translate(cx+2,cy-10);c.scale(1.6,1.6);spr(c,"bass",0,0,false);c.restore();if(f>1.1)txt("SMALL BITE. NO FOMO.",cx,cy+14,1,"#9E1B2E",null,"c")}
  txt(S2.s,x+w/2,y+h-11,1,"#8B5A2B",null,"c")}
function frame(t){const now=t*1000;c.setTransform(1,0,0,1,0,0);c.clearRect(0,0,W,H);
 const bg=()=>seaBase(c,W,H,now,H0,FL,{dock:true,rich:false});
 if(t<2.6){bg();c.fillStyle="rgba(10,22,64,.66)";c.fillRect(0,0,W,H);const k=E.back(seg(t,.1,.6));drawLogoAt(W/2,Math.round(-40+k*(14+40)),2);
   if(t>.5)txt("EPISODE 12",W/2,70,1,"#FFD23F","#241527","c");
   if(t>.8){const s=E.back(seg(t,.8,1.2));txt("HOW TO",W/2,Math.round(84+(1-s)*16),2,"#FFF6DC","#241527","c");txt("CATCH ONE",W/2,Math.round(102+(1-s)*16),2,"#5FCB6A","#0A4A2A","c")}
   if(t>1.4)txt("A PONS GUIDE",W/2,134,1,"#BDF4FF","#241527","c");
   if(t>2.35){c.fillStyle="rgba(255,255,255,.7)";c.fillRect(0,0,W,H)}return}
 if(t>=25){const u=t-25;bg();c.fillStyle="rgba(10,22,64,.66)";c.fillRect(0,0,W,H);const k=E.back(seg(u,0,.5));drawLogoAt(W/2,Math.round(-50+k*(14+50)),2);
   if(u>.4){const s="LAUNCHING ON PONS · SOON",w=tw(s,1)+14;prect(c,W/2-w/2-2,74,w+4,15,"#FFD23F");prect(c,W/2-w/2,76,w,11,"#3E8E5E");txt(s,W/2,78,1,"#FFF6DC",null,"c")}
   if(COIN&&u>.7){const a=(u-.7)*4,sx=Math.abs(Math.cos(a)),cw=Math.max(2,Math.round(38*sx));c.drawImage(COIN,0,0,64,64,Math.round(W/2-cw/2),96,cw,38)}
   if(u>1.0)txt("REAL CA ONLY ON @FISHY_RH",W/2,144,1,"#FFD23F","#241527","c");if(u>1.3)txt("NOT FINANCIAL ADVICE",W/2,158,1,"#BDF4FF","#241527","c");return}
 bg();
 // a teaching board on the dock
 prect(c,128,H0-34,2,34,"#5C3A1A");prect(c,166,H0-34,2,34,"#5C3A1A");box(124,H0-48,48,26,"#2E5A3A");txt("STEP",148,H0-44,1,"#FFF6DC",null,"c");
 const cur=t<5?0:Math.min(4,1+Math.floor((t-5)/3.4));txt(t<5?"?":t>18.6?"OK":cur+"/4",148,H0-34,1,"#FFD23F",null,"c");
 // kraken in the DMs 18.8-21.8
 if(t>18.8&&t<22.2){const up=E.out(seg(t,18.8,19.4)),dn=seg(t,21.2,22.0);c.save();c.translate(104,Math.round(H0+44-up*34+dn*60));c.scale(2,2);spr(c,"kraken",0,0,false);c.restore();
   if(t<21.2){const k=E.back(seg(t,18.9,19.2)),y=Math.round(14+(1-k)*-50);box(20,y,140,40,"#FFF6DC");prect(c,20,y,140,11,"#7A1020");txt("NEW DM · KRAKEN",26,y+2,1,"#FFFFFF");txt("SEND ETH HERE,",26,y+16,1,"#241527");txt("GET 2X BACK!",26,y+26,1,"#241527");stamp(t,20.0,"SCAM","#D7263D",128,y+26,2)}}
 // Robin points at the board
 const face=t>18.8&&t<20.2?"strain":t>20.2?"grin":"";const P0={ang:45,bend:0,dx:0,face,spin:false,shake:0};
 const bob=boatRobin(c,4,H0,now,P0),rx=14,ry=H0-31+bob,hdx=rx+28,hdy=ry+23;robinArm(c,rx+25,ry+21,hdx,hdy);if(face)robinFace(c,rx,ry,face,now);rodBent(c,hdx+2,hdy+1,45,36,2,false,now);
 // story
 if(t<5.0)bubble("NEVER BOUGHT ON PONS? HERE'S HOW ROBIN DOES IT.",t,2.8,58,40,32);
 else if(t<18.6){for(let i=0;i<4;i++)stepCard(t,i)}
 else if(t<21.2){}
 else if(t<22.9)bubble("NOBODY LEGIT WILL EVER DM YOU A CA.",t,21.2,58,40,36);
 else{const k=slideK(t,22.9,99),y=Math.round(10+(1-k)*-90),x=8,w=164,h=58;if(k>0){box(x,y,w,h,"#FFD23F");txt("ROBIN'S RULES",W/2,y+5,1,"#9E1B2E",null,"c");
   txt("CA FROM @FISHY_RH ONLY",x+8,y+19,1,"#241527");txt("CHECK IT ON FISHY FIRST",x+8,y+30,1,"#241527");txt("NO DMS. NO FOMO.",x+8,y+41,1,"#241527")}}
 if(t>24.7){c.fillStyle=`rgba(255,255,255,${(seg(t,24.7,25)*.8).toFixed(2)})`;c.fillRect(0,0,W,H)}
}
return{cv,frame,setCoin(u){return new Promise(r=>{const im=new Image();im.onload=()=>{COIN=im;r()};im.src=u})}};
})();
