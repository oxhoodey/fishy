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
function heart(x,y,col){prect(c,x,y,2,2,col);prect(c,x+3,y,2,2,col);prect(c,x,y+1,5,2,col);prect(c,x+1,y+3,3,1,col);prect(c,x+2,y+4,1,1,col)}
function clock(x,y,r,ang){c.fillStyle="#241527";c.beginPath();c.arc(x,y,r+2,0,7);c.fill();c.fillStyle="#FFF6DC";c.beginPath();c.arc(x,y,r,0,7);c.fill();
  for(let i=0;i<12;i++){const a=i/12*Math.PI*2;prect(c,Math.round(x+Math.cos(a)*(r-2)),Math.round(y+Math.sin(a)*(r-2)),1,1,"#241527")}
  c.strokeStyle="#241527";c.lineWidth=1.5;c.beginPath();c.moveTo(x,y);c.lineTo(x+Math.cos(ang)*(r-3),y+Math.sin(ang)*(r-3));c.stroke();c.strokeStyle="#D7263D";c.beginPath();c.moveTo(x,y);c.lineTo(x+Math.cos(ang/12-1)*(r-6),y+Math.sin(ang/12-1)*(r-6));c.stroke();prect(c,x-1,y-1,2,2,"#241527")}
function night(a){if(a<=0)return;c.fillStyle=`rgba(12,10,48,${a.toFixed(3)})`;c.fillRect(0,0,W,H);for(let i=0;i<30;i++){const x=(i*53)%W,y=(i*29)%70;prect(c,x,y,1,1,`rgba(255,255,220,${(a*1.6*(0.5+0.5*Math.sin(i+performance.now()*0))).toFixed(2)})`)}}
function glow(x,y,r,a){for(let q=r;q>2;q-=2){c.fillStyle=`rgba(255,200,80,${(a*.06).toFixed(3)})`;c.beginPath();c.arc(x,y,q,0,7);c.fill()}}
const CHECK=[["WEB BETA","LIVE"],["DEV BAG","READY TO BURN"],["CA","ONLY ON @FISHY_RH"],["PONS PAGE","READY"],["TEA","STILL HOT"]];
const CROWD=[["bass",18.0,H0+10],["koi",18.4,H0+24],["trout",18.8,H0+16],["salmon",19.2,H0+32],["bass",19.6,H0+38],["koi",20.0,H0+6]];
function frame(t){const now=t*1000;c.setTransform(1,0,0,1,0,0);c.clearRect(0,0,W,H);
 const bg=()=>seaBase(c,W,H,now,H0,FL,{dock:true,rich:false});
 if(t<2.6){bg();night(.5);c.fillStyle="rgba(10,22,64,.45)";c.fillRect(0,0,W,H);const k=E.back(seg(t,.1,.6));drawLogoAt(W/2,Math.round(-40+k*(14+40)),2);
   if(t>.5)txt("EPISODE 11",W/2,70,1,"#FFD23F","#241527","c");
   if(t>.8){const s=E.back(seg(t,.8,1.2));txt("HOURS",W/2,Math.round(84+(1-s)*16),2,"#FFF6DC","#241527","c");txt("AWAY",W/2,Math.round(102+(1-s)*16),3,"#FFD23F","#9E1B2E","c")}
   if(t>1.3)clock(W/2,145,12,t*6);
   if(t>2.35){c.fillStyle="rgba(255,255,255,.7)";c.fillRect(0,0,W,H)}return}
 if(t>=25){const u=t-25;bg();night(.6);c.fillStyle="rgba(10,22,64,.35)";c.fillRect(0,0,W,H);const k=E.back(seg(u,0,.5));drawLogoAt(W/2,Math.round(-50+k*(14+50)),2);
   if(u>.4){const s="LAUNCHING ON PONS",w=tw(s,1)+14;prect(c,W/2-w/2-2,72,w+4,15,"#FFD23F");prect(c,W/2-w/2,74,w,11,"#3E8E5E");txt(s,W/2,76,1,"#FFF6DC",null,"c");txt("IN A FEW HOURS",W/2,92,1,"#FFD23F","#241527","c")}
   if(u>.6)clock(W/2,120,13,u*3);
   if(u>1.0)txt("REAL CA ONLY ON @FISHY_RH",W/2,144,1,"#FFD23F","#241527","c");if(u>1.3)txt("TURN ON NOTIFICATIONS",W/2,158,1,"#FFF6DC","#241527","c");return}
 bg();
 // the evening comes in as the hours tick by
 const dark=seg(t,4,20)*.68;night(dark);
 // clock post on the dock
 prect(c,152,H0-26,2,26,"#5C3A1A");clock(153,H0-34,9,t*2.2);
 // lanterns light up as it gets dark
 if(t>9){const a=seg(t,9,12);glow(10,H0-22,14,a);glow(153,H0-34,12,a*.6)}
 // crowd of holders gathering in front of the boat
 CROWD.forEach(([k2,d,y],i)=>{if(t<d)return;const x=Math.round(Math.max(70+i*14,W+10-(t-d)*50)),yy=y+Math.round(Math.sin(now/400+i)*1);spr(c,k2,x,yy,false);if(t>19&&x<W-10&&Math.sin(now/300+i*1.7)>.6)heart(x+6,yy-7,"#FF6B6B")});
 // chef cat's last try 14-17.6
 if(t>14&&t<17.8){const inn=E.out(seg(t,14,14.5)),out=seg(t,16.9,17.7),cx=Math.round(W+4-inn*(W+4-128)+out*out*80);spr(c,"chefcat",cx,H0-28,false);
   if(out<.2){const sx=cx-14,sy=H0-62;prect(c,sx+18,sy+18,2,16,"#5C3A1A");prect(c,sx-1,sy-1,40,20,"#241527");prect(c,sx,sy,38,18,"#FFF6DC");txt("EARLY",sx+19,sy+2,1,"#D7263D",null,"c");txt("CA!",sx+19,sy+10,1,"#241527",null,"c");stamp(t,16.2,"FAKE","#D7263D",sx+19,sy+9,1)}}
 // Robin
 const face=t>14.5&&t<16.2?"strain":t>16.2?"grin":"";const P0={ang:45,bend:0,dx:0,face,spin:false,shake:0};
 const bob=boatRobin(c,4,H0,now,P0),rx=14,ry=H0-31+bob,hdx=rx+28,hdy=ry+23;robinArm(c,rx+25,ry+21,hdx,hdy);if(face)robinFace(c,rx,ry,face,now);rodBent(c,hdx+2,hdy+1,45,36,2,false,now);
 // story
 if(t<5.0)bubble("A FEW HOURS LEFT. FINAL CHECKS!",t,2.8,58,40,30);
 else if(t<14.0){const k=slideK(t,5.0,13.6),x=8,y=Math.round(8+(1-k)*-110),w=164,h=84;if(k>0){prect(c,x-2,y-2,w+4,h+4,"#241527");prect(c,x,y,w,h,"#FFF6DC");prect(c,x,y,w,12,"#14286E");txt("PRE-LAUNCH CHECKLIST",x+5,y+3,1,"#FFD23F");
   CHECK.forEach(([a,b2],i)=>{const tt=5.6+i*1.5,yy=y+17+i*13;txt(a,x+16,yy,1,"#8B5A2B");txt(b2,x+w-5,yy,1,"#241527",null,"r");prect(c,x+5,yy-1,8,8,"#241527");prect(c,x+6,yy,6,6,"#FFFFFF");
     if(t>tt){const p=E.back(seg(t,tt,tt+.2));if(p>.3){prect(c,x+6,yy+3,2,2,"#2E7D46");prect(c,x+8,yy+4,2,2,"#2E7D46");prect(c,x+10,yy,2,4,"#2E7D46");prect(c,x+11,yy-1,2,2,"#2E7D46")}}})}}
 else if(t<16.2)bubble("PSST. EARLY CA? JUST FOR YOU.",t,14.6,140,150,30,"#FFE1DA");
 else if(t<17.8)bubble("THERE IS NO EARLY CA.",t,16.2,58,40,30);
 else if(t<21.0)bubble("SAME CA. SAME TIME. FOR EVERYONE.",t,18.0,58,40,30);
 else{const k=slideK(t,21.0,99),y=Math.round(10+(1-k)*-90),x=8,w=164,h=58;if(k>0){prect(c,x-2,y-2,w+4,h+4,"#241527");prect(c,x,y,w,h,"#FFD23F");
   txt("LAUNCHING ON PONS",W/2,y+5,1,"#9E1B2E",null,"c");txt("IN A FEW HOURS",W/2,y+17,1,"#FFFFFF","#241527","c");txt("FOLLOW @FISHY_RH",W/2,y+33,1,"#241527",null,"c");txt("ANY CA BEFORE THAT IS FAKE",W/2,y+45,1,"#9E1B2E",null,"c")}}
 if(t>24.7){c.fillStyle=`rgba(255,255,255,${(seg(t,24.7,25)*.8).toFixed(2)})`;c.fillRect(0,0,W,H)}
}
return{cv,frame,setCoin(u){return new Promise(r=>{const im=new Image();im.onload=()=>{COIN=im;r()};im.src=u})}};
})();
