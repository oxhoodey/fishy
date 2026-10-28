import math
from PIL import Image
N=64;C=31.5
def hx(h):h=h.lstrip('#');return tuple(int(h[i:i+2],16) for i in (0,2,4))+(255,)
OUT=hx("#0A1640");GOLD=[hx(c) for c in ["#7A3A14","#B4561E","#E07C2C","#F5A23E","#FFC452","#FFDF7E","#FFF3C4"]]
NAVY=[hx(c) for c in ["#0B1A4E","#12266A","#183285","#1F3E9C"]];CY=hx("#BDF4FF");CY2=hx("#7FE3FF")
im=Image.new("RGBA",(N,N),(0,0,0,0));px=im.load()
L=(-.62,-.78)
for y in range(N):
    for x in range(N):
        dx,dy=x+.5-32,y+.5-32;r=math.hypot(dx,dy)
        if r>31.5:continue
        if r>30.5:px[x,y]=OUT;continue
        nx,ny=(dx/r,dy/r) if r else (0,0)
        if r>24.5: # rim: lit by angle, reeded edge
            lit=(nx*L[0]+ny*L[1]);v=int(round((lit+1)/2*5))+1
            if r>28.5:
                a=math.atan2(dy,dx);v-=1 if int((a+math.pi)/(2*math.pi)*48)%2 else 0
            if 25.5<r<=26.5:v-=1
            px[x,y]=GOLD[max(0,min(6,v))];continue
        if r>23.5:px[x,y]=OUT;continue
        if r>22.5:px[x,y]=CY if (nx*L[0]+ny*L[1])>0 else CY2;continue
        t=(dx*L[0]+dy*L[1])/23;v=int(round((t+1)/2*3));px[x,y]=NAVY[max(0,min(3,v))]
# rim glints (top-left)
for (x,y) in [(15,8),(16,8),(14,9),(9,14),(9,15),(10,13),(12,11)]:px[x,y]=hx("#FFFFFF")
# emblem: leaping fish (faces left) + Robin's red feather
pal={"o":"#0A1640","1":"#E6FBFF","2":"#9FE8FF","3":"#4FC3F7","4":"#2A8FD6","5":"#1B5FA8","w":"#FFFFFF","e":"#0A1640","K":"#0A1640","f":"#FF9873","F":"#E8443F","r":"#A3213A","y":"#FFE27A"}
fish=[
"..............oooo..................",
".............o223oo.................",
"............o22333oo................",
"........ooooo22333344oooo...........",
"......oo1111222222223333oo.....ooo..",
"....oo112222222222222233334o..o344o.",
"...o1122ww22222222222223334o.o3445o.",
"..o112wwKo22222222222222333444o3445o",
".o1122wKKo222222222222223334444o455o",
"o11222wwo2222222222222223334444o455o",
"oo222222222222222222222333344444o45o",
".o33322222222222222223333444444oo45o",
"..oo333333322222223333444445oo.oo5o.",
"....oo44443333333344444555oo....oo..",
"......oo555544444455555oo...........",
"........oooo5555555oooo.............",
"............ooooooo.................",
]
fea=["......ooo",".....offo","....offFo","....ofFFo","...ofFFro","...oFFFro","..ofFFro.","..oFFrro.",".ofFFro..",".oFFro...",".oFro....","..oo.....",".oy......","oy......."]
def put(rows,ox,oy):
    for j,row in enumerate(rows):
        for i,ch in enumerate(row):
            if ch in ". ":continue
            px[ox+i,oy+j]=hx(pal[ch])
put(fea,40,10);put(fish,13,24)
# small sparkle
for (x,y) in [(19,17),(18,18),(19,18),(20,18),(19,19)]:px[x,y]=hx("#FFF3C4")
im.save("coin64.png")
for s in (512,256,200,128):im.resize((s,s),Image.NEAREST).save(f"fishy_token_{s}.png")
im.resize((32,32),Image.LANCZOS).save("fishy_token_32.png")
# preview on light and dark
pv=Image.new("RGBA",(1180,560),(246,231,193,255));pv.paste(im.resize((512,512),Image.NEAREST),(20,24),im.resize((512,512),Image.NEAREST))
dk=Image.new("RGBA",(300,300),(20,20,28,255));pv.paste(dk,(560,24))
for s,(x,y) in [(128,(570,40)),(64,(720,60)),(32,(800,80))]:
    t=im.resize((s,s),Image.NEAREST if s>=64 else Image.LANCZOS);pv.paste(t,(x,y),t)
for s,(x,y) in [(128,(570,360)),(64,(720,380)),(32,(800,400))]:
    t=im.resize((s,s),Image.NEAREST if s>=64 else Image.LANCZOS);pv.paste(t,(x,y),t)
pv.save("preview.png")
