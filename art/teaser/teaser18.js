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









const H0=118,FL=172,DUR=15,FX=146,FY=H0-14,CA="0X9FB9FD...10CFA8";
function box(x,y,w,h,fill){prect(c,x-1,y-1,w+2,h+2,"#241527");prect(c,x,y,w,h,fill)}
function coin(x,y,sz,t){if(!COIN)return;const sx=Math.abs(Math.cos(t*3)),cw=Math.max(2,Math.round(sz*sx));c.drawImage(COIN,0,0,64,64,Math.round(x-cw/2),Math.round(y-sz/2),cw,sz)}
function stamp(t,t0,label,col,x,y,k){k=k||1;if(t<t0)return;const q=seg(t,t0,t0+.18),sc=q<1?3-2*E.out(q):1,w=tw(label,k)+12,h=7*k+10;c.save();c.translate(x,y);c.rotate(-.12);c.scale(sc,sc);
  prect(c,-w/2-2,-h/2-2,w+4,h+4,"#241527");prect(c,-w/2,-h/2,w,h,col);txt(label,0,-Math.round(7*k/2),k,"#FFF6DC",null,"c");c.restore()}
function fire(x,y,now,p){prect(c,x-12,y+4,24,3,"#5C3A1A");prect(c,x-13,y+6,26,2,"#241527");if(p<=0)return;
  for(let r=Math.round(28*p);r>4;r-=3){c.fillStyle="rgba(255,160,40,.05)";c.beginPath();c.arc(x,y-6,r,0,7);c.fill()}
  for(let i=0;i<9;i++){const hh=Math.round((5+((i*7)%5)+Math.sin(now/70+i*1.3)*3)*(.4+p*1.4)),xx=x-9+i*2;prect(c,xx,y+2-hh,2,hh,i%2?"#FF6B2C":"#FFD23F");prect(c,xx,y+2-Math.round(hh*.45),2,Math.max(1,Math.round(hh*.2)),"#FFF3B0")}
  for(let i=0;i<Math.round(6*p);i++){const k=((now/700+i/6)%1);prect(c,Math.round(x-6+((i*5)%13)+Math.sin(k*9+i)*3),Math.round(y-8-k*30*p),1,1,`rgba(255,220,120,${(1-k).toFixed(2)})`)}}
function sack(x,y){prect(c,x-9,y-15,18,16,"#241527");prect(c,x-8,y-14,16,14,"#A8683A");prect(c,x-3,y-18,6,4,"#241527");txt("$",x-2,y-10,1,"#FFE27A");const w=tw("DEV BAG",1)+4;prect(c,x-w/2-1,y-27,w+2,9,"#241527");prect(c,x-w/2,y-26,w,7,"#FFF6DC");txt("DEV BAG",x-w/2+2,y-25,1,"#241527")}
function confetti(t0,t,n,cy){const u=t-t0;if(u<0||u>4)return;for(let i=0;i<n;i++){const a=i*2.39,v=40+(i%7)*9,x=W/2+Math.cos(a)*v*u,y=cy+Math.sin(a)*v*u*.7+u*u*28;prect(c,Math.round(x),Math.round(y),2,2,["#FFD23F","#5FCB6A","#E8443F","#3FA9F5","#FFFFFF"][i%5])}}
function frame(t){const now=t*1000;c.setTransform(1,0,0,1,0,0);c.clearRect(0,0,W,H);
 seaBase(c,W,H,now,H0,FL,{dock:true,rich:false});c.fillStyle="rgba(10,22,64,.2)";c.fillRect(0,0,W,H);
 [["bass",96,H0+14],["koi",118,H0+26],["trout",136,H0+18],["minnow",84,H0+8]].forEach(([k2,x,y],i)=>{const j=t>4.6&&t<7?Math.round(-Math.abs(Math.sin(now/220+i*1.3))*8):0;spr(c,k2,x+Math.round(Math.sin(now/300+i)*2),y+j,false)});
 // dev bag goes in the fire 0.6-2.2
 const p=t<1.6?.35:Math.max(.7,1.5-(t-1.6)*.2);fire(FX,FY,now,p);
 const P0={ang:45,bend:0,dx:0,face:t<1.6?"":"grin",spin:false,shake:0};const bob=boatRobin(c,4,H0,now,P0),rx=14,ry=H0-31+bob,hdx=rx+28,hdy=ry+23;robinArm(c,rx+25,ry+21,hdx,hdy);if(P0.face)robinFace(c,rx,ry,P0.face,now);
 if(t<0.6)sack(hdx+8,hdy+2);else if(t<1.6){const k=seg(t,.6,1.6),x=hdx+8+(FX-hdx-8)*k,y=hdy+2+(FY-hdy-2)*k-Math.sin(k*Math.PI)*36;c.save();c.translate(x,y);c.rotate(k*6);c.translate(-x,-y);sack(x,y);c.restore()}
 else rodBent(c,hdx+2,hdy+1,45,36,2,false,now);
 if(t>1.6&&t<2.4){const k=seg(t,1.6,2.4);for(let i=0;i<10;i++){const a=i*.63,r=k*28;prect(c,Math.round(FX+Math.cos(a)*r),Math.round(FY-8+Math.sin(a)*r*.6-k*10),2,2,i%2?"#FFD23F":"#FF6B2C")}}
 if(t<2.6){if(t>.1)bubble("LAUNCH DAY. FIRST THING FIRST...",t,.1,58,40,30);return}
 // headline + coin
 if(t<11.4){const s=E.back(seg(t,2.6,3.0));txt("FISHY IS LIVE",W/2,Math.round(6+(1-s)*-30),2,"#FFF6DC","#241527","c");
   const s2=E.back(seg(t,2.9,3.3));const w=tw("ON PONS",2)+14;box(W/2-w/2,Math.round(24+(1-s2)*-40),w,20,"#3E8E5E");txt("ON PONS",W/2,Math.round(27+(1-s2)*-40),2,"#FFD23F",null,"c");
   const up=E.back(seg(t,3.2,3.8));coin(W/2,Math.round(140-up*72),Math.round(16+up*20),t);confetti(3.3,t,50,70);
   stamp(t,4.4,"DEV SUPPLY BURNED","#D7263D",W/2,94,1);stamp(t,5.4,"DEV HOLDS 0","#3E8E5E",W/2-42,122,1);stamp(t,6.2,"NO PRESALE","#3E8E5E",W/2+44,122,1);
   if(t>7.2){const k=E.back(seg(t,7.2,7.5)),y=Math.round(148+(1-k)*30);box(10,y,160,24,"#FFF6DC");txt("STILL EARLY ON THE CURVE",W/2,y+3,1,"#9E1B2E",null,"c");prect(c,16,y+13,148,7,"#241527");prect(c,17,y+14,146,5,"#E8E1CC");prect(c,17,y+14,Math.max(2,Math.round(146*.04*E.out(seg(t,7.5,8.4)))),5,"#FFD23F")}
   return}
 c.fillStyle="rgba(10,22,64,.72)";c.fillRect(0,0,W,H);const u=t-11.4,k=E.back(seg(u,0,.4));drawLogoAt(W/2,Math.round(-50+k*(14+50)),2);
 if(u>.3){const s3="LIVE ON PONS",w=tw(s3,2)+16;prect(c,W/2-w/2-2,70,w+4,24,"#FFD23F");prect(c,W/2-w/2,72,w,20,"#3E8E5E");txt(s3,W/2,75,2,"#FFF6DC",null,"c")}
 if(u>.5)txt("CA "+CA,W/2,106,1,"#FFF6DC","#241527","c");if(u>.7)txt("FULL CA ON @FISHY_RH",W/2,120,1,"#FFD23F","#241527","c");if(u>.9)txt("DEV SUPPLY: BURNED",W/2,140,1,"#FF8F7A","#241527","c");if(u>1.1)txt("NOT FINANCIAL ADVICE",W/2,156,1,"#BDF4FF","#241527","c");
 if(t>DUR-.4){c.fillStyle=`rgba(0,0,0,${seg(t,DUR-.4,DUR).toFixed(2)})`;c.fillRect(0,0,W,H)}
}
return{cv,frame,setCoin(u){return new Promise(r=>{const im=new Image();im.onload=()=>{COIN=im;r()};im.src=u})}};
})();
