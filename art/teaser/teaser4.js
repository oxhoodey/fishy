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

function bottle(x,y,tilt){x=Math.round(x);y=Math.round(y);const o=tilt?1:0;prect(c,x+1,y,3,2,"#A8683A");prect(c,x+1,y+2,3,1,"#241527");prect(c,x,y+3,5,8,"#241527");prect(c,x+1,y+3,3,7,"#7FD3B8");prect(c,x+1,y+3,1,6,"#C8F2E4");prect(c,x+2,y+5,2,3,"#F6E7C1")}
function envelope(x,y,badge){x=Math.round(x);y=Math.round(y);prect(c,x,y,10,7,"#241527");prect(c,x+1,y+1,8,5,"#FFFFFF");pline(c,x+1,y+1,x+5,y+4,"#B9B2A3");pline(c,x+8,y+1,x+5,y+4,"#B9B2A3");if(badge){prect(c,x+7,y-2,4,4,"#D7263D");prect(c,x+8,y-1,2,2,"#FF8F7A")}}
function dmCard(s,scam,x,y){const lines=wrap(s,18),h=lines.length*9+6,w=124;prect(c,x-1,y-1,w+2,h+2,"#241527");prect(c,x,y,w,h,scam?"#FFE1DC":"#FFFFFF");prect(c,x+3,y+3,7,7,scam?"#D7263D":"#3FA9F5");prect(c,x+4,y+4,5,2,"#FFFFFF");
  lines.forEach((l,i)=>txt(l,x+14,y+3+i*9,1,scam?"#9E1B2E":"#241527"));if(scam){prect(c,x+w-26,y+h-9,24,8,"#D7263D");txt("SCAM",x+w-24,y+h-8,1,"#FFFFFF")}return h}
function counter(n,t){if(n<=0)return;const s="DMS "+(n>999?"999+":String(n)),w=tw(s,1)+10,x=W-w-4,y=4,sc=1;prect(c,x-1,y-1,w+2,13,"#241527");prect(c,x,y,w,11,"#D7263D");txt(s,x+5,y+2,1,"#FFFFFF")}
function dmKraken(x,y,now,k){for(let tn=0;tn<5;tn++){let tx=x+4+tn*10,ty=y+16;const spread=(tn-2)*3.2;for(let sg=0;sg<5;sg++){tx+=spread+Math.sin(now/240+tn*1.3+sg*.9)*3;ty+=7;envelope(tx,ty,sg===4)}}c.save();c.translate(x,y);c.scale(2,2);spr(c,"kraken",0,0,false);c.restore()}
function megaphone(x,y){prect(c,x,y+2,3,4,"#241527");prect(c,x+3,y,6,8,"#241527");prect(c,x+3,y+1,5,6,"#E8443F");prect(c,x+4,y+1,3,2,"#FF8F7A");prect(c,x+9,y-1,2,10,"#241527");prect(c,x+9,y,1,8,"#FFE27A")}
function board(lines,t,times){const w=168,x=6,y=6,h=14+lines.length*11;frameBox(x,y,w,h,"#F6E7C1");lines.forEach((l,i)=>{if(t<times[i])return;const s=E.back(seg(t,times[i],times[i]+.2));txt(l,W/2,Math.round(y+8+i*11+(1-s)*6),1,i===lines.length-1?"#D7263D":"#3B2416",null,"c")})}
const H0=120,FL=172;
const DMS=[["SER, KOL PACKAGE. 50 CALLS. CHEAP.",0],["TIER-1 LISTING. JUST 3 BTC. TRUST.",0],["COLLAB?",0],["HI, I'M FROM SUPPORT. VERIFY YOUR WALLET.",1],["GM GM GM GM GM GM",0],["SEND 0.5 ETH, GET 5 ETH BACK!",1]];
function frame(t){const now=t*1000;c.setTransform(1,0,0,1,0,0);c.clearRect(0,0,W,H);
 const bg=()=>seaBase(c,W,H,now,H0,FL,{dock:false,rich:false});
 // title 0-2.6
 if(t<2.6){bg();c.fillStyle="rgba(10,22,64,.6)";c.fillRect(0,0,W,H);const k=E.back(seg(t,.1,.6));drawLogoAt(W/2,Math.round(-40+k*(16+40)),2);
   if(t>.5)txt("EPISODE 2",W/2,74,1,"#FFD23F","#241527","c");if(t>.8){const g=t>1.7&&t<1.9?Math.round(Math.sin(now)*4):0;txt("THE KRAKEN",W/2+g,86,2,"#FFF6DC","#241527","c")}
   if(t>1.7&&t<1.9){for(let i=0;i<8;i++)prect(c,0,(i*23+Math.floor(now/16)*7)%H,W,2,i%2?"#FF3B3B":"#7FE3FF")}
   if(t>1.9){const s=seg(t,1.9,2.05)<1?1.4:1;const lab="...OF DMS",w=tw(lab,s*2)+12;prect(c,W/2-w/2-1,107,w+2,7*s*2+10,"#241527");prect(c,W/2-w/2,108,w,7*s*2+8,"#D7263D");txt(lab,W/2,112,s*2,"#FFFFFF",null,"c")}
   return}
 // end card 25-28
 if(t>=25){const u=t-25;bg();c.fillStyle="rgba(10,22,64,.68)";c.fillRect(0,0,W,H);const k=E.back(seg(u,0,.5));drawLogoAt(W/2,Math.round(-50+k*(12+50)),2);
   if(u>.4){const a="FISHY WILL NEVER",b="DM YOU FIRST.";txt(a,W/2,72,1,"#FFF6DC","#241527","c");txt(b,W/2,84,2,"#FFD23F","#241527","c")}
   if(u>1.0){const L=["NO PAID PROMO","NO SEED PHRASES","NO 'SUPPORT' DMS"];L.forEach((l,i)=>{if(u>1.0+i*.25){prect(c,40,108+i*12,7,7,"#D7263D");txt("X",41,108+i*12,1,"#FFFFFF");txt(l,52,108+i*12,1,"#FFF6DC","#241527")}})}
   if(u>2.0){const s="IS THIS TOKEN FISHY?",w=tw(s,1)+14;prect(c,W/2-w/2-2,152,w+4,15,"#BDF4FF");prect(c,W/2-w/2,154,w,11,"#14286E");txt(s,W/2,156,1,"#FFF6DC",null,"c")}return}
 bg();
 // flood of bottles 7.4-21.6
 const nb=t<7.4?0:t<21.0?Math.min(18,Math.floor((t-7.4)*3)):Math.max(0,18-Math.floor((t-21.0)*12));
 for(let i=0;i<nb;i++){const x=70+((i*41)%104),sink=t>21.0?seg(t,21.0+i*.03,21.6+i*.03)*20:0;bottle(x,H0-9+Math.round(Math.sin(now/300+i)*1)+sink,i%2)}
 // kraken of DMs 11.6-22.4
 if(t>11.6&&t<22.6){const rise=E.out(seg(t,11.6,12.8)),fall=seg(t,21.0,22.4),def=1-fall*.6;const kx=104,ky=Math.round(H0+30-rise*86+fall*90);c.save();c.globalAlpha=1;dmKraken(kx,ky,now,def);c.restore();
   if(t<13.2&&t>11.8){const sh=Math.round(Math.sin(now/25)*2);c.translate(sh,0)}}
 // Robin
 const scared=t>11.6&&t<21.0,P0={ang:45,bend:0,dx:scared?Math.round(Math.sin(now/30)):0,face:scared?"strain":t>23.6&&t<25?"":t>21.4?"grin":t>4.6&&t<7.4?"wow":"",spin:false,shake:0};
 if(t>3.6&&t<4.0){P0.bend=6;P0.ang=36}if(t>=4.0&&t<4.6){P0.ang=60;P0.spin=true;P0.bend=4}if(t>=4.6&&t<7.4){P0.ang=80}
 const bob=boatRobin(c,14,H0,now,P0),rx=24,ry=H0-31+bob,hdx=rx+28,hdy=ry+23;robinArm(c,rx+25,ry+21,hdx,hdy);if(P0.face)robinFace(c,rx,ry,P0.face,now);
 const megaOn=t>14.6&&t<21.0;
 if(megaOn)megaphone(hdx+2,hdy-6);
 else{const tip=rodBent(c,hdx+2,hdy+1,P0.ang,40,P0.bend,P0.spin,now),tx=Math.round(tip.x),ty=Math.round(tip.y);
   if(t<4.6){const fx=150,hy=t>3.6?H0+(t<4.0?6:Math.round(6-(t-4)*10)):H0;pline(c,tx,ty,fx,H0-1,"#FFFFFF");spr(c,"bobber",fx-1,H0-3+(t>3.6&&t<4.0?Math.round(Math.sin(now/40)):0))}
   else if(t<7.4){pline(c,tx,ty,tx,ty+6,"#FFFFFF");bottle(tx-2,ty+6,0)}}
 // DO NOT DISTURB sign on the boat
 if(t>21.0){const s=E.back(seg(t,21.0,21.3));const y=Math.round(H0-22-(1-s)*12),sx=70;prect(c,sx+20,y+14,2,10,"#5C3A1A");prect(c,sx-1,y-1,46,17,"#241527");prect(c,sx,y,44,15,"#D7263D");txt("DO NOT",sx+22,y+1,1,"#FFFFFF",null,"c");txt("DISTURB",sx+22,y+8,1,"#FFFFFF",null,"c")}
 // counter
 const cnt=t<4.8?0:t<7.4?1:t<11.6?Math.round(1+Math.pow(seg(t,7.4,11.4),2.2)*998):t<21.0?1000:t<21.8?Math.round(1000*(1-seg(t,21.0,21.8))):0;counter(cnt,t);
 // texts
 if(t>=4.8&&t<6.2){const h=dmCard("GM SER! WE CAN 100X YOUR TOKEN. PROMO $5K.",0,50,22)}
 else if(t>=6.2&&t<7.4)bubble("WE... DON'T EVEN DO PROMO.",t,6.2,60,46,24);
 else if(t>=7.4&&t<11.6){const shown=DMS.filter((d,i)=>t>7.6+i*.6);let y=22;shown.slice(-4).forEach(([s,scam],i)=>{const k=E.back(seg(t,7.6+(shown.length-4+i<0?0:DMS.indexOf(shown.slice(-4)[i]))*.6,7.6+DMS.indexOf(shown.slice(-4)[i])*.6+.25));y+=dmCard(s,scam,Math.round(52+(1-k)*130),y)+4})}
 else if(t>=11.6&&t<14.6){if(t>12.0)txt("BOSS: THE DM KRAKEN",W/2,54,1,"#FFFFFF","#9E1B2E","c");if(t>12.8)bubble("OH NO.",t,12.9,60,46,20)}
 else if(megaOn)board(["DEAR MARKETERS,","REAL OR SCAM:","PLEASE STOP DMING US.","NO PAID PROMO.","NO PAID CALLS.","WE WILL NEVER DM YOU FIRST."],t,[14.8,15.5,16.3,17.5,18.1,19.1]);
 else if(t>=21.6&&t<23.4)bubble("AH. PEACE AND QUIET.",t,21.8,60,46,24);
 else if(t>=23.4&&t<25){const by=Math.round(H0-9+(t>24.4?seg(t,24.4,24.8)*14:0)-(t<23.7?(1-seg(t,23.4,23.7))*-10:0));bottle(132,by,0);if(t>23.7&&t<24.4){prect(c,112,by-14,44,11,"#241527");prect(c,113,by-13,42,9,"#FFFFFF");txt("GM SER?",134,by-12,1,"#241527",null,"c")}if(t>24.0)bubble("...",t,24.0,60,46,8)}
 if(t>24.7){c.fillStyle=`rgba(255,255,255,${(seg(t,24.7,25)*.8).toFixed(2)})`;c.fillRect(0,0,W,H)}
}
return{cv,frame,setCoin(u){return new Promise(r=>{const im=new Image();im.onload=()=>{COIN=im;r()};im.src=u})}};
})();
