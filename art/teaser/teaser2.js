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
function hpBox(x,y,name,lv,label,frac,col){frameBox(x,y,98,28,"#FFF6DC");txt(name,x+6,y+5,1,"#3B2416");txt(lv,x+92,y+5,1,"#8B5A2B",null,"r");txt(label,x+6,y+16,1,"#8B5A2B");prect(c,x+40,y+16,52,7,"#241527");prect(c,x+41,y+17,50,5,"#5C3A1A");
  const f=cl(frac,0,1),bc=col||(f>.5?"#5FCB6A":f>.2?"#FFD23F":"#E8443F");prect(c,x+41,y+17,Math.round(50*f),5,bc);prect(c,x+41,y+17,Math.round(50*f),1,"#FFFFFF")}
function pad(cx,cy,rw){for(let dy=-5;dy<=5;dy++){const w2=Math.round(rw*Math.sqrt(1-(dy*dy)/25));prect(c,cx-w2,cy+dy,w2*2,1,dy<-2?"#9EE07A":dy<2?"#5DB44C":"#36924A")}prect(c,cx-rw,cy,rw*2,1,"#36924A");prect(c,cx+rw*.4,cy-5,2,6,"#5A8F3E")}
function arena(now,drain){const g=["#0E2346","#13305A","#183D6C","#1D4A7C","#22588C","#28679C"];for(let i=0;i<6;i++)prect(c,0,i*23,W,23,g[i]);
  for(let i=0;i<40;i++){const x=(i*37)%W,y=(i*53)%60,tw2=Math.sin(now/300+i)>.6;if(tw2)prect(c,x,y,1,1,"#FFFFFF")}
  const lvl=78+Math.round(drain*26);for(let y=lvl;y<H;y++)prect(c,0,y,W,1,y<lvl+2?"#5FD0F0":y%7===0?"#1D6FA8":"#1A5E95");
  if(drain>0)prect(c,0,78,W,lvl-78,"#3A2A3E");for(let x=0;x<W;x+=4)if(Math.sin(x*.3+now/200)>.6)prect(c,x,lvl+3,3,1,"#9BE9F8")}
function night(now){const sk=["#0B1030","#111841","#182152","#212A62","#2B3470","#3A3F7C"];for(let i=0;i<6;i++)prect(c,0,i*14,W,14,sk[i]);
  for(let i=0;i<60;i++){const x=(i*73)%W,y=(i*29)%78;if(Math.sin(now/400+i*1.7)>-.2)prect(c,x,y,1,1,i%7?"#C9D6F2":"#FFFFFF")}
  for(let dy=-10;dy<=10;dy++){const w2=Math.round(Math.sqrt(100-dy*dy));prect(c,136-w2,24+dy,w2*2,1,dy<-5?"#FFFBE6":"#F3E9C2")}prect(c,131,20,3,3,"#E0D3A6");prect(c,139,27,4,3,"#E0D3A6");prect(c,134,30,2,2,"#E0D3A6");
  ridge(c,W,86,26,"nmt",["#2A2F5E","#232853","#1D2148"],false);for(let x=-2;x<W+4;x+=5)pine(c,x,90,7+((x*7)%5),["#0B1426","#101C33","#16263F","#1E3350"]);
  for(let y=90;y<H;y++)prect(c,0,y,W,1,y<92?"#3B4C8A":y%6===0?"#16264A":"#121F3E");
  for(let k=0;k<14;k++){const y=94+k*4,w2=6+((k*5)%9)+Math.round(Math.sin(now/300+k)*2);prect(c,136-w2/2,y,w2,1,"#E9DDAF")}
  for(let k=0;k<10;k++){const x=(k*41+Math.sin(now/900+k)*14)%W,y=60+((k*23)%30)+Math.sin(now/500+k)*4;if(Math.sin(now/200+k*3)>0){c.fillStyle="rgba(255,240,140,.35)";c.fillRect(Math.round(x)-1,Math.round(y)-1,3,3);prect(c,x,y,1,1,"#FFF6A8")}}}
function sketchy(x,y,k,off,flash){c.save();c.translate(x,y);c.scale(k,k);spr(c,"bass",0,0,false,flash?{"1":"#FFFFFF","2":"#FFFFFF","3":"#FFFFFF","4":"#FFFFFF","z":"#FFFFFF","Z":"#FFFFFF"}:null);
  if(off<20){const gy=Math.round(3-off*.5),my=Math.round(8+off*.7);prect(c,1,gy,7,1,"#241527");prect(c,1,gy,1,4,"#241527");prect(c,5,gy,1,4,"#241527");prect(c,1,gy+3,5,1,"#241527");prect(c,2,gy+1,3,2,"rgba(160,230,255,.6)");prect(c,8,gy+1,3,1,"#241527");prect(c,2,my,6,1,"#3B1E18");prect(c,1,my+1,2,1,"#3B1E18");prect(c,7,my+1,2,1,"#3B1E18")}
  c.restore()}
function kraken(x,y,k,now){c.save();c.translate(x,y);c.scale(k,k);for(let tn=0;tn<6;tn++){let tx=5+tn*3,ty=9;for(let sg=0;sg<9;sg++){tx+=Math.round(Math.sin(now/220+tn+sg*.7));ty+=1;prect(c,tx,ty,2,1,sg%3===2?"#B27BEF":sg%3===1?"#8551C8":"#5C3494")}}spr(c,"kraken",0,0,false);c.restore()}
function confetti(t,t0,n){if(t<t0)return;const cols=["#FFD23F","#FF6B6B","#5FCB6A","#7FE3FF","#FFFFFF","#B27BEF"];for(let i=0;i<n;i++){const r=Math.abs(Math.sin(i*91.7)*43758.5453%1),r2=Math.abs(Math.sin(i*12.9)*12345.678%1),x=(r*W+Math.sin((t-t0)*3+i)*6)|0,y=((t-t0)*(40+r2*40)-r2*90)|0;if(y>0&&y<H)prect(c,x,y,2,2,cols[i%6])}}
function wipe(t,t0){const k=seg(t,t0,t0+.6);if(k<=0||k>=1)return;const a=k<.5?k*2:2-k*2;for(let y=0;y<H;y+=10)prect(c,0,y,Math.round(W*a*(1+((y/10)%2)*.2)),10,"#241527");if(Math.floor(t*30)%2&&k<.4){c.fillStyle="rgba(255,255,255,.6)";c.fillRect(0,0,W,H)}}
function frame(t){const now=t*1000;c.setTransform(1,0,0,1,0,0);c.clearRect(0,0,W,H);
 // 0-2.8 night intro
 if(t<2.8){night(now);c.save();c.translate(30,14);const bob=boatRobin(c,0,90-14,now);c.restore();
   c.save();c.globalCompositeOperation="multiply";c.fillStyle="#AEB6EA";c.fillRect(0,0,W,H);c.restore();lantern(c,30,76-23+0,now);
   const s="NIGHT FISHING...",n=Math.floor(seg(t,.3,1.4)*s.length);txt(s.slice(0,n),W/2,8,1,"#FFF6DC","#241527","c");
   const bx=120;pline(c,92,48,bx,90,"#C9D6F2");spr(c,"bobber",bx-1,87+(t>1.8?Math.round(Math.sin(now/40)*2):0));
   if(t>1.9){txt("!",bx+2,68,2,"#FFD23F","#241527","c")}
   wipe(t,2.3);return}
 // 2.8-10.6 battle 1
 if(t<10.6){const u=t-2.8;arena(now,0);
   const ein=E.back(seg(u,0,.5)),pin=E.back(seg(u,0,.5));pad(Math.round(W+40-ein*(W+40-128)),62,24);pad(Math.round(-40+pin*(40+46)),112,26);
   const exposed=u>5.0,sink=seg(u,6.4,7.4),flash=u>4.4&&u<5.0&&Math.floor(u*16)%2;const off=u>4.6?(u-4.6)*24:0;
   if(sink<1)sketchy(Math.round(W+40-ein*(W+40-106)),Math.round(36+sink*30),2,off,flash);
   c.save();c.translate(Math.round(-40+pin*(40+14)),68);c.scale(2,2);spr(c,"robinUp",0,0,false);c.restore();
   if(u>.5){hpBox(6,6,exposed?"CLONE PEPE":"PEPE?","LV1","TRUST",1-seg(u,5.2,6.2));hpBox(78,96,"ROBIN","LV7","FOCUS",1)}
   if(u>3.4&&u<4.6){const k=seg(u,3.6,4.4);for(let i=0;i<12;i++){const tt=(k*1.2+i/12)%1,x=60+tt*(118-60),y=96-tt*(52)+Math.sin(tt*12)*3;prect(c,x,y,2,2,i%2?"#7FE3FF":"#FFFFFF")}if(k>0){c.fillStyle="rgba(127,227,255,.25)";c.fillRect(100,30,60,40)}}
   if(u<1.0);else if(u<2.3)dialog("A SKETCHY PEPE SWIMS UP!",t,3.9);
   else if(u<3.4)menu(t,0,u<2.8?0:1,["CHECK","LARP","SHARK","RUN"]);
   else if(u<4.8)dialog("ROBIN USED LARP SCAN!",t,6.2);
   else if(u<6.4)dialog("IT'S A CLONE! SAME TICKER, DIFFERENT FISH.",t,7.6,34);
   else dialog("CLONE PEPE WAS EXPOSED! +50 EXP",t,9.2);
   wipe(t,10.1);return}
 // 10.6-19.0 boss
 if(t<19){const u=t-10.6,drain=u>1.4&&u<5.4?seg(u,1.4,3.4):u>=5.4?1-seg(u,5.4,6.6):0;arena(now,drain*.7);const sh=u<1.0?Math.round(Math.sin(now/25)*3*(1-u)):0;c.save();c.translate(sh,0);
   pad(128,62,26);pad(46,112,26);
   const kin=E.bounce(seg(u,0,.8)),ret=seg(u,5.6,6.8);kraken(Math.round(104),Math.round(-50+kin*(14+50)+ret*60),2,now);
   c.save();c.translate(14,68);c.scale(2,2);spr(c,"robinUp",0,0,false);c.restore();
   if(u>3.6&&u<5.6){const r=Math.floor(now/60)%2;prect(c,40+r,40,9,7,"#FFD23F");prect(c,42+r,47,5,1,"#E0A800");prect(c,44,37,1,3,"#5C3A1A");for(let i=0;i<3;i++){const rr=((now/8+i*20)%40);c.strokeStyle="rgba(255,210,63,"+(1-rr/40).toFixed(2)+")";c.lineWidth=1;c.beginPath();c.arc(44.5,44,rr,0,7);c.stroke()}}
   c.restore();
   if(u>.6){hpBox(6,6,"KRAKEN RUG","LV99","POOL",1-drain,drain>0?"#E8443F":null);hpBox(78,96,"ROBIN","LV7","FOCUS",u<5.4?1-drain*.4:1)}
   if(u<.8){c.fillStyle=`rgba(215,38,61,${(.35*(1-u/.8)).toFixed(2)})`;c.fillRect(0,0,W,H);txt("BOSS!",W/2,78,3,"#FFFFFF","#9E1B2E","c")}
   else if(u<2.4)dialog("THE KRAKEN IS DRAINING THE POOL!",t,11.5);
   else if(u<3.6)menu(t,0,u<3.0?1:2,["CHECK","LARP","SHARK","RUN"]);
   else if(u<5.4)dialog("ROBIN RANG THE SHARK WATCH BELL!",t,14.3);
   else if(u<6.9)dialog("HOLDERS GOT OUT IN TIME!",t,16.1);
   else{dialog("YOU WIN! LOOT: 1X PEACE OF MIND",t,17.6);confetti(t,17.5,60);txt("VICTORY!",W/2,46,3,"#FFD23F","#241527","c")}
   wipe(t,18.5);return}
 // 19-22.5 end card
 {const u=t-19;night(now);c.fillStyle="rgba(11,16,48,.55)";c.fillRect(0,0,W,H);const k=E.back(seg(u,0,.6));drawLogoAt(W/2,Math.round(-60+k*(22+60)),2);
   if(u>.5){const s="IS THIS TOKEN FISHY?",w=tw(s,1)+14;prect(c,W/2-w/2-2,82,w+4,15,"#BDF4FF");prect(c,W/2-w/2,84,w,11,"#14286E");txt(s,W/2,86,1,"#FFF6DC",null,"c")}
   if(COIN&&u>.8){const a=(u-.8)*4,sx=Math.abs(Math.cos(a)),cw=Math.max(2,Math.round(40*sx));c.drawImage(COIN,0,0,64,64,Math.round(W/2-cw/2),104,cw,40)}
   if(u>1.2)txt("BUILT ON ROBINHOOD CHAIN",W/2,152,1,"#FFF6DC","#241527","c");if(u>1.5&&Math.floor(u*2.5)%2===0)txt("PRESS START TO DYOR",W/2,165,1,"#FFD23F","#241527","c")}
}
return{cv,frame,setCoin(u){return new Promise(r=>{const im=new Image();im.onload=()=>{COIN=im;r()};im.src=u})}};
})();
