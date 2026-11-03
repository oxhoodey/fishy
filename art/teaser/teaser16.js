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







const H0=118,FL=172,DUR=15;let CA=(window.LIVE_CA||"").trim();
const shortCA=CA?CA.slice(0,6)+"..."+CA.slice(-4):"";
function box(x,y,w,h,fill){prect(c,x-1,y-1,w+2,h+2,"#241527");prect(c,x,y,w,h,fill)}
function egg(x,y,now,crack,shake){const S2=["...XXXX...","..XWWWWX..",".XWWWWWWX.",".XWWYWWWX.","XWWWWWWWWX","XWWWWWYWWX","XWYWWWWWWX",".XWWWWWWX.","..XXXXXX.."];
  const wob=Math.round(Math.sin(now/40)*shake);S2.forEach((r,j)=>{for(let i=0;i<r.length;i++){const ch=r[i];if(ch===".")continue;prect(c,x+i*3+wob,y+j*3,3,3,ch==="X"?"#241527":ch==="Y"?"#FFD23F":"#FFF6DC")}});
  if(crack>.2){prect(c,x+12+wob,y+6,3,3,"#241527");prect(c,x+15+wob,y+9,3,3,"#241527")}if(crack>.5){prect(c,x+12+wob,y+12,3,3,"#241527");prect(c,x+9+wob,y+15,3,3,"#241527")}if(crack>.8){prect(c,x+18+wob,y+12,3,3,"#241527");prect(c,x+6+wob,y+9,3,3,"#241527")}}
function nest(x,y){for(let i=0;i<18;i++)prect(c,x-6+i*2,y+(i%2),3,3,i%2?"#8B5A2B":"#5C3A1A");prect(c,x-8,y+3,40,3,"#5C3A1A")}
function confetti(t0,t,n){const u=t-t0;if(u<0||u>4)return;for(let i=0;i<n;i++){const a=i*2.39,v=40+(i%7)*9,x=W/2+Math.cos(a)*v*u,y=60+Math.sin(a)*v*u*.7+u*u*28;prect(c,Math.round(x),Math.round(y),2,2,["#FFD23F","#5FCB6A","#E8443F","#3FA9F5","#FFFFFF"][i%5])}}
function coin(x,y,sz,t){if(!COIN)return;const sx=Math.abs(Math.cos(t*4)),cw=Math.max(2,Math.round(sz*sx));c.drawImage(COIN,0,0,64,64,Math.round(x-cw/2),Math.round(y-sz/2),cw,sz)}
function frame(t){const now=t*1000;c.setTransform(1,0,0,1,0,0);c.clearRect(0,0,W,H);
 seaBase(c,W,H,now,H0,FL,{dock:true,rich:false});const lit=t>3.2;c.fillStyle=lit?"rgba(10,22,64,.18)":"rgba(14,10,52,.55)";c.fillRect(0,0,W,H);
 // fish jump for joy after the hatch
 [["bass",96,H0+12],["koi",114,H0+24],["trout",132,H0+16],["salmon",150,H0+30],["bass",106,H0+38]].forEach(([k2,x,y],i)=>{const j=t>3.4&&t<8?Math.round(-Math.abs(Math.sin(now/220+i*1.3))*10):0;spr(c,k2,x+Math.round(Math.sin(now/300+i)*2),y+j,false)});
 const face=t<3.2?"wow":"grin";const P0={ang:45,bend:0,dx:0,face,spin:false,shake:0};const bob=boatRobin(c,4,H0,now,P0),rx=14,ry=H0-31+bob,hdx=rx+28,hdy=ry+23;robinArm(c,rx+25,ry+21,hdx,hdy);robinFace(c,rx,ry,face,now);rodBent(c,hdx+2,hdy+1,45,36,2,false,now);
 if(t<3.2){nest(128,H0-4);const p=seg(t,.3,3.0);egg(128,H0-30,now,p,p*2.5);if(t>.4)bubble("IT'S TIME...",t,.4,58,40,14);
   if(t>2.9){c.fillStyle=`rgba(255,255,255,${seg(t,2.9,3.2).toFixed(2)})`;c.fillRect(0,0,W,H)}return}
 if(t<3.5){c.fillStyle=`rgba(255,255,255,${(1-seg(t,3.2,3.5)).toFixed(2)})`;c.fillRect(0,0,W,H)}
 confetti(3.2,t,60);
 if(t<8.2){const up=E.back(seg(t,3.2,3.8));coin(W/2,Math.round(140-up*66),Math.round(18+up*22),t);
   const s=E.back(seg(t,3.7,4.1));txt("FISHY IS",W/2,Math.round(10+(1-s)*-40),2,"#FFF6DC","#241527","c");txt("LIVE",W/2,Math.round(26+(1-s)*-40),3,"#FFD23F","#9E1B2E","c");
   if(t>4.5){const k=E.back(seg(t,4.5,4.8));const w=tw("ON PONS",2)+16;box(W/2-w/2,Math.round(100+(1-k)*20),w,22,"#3E8E5E");txt("ON PONS",W/2,Math.round(104+(1-k)*20),2,"#FFF6DC",null,"c")}
   return}
 if(t<11.6){const k=E.back(seg(t,8.2,8.6)),y=Math.round(12+(1-k)*-80);box(8,y,164,74,"#FFF6DC");prect(c,8,y,164,12,"#14286E");txt("OFFICIAL CA",13,y+3,1,"#FFD23F");txt("LIVE",167,y+3,1,"#5FCB6A",null,"r");
   if(CA){txt(shortCA.toUpperCase(),W/2,y+18,2,"#241527",null,"c");txt("FULL CA IN THE POST",W/2,y+38,1,"#8B5A2B",null,"c")}else{txt("PINNED ON",W/2,y+17,1,"#8B5A2B",null,"c");txt("@FISHY_RH",W/2,y+28,2,"#241527",null,"c")}
   txt("CHECK IT ON FISHY FIRST",W/2,y+50,1,"#2E7D46",null,"c");txt("ANY OTHER CA IS FAKE",W/2,y+61,1,"#D7263D",null,"c");return}
 c.fillStyle="rgba(10,22,64,.72)";c.fillRect(0,0,W,H);const u=t-11.6,k=E.back(seg(u,0,.4));drawLogoAt(W/2,Math.round(-50+k*(16+50)),2);
 if(u>.3){const s="LIVE ON PONS",w=tw(s,2)+16;prect(c,W/2-w/2-2,72,w+4,24,"#FFD23F");prect(c,W/2-w/2,74,w,20,"#3E8E5E");txt(s,W/2,77,2,"#FFF6DC",null,"c")}
 if(u>.5)coin(W/2,118,26,t);if(u>.8)txt("PONSFAMILY.COM",W/2,140,1,"#FFD23F","#241527","c");if(u>1.0)txt("CA ON @FISHY_RH",W/2,154,1,"#FFF6DC","#241527","c");
 confetti(11.6,t,30);
 if(t>DUR-.4){c.fillStyle=`rgba(0,0,0,${seg(t,DUR-.4,DUR).toFixed(2)})`;c.fillRect(0,0,W,H)}
}
return{cv,frame,setCoin(u){return new Promise(r=>{const im=new Image();im.onload=()=>{COIN=im;r()};im.src=u})}};
})();
