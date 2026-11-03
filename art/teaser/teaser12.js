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




SPR.botfish=["....R.......","....o.......","..ooooooo.oo",".oRWWWWWWowo","oWWwWWwWWwwo",".oWWWWWWWowo","..ooooooo.oo"];PALS.botfish={o:"#241527",R:"#FF3B3B",W:"#C9CED9",w:"#8A93A6"};
const H0=118,FL=172;
function slideK(t,t0,t1){return E.back(seg(t,t0,t0+.35))-(t>t1?E.out(seg(t,t1,t1+.3)):0)}
function stamp(t,t0,label,col,x,y,k){k=k||2;if(t<t0)return;const q=seg(t,t0,t0+.18),sc=q<1?3-2*E.out(q):1,w=tw(label,k)+12,h=7*k+10;c.save();c.translate(x,y);c.rotate(-.18);c.scale(sc,sc);
  prect(c,-w/2-2,-h/2-2,w+4,h+4,col);prect(c,-w/2,-h/2,w,h,"rgba(255,246,220,.92)");prect(c,-w/2+2,-h/2+2,w-4,h-4,col);prect(c,-w/2+3,-h/2+3,w-6,h-6,"rgba(255,246,220,.95)");txt(label,0,-Math.round(7*k/2),k,col,null,"c");c.restore()}
function heart(x,y,col){prect(c,x,y,2,2,col);prect(c,x+3,y,2,2,col);prect(c,x,y+1,5,2,col);prect(c,x+1,y+3,3,1,col);prect(c,x+2,y+4,1,1,col)}
function scope(x,y){c.strokeStyle="#FF3B3B";c.lineWidth=1;c.beginPath();c.arc(x+2.5,y+3.5,3,0,7);c.stroke();prect(c,x+2,y,1,7,"rgba(255,59,59,.8)");prect(c,x-1,y+3,7,1,"rgba(255,59,59,.8)")}
function crosshair(x,y,r,col){c.strokeStyle=col;c.lineWidth=2;c.beginPath();c.arc(x,y,r,0,7);c.stroke();prect(c,x-1,y-r-4,2,8,col);prect(c,x-1,y+r-4,2,8,col);prect(c,x-r-4,y-1,8,2,col);prect(c,x+r-4,y-1,8,2,col)}
function mug(x,y){prect(c,x,y,5,5,"#241527");prect(c,x+1,y+1,3,3,"#FFF6DC");prect(c,x+5,y+1,2,3,"#241527");for(let i=0;i<2;i++)prect(c,x+1+i*2,y-3-((i)%2),1,2,"rgba(255,255,255,.7)")}
const BOTS=Array.from({length:10},(_,i)=>({y:H0+4+((i*13)%42),d:6.0+i*.07,tx:80+(i%4)*20,ty:0,tag:["0.001S","0.002S","BUY!","0.001S","BUY BUY"][i%5]}));
const HOLD=[["bass",17.0,H0+10],["koi",17.8,H0+22],["trout",18.6,H0+16],["salmon",19.4,H0+30],["bass",20.2,H0+36]];
function frame(t){const now=t*1000;c.setTransform(1,0,0,1,0,0);c.clearRect(0,0,W,H);
 const bg=()=>seaBase(c,W,H,now,H0,FL,{dock:true,rich:false});
 if(t<2.6){bg();c.fillStyle="rgba(10,22,64,.66)";c.fillRect(0,0,W,H);const k=E.back(seg(t,.1,.6));drawLogoAt(W/2,Math.round(-40+k*(14+40)),2);
   if(t>.5)txt("EPISODE 10",W/2,70,1,"#FFD23F","#241527","c");
   if(t>.8){const s=E.back(seg(t,.8,1.2));txt("SNIPER",W/2,Math.round(84+(1-s)*16),2,"#FFF6DC","#241527","c");txt("BOTS",W/2,Math.round(102+(1-s)*16),3,"#FF3B3B","#7A1020","c")}
   if(t>1.3){const cx=W/2+Math.round(Math.sin(t*5)*30),cy=145;crosshair(cx,cy,10,"#FF3B3B");spr(c,"botfish",W/2-6,142)}
   if(t>2.35){c.fillStyle="rgba(255,255,255,.7)";c.fillRect(0,0,W,H)}return}
 if(t>=25){const u=t-25;bg();c.fillStyle="rgba(10,22,64,.66)";c.fillRect(0,0,W,H);const k=E.back(seg(u,0,.5));drawLogoAt(W/2,Math.round(-50+k*(14+50)),2);
   if(u>.4){const s="LAUNCHING ON PONS · SOON",w=tw(s,1)+14;prect(c,W/2-w/2-2,74,w+4,15,"#FFD23F");prect(c,W/2-w/2,76,w,11,"#3E8E5E");txt(s,W/2,78,1,"#FFF6DC",null,"c")}
   if(COIN&&u>.7){const a=(u-.7)*4,sx=Math.abs(Math.cos(a)),cw=Math.max(2,Math.round(38*sx));c.drawImage(COIN,0,0,64,64,Math.round(W/2-cw/2),96,cw,38)}
   if(u>1.0)txt("REAL CA ONLY ON @FISHY_RH",W/2,144,1,"#FFD23F","#241527","c");if(u>1.3)txt("BOTS SNIPE. HOLDERS STAY.",W/2,158,1,"#FFF6DC","#241527","c");return}
 bg();
 // countdown sign on the dock
 if(t<6.0){const sx=124,sy=H0-40;prect(c,sx+18,sy+20,2,22,"#5C3A1A");prect(c,sx-1,sy-1,46,22,"#241527");prect(c,sx,sy,44,20,"#8B5A2B");prect(c,sx+2,sy+2,40,16,"#C9894E");
   const n=t<4.4?"SOON":t<4.8?"3":t<5.1?"2":t<5.4?"1":"GO!";txt(n,sx+22,sy+(n.length>1?7:4),n.length>2?1:2,n==="GO!"?"#9E1B2E":"#FFF6DC","#241527","c")}
 // CA drop flash
 if(t>5.4&&t<6.0){c.fillStyle=`rgba(255,255,255,${(.6*(1-seg(t,5.4,6.0))).toFixed(2)})`;c.fillRect(0,0,W,H);txt("CA DROPPED!",W/2,30,2,"#FFD23F","#241527","c")}
 // the swarm: 6.0 arrive at once, 9.5 snipe tax, 12.5 dump and leave
 const leave=seg(t,12.5,13.6);
 if(t>6.0&&t<14){BOTS.forEach((b,i)=>{if(t<b.d)return;const k=E.out(seg(t,b.d,b.d+.25)),x=Math.round(W+10-k*(W+10-b.tx)+leave*leave*(240+i*8)),y=b.y+Math.round(Math.sin(now/120+i)*1);
   if(k<1)for(let j=1;j<4;j++)prect(c,x+12+j*6,y+3,4,1,"rgba(255,255,255,.7)");c.save();c.translate(x,y);c.scale(1.5,1.5);spr(c,"botfish",0,0,false);if(t>9.9&&t<12.5){prect(c,2,3,1,1,"#FFF6DC");prect(c,1,2,1,1,"#241527");prect(c,3,4,1,1,"#241527")}else scope(0,1);c.restore();
   if(t>6.5&&t<9.5&&(i===0||i===6))txt(b.tag,x+9,y-8,1,"#FFFFFF","#241527","c");if(leave>0&&(i===1||i===6))txt("SOLD!",x+9,y-8,1,"#FFD23F","#241527","c")})}
 // snipe tax: coins fly from the swarm into a jar on the dock
 if(t>9.6&&t<13){const jx=150,jy=H0-22;prect(c,jx-1,jy-1,18,18,"#241527");prect(c,jx,jy,16,16,"rgba(191,239,255,.85)");const fill=Math.round(seg(t,9.8,12)*12);prect(c,jx+1,jy+15-fill,14,fill,"#FFD23F");txt("TAX",jx+8,jy-9,1,"#FFF6DC","#241527","c");
   for(let i=0;i<4;i++){const k=((t*1.6+i/4)%1),sx=110,sy=H0+20,X=sx+(jx+6-sx)*k,Y=sy+(jy-sy)*k-Math.sin(k*Math.PI)*18;if(t<12)spr(c,"coin",X,Y)}}
 // holders swim in calmly
 if(t>16.8){HOLD.forEach(([k2,d,y],i)=>{if(t<d)return;const x=Math.round(Math.max(76+i*16,W+10-(t-d)*40)),yy=y+Math.round(Math.sin(now/400+i)*1);spr(c,k2,x,yy,false);if(x<W-10&&Math.sin(now/300+i*1.7)>.6)heart(x+6,yy-7,"#FF6B6B")})}
 // Robin with his tea, calm the whole time
 const face=t>6&&t<9.5?"wow":t>12.6?"grin":"";const P0={ang:45,bend:0,dx:0,face,spin:false,shake:0};
 const bob=boatRobin(c,4,H0,now,P0),rx=14,ry=H0-31+bob,hdx=rx+28,hdy=ry+23;robinArm(c,rx+25,ry+21,hdx,hdy);if(face)robinFace(c,rx,ry,face,now);mug(hdx,hdy-6);
 // story
 if(t<4.4)bubble("LAUNCH DAY PLAN: SIT BACK. DRINK TEA.",t,2.8,58,40,30);
 else if(t<6.0){}
 else if(t<9.6){const n=Math.min(47,Math.round(seg(t,6.0,7.2)*47));const x=8,y=8,w=92,h=22;prect(c,x-1,y-1,w+2,h+2,"#241527");prect(c,x,y,w,h,"#D7263D");txt("SNIPERS",x+5,y+4,1,"#FFF6DC");txt(String(n),x+w-5,y+4,2,"#FFFFFF",null,"r");txt("IN 0.4S",x+5,y+13,1,"#FFD23F")}
 else if(t<12.4){stamp(t,9.6,"SNIPE TAX","#D7263D",W/2,30,2);if(t>10.4)txt("FIRST SECONDS COST THE MOST",W/2,52,1,"#FFFFFF","#241527","c")}
 else if(t<15.6)bubble("...AND THEY'RE GONE. THAT WAS QUICK.",t,13.0,58,40,30);
 else if(t<20.6)bubble("BOTS SNIPE IN SECONDS. HOLDERS STAY.",t,16.2,58,40,30);
 else{const k=slideK(t,20.6,99),y=Math.round(10+(1-k)*-90),x=8,w=164,h=58;if(k>0){prect(c,x-2,y-2,w+4,h+4,"#241527");prect(c,x,y,w,h,"#FFD23F");
   txt("LAUNCH DAY, ROBIN STYLE",W/2,y+5,1,"#9E1B2E",null,"c");txt("1. DON'T RACE THE BOTS",x+8,y+19,1,"#241527");txt("2. CHECK THE CA ON FISHY",x+8,y+30,1,"#241527");txt("3. CA ONLY FROM @FISHY_RH",x+8,y+41,1,"#241527")}}
 if(t>24.7){c.fillStyle=`rgba(255,255,255,${(seg(t,24.7,25)*.8).toFixed(2)})`;c.fillRect(0,0,W,H)}
}
return{cv,frame,setCoin(u){return new Promise(r=>{const im=new Image();im.onload=()=>{COIN=im;r()};im.src=u})}};
})();
