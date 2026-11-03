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






const H0=118,FL=172,DUR=15;
function box(x,y,w,h,fill){prect(c,x-1,y-1,w+2,h+2,"#241527");prect(c,x,y,w,h,fill)}
const NUMS=[["5","CA ONLY FROM @FISHY_RH"],["4","SAME TIME FOR EVERYONE"],["3","DEV BAG: READY TO BURN"],["2","CHECK IT ON FISHY"],["1","NO DMS. NO FOMO."]];
function bell(x,y,now){const sw=Math.round(Math.sin(now/80)*2);prect(c,x+sw+3,y,4,2,"#241527");prect(c,x+sw+1,y+2,8,7,"#FFD23F");prect(c,x+sw,y+9,10,2,"#FFD23F");prect(c,x+sw+4,y+11,2,2,"#241527");prect(c,x+sw+1,y+2,1,7,"#241527");prect(c,x+sw+8,y+2,1,7,"#241527")}
function frame(t){const now=t*1000;c.setTransform(1,0,0,1,0,0);c.clearRect(0,0,W,H);
 seaBase(c,W,H,now,H0,FL,{dock:true,rich:false});
 // pulsing evening light
 const pulse=.5+.5*Math.sin(t*Math.PI*1.43);c.fillStyle=`rgba(14,10,52,${(0.45+0.08*pulse).toFixed(3)})`;c.fillRect(0,0,W,H);
 // holders lining up, Robin ready with the rod
 [["bass",96,H0+10],["koi",112,H0+22],["trout",128,H0+14],["salmon",144,H0+30],["bass",104,H0+36]].forEach(([k2,x,y],i)=>spr(c,k2,x+Math.round(Math.sin(now/300+i)*2),y,false));
 const P0={ang:45,bend:0,dx:0,face:t>9?"grin":"",spin:false,shake:0};const bob=boatRobin(c,4,H0,now,P0),rx=14,ry=H0-31+bob,hdx=rx+28,hdy=ry+23;robinArm(c,rx+25,ry+21,hdx,hdy);if(P0.face)robinFace(c,rx,ry,P0.face,now);rodBent(c,hdx+2,hdy+1,45,36,2,false,now);
 if(t<1.8){c.fillStyle="rgba(10,22,64,.72)";c.fillRect(0,0,W,H);const k=E.back(seg(t,.05,.45));drawLogoAt(W/2,Math.round(-40+k*(12+40)),2);
   const s=E.back(seg(t,.4,.8));txt("MINUTES",W/2,Math.round(70+(1-s)*20),3,"#FFF6DC","#241527","c");txt("AWAY",W/2,Math.round(96+(1-s)*20),3,"#FFD23F","#9E1B2E","c");if(t>.9)txt("FISHY ON PONS",W/2,130,1,"#BDF4FF","#241527","c");
   if(t>1.6){c.fillStyle=`rgba(255,255,255,${(seg(t,1.6,1.8)*.8).toFixed(2)})`;c.fillRect(0,0,W,H)}return}
 if(t<9.0){const i=Math.min(4,Math.floor((t-1.8)/1.44)),f=(t-1.8-i*1.44)/1.44,[n,cap]=NUMS[i];
   const sc=f<.15?1+(1-E.out(seg(f,0,.15)))*1.2:1,k=6;c.save();c.translate(W/2,48);c.scale(sc,sc);const w=tw(n,k);
   prect(c,-w/2-10,-36,w+20,72,"#241527");prect(c,-w/2-8,-34,w+16,68,i>=3?"#D7263D":"#14286E");txt(n,0,-28,k,"#FFD23F","#241527","c");c.restore();
   if(f>.1){const w2=tw(cap,1)+10;box(W/2-w2/2,158,w2,13,"#FFF6DC");txt(cap,W/2,161,1,"#241527",null,"c")}
   if(f>.85){c.fillStyle=`rgba(255,255,255,${(seg(f,.85,1)*.35).toFixed(2)})`;c.fillRect(0,0,W,H)}return}
 if(t<12.2){const k=E.back(seg(t,9.0,9.4));const y=Math.round(14+(1-k)*-60);box(10,y,160,62,"#FFD23F");txt("SEE YOU",W/2,y+6,2,"#241527",null,"c");txt("ON PONS",W/2,y+24,2,"#9E1B2E",null,"c");txt("CA DROPS ON @FISHY_RH",W/2,y+46,1,"#241527",null,"c");
   if(t>10)bell(W/2-5,y+70,now);if(t>10)txt("TURN ON NOTIFICATIONS",W/2,y+88,1,"#FFFFFF","#241527","c");return}
 c.fillStyle="rgba(10,22,64,.72)";c.fillRect(0,0,W,H);const u=t-12.2,k=E.back(seg(u,0,.4));drawLogoAt(W/2,Math.round(-50+k*(22+50)),2);
 if(u>.3){const s="LAUNCHING ON PONS",w=tw(s,1)+14;prect(c,W/2-w/2-2,82,w+4,15,"#FFD23F");prect(c,W/2-w/2,84,w,11,"#3E8E5E");txt(s,W/2,86,1,"#FFF6DC",null,"c")}
 if(u>.6)txt("IN MINUTES",W/2,104,2,"#FFD23F","#9E1B2E","c");if(u>.9)txt("@FISHY_RH",W/2,138,1,"#FFF6DC","#241527","c");if(u>1.1)txt("ANY OTHER CA IS FAKE",W/2,152,1,"#FF8F7A","#241527","c");
 if(t>DUR-.4){c.fillStyle=`rgba(0,0,0,${seg(t,DUR-.4,DUR).toFixed(2)})`;c.fillRect(0,0,W,H)}
}
return{cv,frame,setCoin(u){return new Promise(r=>{const im=new Image();im.onload=()=>{COIN=im;r()};im.src=u})}};
})();
