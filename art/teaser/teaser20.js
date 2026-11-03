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






const H0=118,FL=172,BX=148,BY=H0-40;
function box(x,y,w,h,fill){prect(c,x-1,y-1,w+2,h+2,"#241527");prect(c,x,y,w,h,fill)}
function slideK(t,t0,t1){return E.back(seg(t,t0,t0+.35))-(t>t1?E.out(seg(t,t1,t1+.3)):0)}
function bell(x,y,ring,now){const sw=ring?Math.round(Math.sin(now/40)*3):0;const B=["...XX...","..XYYX..",".XYYYYX.",".XYYYYX.",".XYYYYX.","XYYYYYYX","XXXXXXXX","...XX..."];
  c.save();c.translate(x+4,y);c.rotate(sw*.08);B.forEach((r,j)=>{for(let i=0;i<r.length;i++){if(r[i]===".")continue;prect(c,(i-4)*2,j*2,2,2,r[i]==="X"?"#241527":"#FFD23F")}});c.restore();
  if(ring){for(let i=0;i<3;i++){const a=Math.floor(now/120+i)%2;if(a){prect(c,x-8-i*3,y+3+i*3,3,1,"#FFFFFF");prect(c,x+15+i*3,y+3+i*3,3,1,"#FFFFFF")}}}}
function meter(x,y,pct,sym){box(x,y,40,22,"#FFF6DC");txt(sym,x+20,y+2,1,"#241527",null,"c");prect(c,x+3,y+12,34,7,"#241527");prect(c,x+4,y+13,32,5,"#E8E1CC");prect(c,x+4,y+13,Math.max(1,Math.round(32*pct)),5,pct<.7?"#D7263D":"#5FCB6A")}
function frame(t){const now=t*1000;c.setTransform(1,0,0,1,0,0);c.clearRect(0,0,W,H);
 seaBase(c,W,H,now,H0,FL,{dock:true,rich:false});
 if(t<2.6){c.fillStyle="rgba(10,22,64,.66)";c.fillRect(0,0,W,H);const k=E.back(seg(t,.1,.6));drawLogoAt(W/2,Math.round(-40+k*(14+40)),2);
   if(t>.5)txt("EPISODE 13",W/2,70,1,"#FFD23F","#241527","c");
   if(t>.8){const s=E.back(seg(t,.8,1.2));txt("THE",W/2,Math.round(84+(1-s)*16),2,"#FFF6DC","#241527","c");txt("BELL",W/2,Math.round(102+(1-s)*16),3,"#FFD23F","#9E1B2E","c")}
   if(t>1.3)bell(W/2-4,134,true,now);
   if(t>2.35){c.fillStyle="rgba(255,255,255,.7)";c.fillRect(0,0,W,H)}return}
 if(t>=25){const u=t-25;c.fillStyle="rgba(10,22,64,.66)";c.fillRect(0,0,W,H);const k=E.back(seg(u,0,.5));drawLogoAt(W/2,Math.round(-50+k*(14+50)),2);
   if(u>.4){const s="RUG ALERTS · LIVE",w=tw(s,1)+14;prect(c,W/2-w/2-2,74,w+4,15,"#FFD23F");prect(c,W/2-w/2,76,w,11,"#D7263D");txt(s,W/2,78,1,"#FFF6DC",null,"c")}
   if(u>.6)bell(W/2-4,100,u<1.6,now);
   if(u>1.0)txt("FREE · NO WALLET",W/2,128,1,"#FFF6DC","#241527","c");if(u>1.2)txt("@FISHY_RH",W/2,144,1,"#FFD23F","#241527","c");if(u>1.4)txt("TELEGRAM BOT NEXT",W/2,158,1,"#BDF4FF","#241527","c");return}
 // the watched pool: liquidity meter + bell on the dock (from 6.0)
 const pct=t<11?1:t<13.5?1-E.out(seg(t,11,13.5))*.6:.4,ring=t>12.2&&t<16;
 if(t>6.0){const k=E.back(seg(t,6.0,6.4));prect(c,BX+4,BY+4,2,44,"#5C3A1A");prect(c,BX-4,BY+2,18,2,"#5C3A1A");bell(BX,Math.round(BY+4-(1-k)*20),ring,now);if(t<21.6)meter(BX-26,BY-26,pct,"LUREX")}
 // holders in the pool, then fleeing; shark sneaking in
 const flee=seg(t,14.2,15.4);
 [["bass",112,H0+12],["koi",128,H0+24],["trout",96,H0+20]].forEach(([k2,x,y],i)=>{const xx=Math.round(x-flee*flee*240),yy=y+Math.round(Math.sin(now/300+i)*1);if(xx>-24)spr(c,k2,xx,yy,flee>0)});
 if(t>10.6&&t<20){const k=E.out(seg(t,10.6,12.2)),xx=Math.round(W+10-k*70+seg(t,17,19.5)*90);c.save();c.translate(xx,H0+26);c.scale(1.5,1.5);spr(c,"shark",0,0,false);c.restore();if(t>15.4&&t<17)txt("...",xx+10,H0+16,1,"#FFFFFF","#241527")}
 // Robin
 const face=t>2.6&&t<5?"strain":t>12.2&&t<14.2?"wow":t>14.2?"grin":"";const P0={ang:45,bend:0,dx:0,face,spin:false,shake:0};
 const bob=boatRobin(c,4,H0,now,P0),rx=14,ry=H0-31+bob,hdx=rx+28,hdy=ry+23;robinArm(c,rx+25,ry+21,hdx,hdy);if(face)robinFace(c,rx,ry,face,now);
 const phone=(t>2.6&&t<5.2)||(t>12.4&&t<15);if(phone){prect(c,hdx-1,hdy-6,8,11,"#241527");prect(c,hdx,hdy-5,6,9,t>12?"#D7263D":"#3FA9F5");prect(c,hdx+1,hdy-4,4,2,"#BDF4FF")}else rodBent(c,hdx+2,hdy+1,45,36,2,false,now);
 // a happy catch while the bell watches
 if(t>8.2&&t<10.4){const k=seg(t,8.2,9.0);spr(c,"minnow",Math.round(hdx+26-k*8),Math.round(H0-4-Math.sin(k*Math.PI)*14));if(t>9.2)txt("NICE",hdx+20,H0-28,1,"#FFFFFF","#241527")}
 // story
 if(t<5.2){bubble("STARING AT CHARTS ALL DAY...",t,2.8,58,40,30);if(t>3.6)for(let i=0;i<3;i++){const a=((now/400+i/3)%1);txt("Z",30+i*6,Math.round(78-a*10),1,`rgba(255,255,255,${(1-a).toFixed(2)})`)}}
 else if(t<8.0)bubble("...OR LET THE BELL WATCH.",t,5.3,58,40,30);
 else if(t<11.0){}
 else if(t<12.2){}
 else if(t<14.2){const k=E.back(seg(t,12.2,12.5)),y=Math.round(8+(1-k)*-40);box(10,y,160,30,"#D7263D");box(16,y+5,58,10,"#FFD23F");txt("RUG ALERT",45,y+7,1,"#241527",null,"c");txt("LUREX LIQUIDITY -60%",W/2,y+19,1,"#FFFFFF",null,"c")}
 else if(t<17.0)bubble("THANKS, BELL. EVERYBODY OUT!",t,14.3,58,40,30);
 else if(t<21.6){const k=slideK(t,17.0,21.3),y=Math.round(8+(1-k)*-90),x=8,w=164,h=64;if(k>0){box(x,y,w,h,"#FFF6DC");prect(c,x,y,w,12,"#D7263D");txt("RUG ALERTS · LIVE ON FISHY",x+5,y+3,1,"#FFFFFF");
   txt("1. CHECK ANY TOKEN",x+8,y+18,1,"#241527");txt("2. HIT RUG ALERT",x+8,y+30,1,"#241527");txt("3. WARNED AT -30%",x+8,y+42,1,"#241527");txt("FREE · NO WALLET",W/2,y+53,1,"#2E7D46",null,"c")}}
 else{bubble("STOP STARING. LET THE BELL WATCH.",t,21.6,58,40,30);if(t>22.6)txt("KEEP A FISHY TAB OPEN",W/2,58,1,"#FFFFFF","#241527","c");if(t>23)txt("TELEGRAM ALERTS: NEXT",W/2,70,1,"#FFD23F","#241527","c")}
 if(t>24.7){c.fillStyle=`rgba(255,255,255,${(seg(t,24.7,25)*.8).toFixed(2)})`;c.fillRect(0,0,W,H)}
}
return{cv,frame,setCoin(u){return new Promise(r=>{const im=new Image();im.onload=()=>{COIN=im;r()};im.src=u})}};
})();
