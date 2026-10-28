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
function shillSign(x,y){prect(c,x+21,y+22,2,12,"#5C3A1A");prect(c,x-1,y-1,46,24,"#241527");prect(c,x,y,44,22,"#E8A866");prect(c,x,y,44,1,"#FFE2A8");txt("PEPE2",x+22,y+3,1,"#3B2416",null,"c");txt("1000X!!",x+22,y+12,1,"#D7263D",null,"c")}
function fin(x,y){for(let i=0;i<7;i++)prect(c,x+i,y-i,7-i,1,i<2?"#46546C":"#66778F");prect(c,x-2,y+1,12,1,"#E6FBFF")}
function panel(t,t0,t1){const k=E.back(seg(t,t0,t0+.4))-(t>t1?E.out(seg(t,t1,t1+.3)):0);if(k<=0)return;const x=Math.round(-160+k*(160+18)),y=26,w=144,h=86;
  prect(c,x-2,y-2,w+4,h+4,"#0A1640");prect(c,x,y,w,h,"#14286E");prect(c,x,y,w,12,"#3E8E5E");txt("FISHY CHECK · PEPE2",x+6,y+3,1,"#FFF6DC");
  const rows=[["REAL VOLUME","8%",9.4],["EXIT AT 5%","$40",10.2],["LARP SCAN","CLONE",11.0]];rows.forEach(([a,b,tt],i)=>{if(t<tt)return;const yy=y+18+i*14;txt(a,x+6,yy,1,"#BDF4FF");txt(b,x+w-20,yy,1,"#FF8F7A",null,"r");
    const s=E.back(seg(t,tt,tt+.2));if(s>.3){prect(c,x+w-14,yy-1,9,9,"#D7263D");txt("X",x+w-12,yy,1,"#FFFFFF")}});
  if(t>11.8){const s=seg(t,11.8,12.0)<1?1.5:1;const label="GRADE F",ww=tw(label,s*2)+10;prect(c,x+w/2-ww/2-1,y+60-1,ww+2,7*s*2+8,"#241527");prect(c,x+w/2-ww/2,y+60,ww,7*s*2+6,"#D7263D");txt(label,x+w/2,y+63,s*2,"#FFFFFF",null,"c")}}
const H0=118,FL=172;
function scene(now,opts){seaBase(c,W,H,now,H0,FL,{dock:false,rich:false});rock(c,154,H0-5,46,11)}
function frame(t){const now=t*1000;c.setTransform(1,0,0,1,0,0);c.clearRect(0,0,W,H);
 // title 0-2.5
 if(t<2.5){scene(now);c.fillStyle="rgba(10,22,64,.6)";c.fillRect(0,0,W,H);const k=E.back(seg(t,.1,.6));drawLogoAt(W/2,Math.round(-40+k*(20+40)),2);
   if(t>.6)txt("EPISODE 1",W/2,80,1,"#FFD23F","#241527","c");if(t>.9){const s=E.back(seg(t,.9,1.3));txt("THE SHILL",W/2,Math.round(92+(1-s)*20),3,"#FFF6DC","#241527","c")}
   if(t>2.2){c.fillStyle="rgba(255,255,255,.7)";c.fillRect(0,0,W,H)}return}
 // end card 23-26
 if(t>=23){const u=t-23;scene(now);c.fillStyle="rgba(10,22,64,.6)";c.fillRect(0,0,W,H);const k=E.back(seg(u,0,.6));drawLogoAt(W/2,Math.round(-60+k*(20+60)),2);
   if(u>.4){const s="IS THIS TOKEN FISHY?",w=tw(s,1)+14;prect(c,W/2-w/2-2,80,w+4,15,"#BDF4FF");prect(c,W/2-w/2,82,w,11,"#14286E");txt(s,W/2,84,1,"#FFF6DC",null,"c")}
   if(COIN&&u>.7){const a=(u-.7)*4,sx=Math.abs(Math.cos(a)),cw=Math.max(2,Math.round(40*sx));c.drawImage(COIN,0,0,64,64,Math.round(W/2-cw/2),102,cw,40)}
   if(u>1.0)txt("BUILT ON ROBINHOOD CHAIN",W/2,152,1,"#FFF6DC","#241527","c");if(u>1.3)txt("NEXT EPISODE: THE KRAKEN",W/2,166,1,"#FFD23F","#241527","c");return}
 scene(now);
 // ducks rain 15.6+
 if(t>15.6){for(let i=0;i<9;i++){const t0=15.6+i*.18;if(t<t0)continue;const x=96+((i*37)%78),fallY=Math.min(H0-6,-10+(t-t0)*260);spr(c,"duck",x,fallY+(fallY>=H0-6?Math.round(Math.sin(now/250+i)):0),i%2===1);
   if(fallY>=H0-6&&t-t0<.9&&Math.floor((t-t0)*6)%2===0)txt("QUACK",x+5,H0-18-((i%3)*8),1,"#FFD23F","#241527","c")}}
 // shark fin approaching, then jump
 if(t>17.4&&t<19.0){const x=Math.round(W+10-seg(t,17.4,18.8)*(W+10-150));fin(x,H0)}
 // the shill crab: pops up at 3.0, sweats at 15.2, runs at 18.8
 const crabUp=E.back(seg(t,3.0,3.4)),run=seg(t,18.8,19.4),cx=Math.round(136+run*90),cy=Math.round(H0-4-26-(1-crabUp)*-30+(t>18.8?-Math.abs(Math.sin(now/40))*2:0));
 if(t>3.0&&cx<W+10){if(t<3.4)for(let i=0;i<8;i++)prect(c,140+i*4,H0-2-(i%2)*3,2,2,"#FFFFFF");
   const sweat=t>15.2&&t<19;scaled("crab",cx,cy,3,false);if(sweat){const d=Math.floor(now/120)%4;prect(c,cx+3,cy-3+d,2,3,"#8FD3FF");prect(c,cx+35,cy+d,2,3,"#8FD3FF")}
   if(t>18.8)for(let i=0;i<4;i++)prect(c,cx-4-i*5,H0-6+((i+Math.floor(now/60))%2),3,2,"#E6FBFF")}
 const signGone=t>19.4;if(t>3.3&&!signGone){const sx=t>18.8?cx-3:133,sy=cy-30;shillSign(sx,sy)}
 if(t>19.0&&t<20.2){const k=seg(t,19.0,19.8),Y=Math.round(H0+10-Math.sin(k*Math.PI)*50);scaled("shark",120,Y,1.5,false);if(k>.45&&k<.7)for(let i=0;i<8;i++)prect(c,150+((i*11)%30),Y-6+((i*7)%10),2,2,"#E8A866")}
 // Robin: faces the crab, turns to camera at the end
 const P0={ang:45,bend:0,dx:0,face:t>19.8?"grin":t>15.2&&t<19.8?"":t>13&&t<15.2?"":"",spin:false,shake:0};
 const bob=boatRobin(c,14,H0,now,P0),rx=24,ry=H0-31+bob,hdx=rx+28,hdy=ry+23;robinArm(c,rx+25,ry+21,hdx,hdy);if(P0.face)robinFace(c,rx,ry,P0.face,now);
 if(t<8.6||t>13)rodBent(c,hdx+2,hdy+1,48,40,2,false,now);
 if(t>=8.6&&t<=13){prect(c,hdx-1,hdy-6,8,11,"#241527");prect(c,hdx,hdy-5,6,9,"#3FA9F5");prect(c,hdx+1,hdy-4,4,2,"#BDF4FF")}
 // dialogue
 if(t<7)bubble("PSST! NEW TOKEN! PEPE2. 1000X GUARANTEED. TRUST ME BRO.",t,4.0,140,150,26);
 else if(t<8.6)bubble("HMM... LET ME CHECK IT FIRST.",t,7.0,60,46,24);
 else if(t<13)panel(t,8.6,12.7);
 else if(t<15.2)bubble("8% REAL VOLUME. $40 EXIT. AND IT'S A CLONE.",t,13.1,60,46,26);
 else if(t<17.4)bubble("IT'S... UH... A COMMUNITY TOKEN?",t,15.3,140,150,22);
 else if(t<19.8){if(t>18.3)bubble("...GOTTA GO!",t,18.3,150,160,30)}
 else{bubble("THAT'S FISHY: REAL VOLUME, REAL EXIT, RUG ALERTS.",t,19.9,80,46,30);
   const ic=[["duck",20.9,"FAKE"],["door",21.3,"EXIT"],["sharkI",21.7,"RUG"]];ic.forEach(([n,tt,lab],i)=>{if(t<tt)return;const s=E.back(seg(t,tt,tt+.3)),x=100+i*0,y=0;const X=72+i*36,Y=Math.round(52+(1-s)*10);prect(c,X-3,Y-3,26,26,"#241527");prect(c,X-2,Y-2,24,24,"#FFF6DC");drawIll(n,X+2,Y+2,1);txt(lab,X+9,Y+25,1,"#FFF6DC","#241527","c")})}
 if(t>22.7){c.fillStyle=`rgba(255,255,255,${(seg(t,22.7,23)*.8).toFixed(2)})`;c.fillRect(0,0,W,H)}
}
return{cv,frame,setCoin(u){return new Promise(r=>{const im=new Image();im.onload=()=>{COIN=im;r()};im.src=u})}};
})();
