import sys
from PIL import Image,ImageDraw
D=sys.argv[1];NOW=sys.argv[2]
F={ # 5x7 pixel font
'A':["01110","10001","10001","11111","10001","10001","10001"],'B':["11110","10001","11110","10001","10001","10001","11110"],
'C':["01111","10000","10000","10000","10000","10000","01111"],'D':["11110","10001","10001","10001","10001","10001","11110"],
'E':["11111","10000","11110","10000","10000","10000","11111"],'F':["11111","10000","11110","10000","10000","10000","10000"],
'H':["10001","10001","11111","10001","10001","10001","10001"],'I':["11111","00100","00100","00100","00100","00100","11111"],
'K':["10001","10010","11100","10010","10001","10001","10001"],'L':["10000","10000","10000","10000","10000","10000","11111"],
'N':["10001","11001","10101","10011","10001","10001","10001"],'O':["01110","10001","10001","10001","10001","10001","01110"],
'P':["11110","10001","10001","11110","10000","10000","10000"],'R':["11110","10001","10001","11110","10010","10001","10001"],
'S':["01111","10000","01110","00001","00001","00001","11110"],'T':["11111","00100","00100","00100","00100","00100","00100"],
'U':["10001","10001","10001","10001","10001","10001","01110"],'V':["10001","10001","10001","10001","01010","01010","00100"],
'X':["10001","01010","00100","00100","01010","10001","10001"],'Y':["10001","10001","01010","00100","00100","00100","00100"],
'G':["01111","10000","10000","10111","10001","10001","01111"],'M':["10001","11011","10101","10001","10001","10001","10001"],
'W':["10001","10001","10001","10101","10101","11011","10001"],'?':["01110","10001","00001","00110","00100","00000","00100"],
' ':["000","000","000","000","000","000","000"],'·':["000","000","000","010","000","000","000"],'-':["000","000","000","111","000","000","000"],
}
def tw(t,ps):return sum((len(F[ch][0])+1)*ps for ch in t)-ps
def text(d,t,x,y,ps,col,shadow=None):
    for ch in t:
        g=F[ch]
        for j,row in enumerate(g):
            for i,v in enumerate(row):
                if v=="1":
                    if shadow:d.rectangle([x+i*ps+ps,y+j*ps+ps,x+i*ps+2*ps-1,y+j*ps+2*ps-1],fill=shadow)
                    d.rectangle([x+i*ps,y+j*ps,x+i*ps+ps-1,y+j*ps+ps-1],fill=col)
        x+=(len(g[0])+1)*ps
def plaque(d,x,y,w,h,r=6):
    d.rounded_rectangle([x-8+6,y-8+8,x+w+8+6,y+h+8+8],r+6,fill=(10,22,64))
    d.rounded_rectangle([x-8,y-8,x+w+8,y+h+8],r+6,fill=(189,244,255))
    d.rounded_rectangle([x-4,y-4,x+w+4,y+h+4],r+3,fill=(10,22,64))
    d.rounded_rectangle([x,y,x+w,y+h],r,fill=(20,40,110))
# banner
sc=Image.open(f"{D}/banner_low_{NOW}.png").convert("RGB");B=sc.resize((1500,501),Image.NEAREST).crop((0,0,1500,500))
logo=Image.open(f"{D}/logo_low.png").convert("RGBA");L=logo.resize((logo.width*6,logo.height*6),Image.NEAREST)
L=logo.resize((logo.width*9,logo.height*9),Image.NEAREST);lx=750-L.width//2;ly=6;B.paste(L,(lx,ly),L)
d=ImageDraw.Draw(B)
tag="IS THIS TOKEN FISHY?";ps=5;w=tw(tag,ps);px=750-(w+32)//2;py=ly+L.height-26
plaque(d,px,py,w+32,7*ps+20);text(d,tag,px+16,py+10,ps,(255,246,220),shadow=(10,22,64))
d.rectangle([px+4,py+7*ps//2+8,px+9,py+7*ps//2+13],fill=(127,227,255));d.rectangle([px+w+23,py+7*ps//2+8,px+w+28,py+7*ps//2+13],fill=(127,227,255))
sub="BUILT ON ROBINHOOD CHAIN · REAL VOLUME · RUG RADAR";ps2=2;w2=tw(sub,ps2);text(d,sub,1500-w2-24,500-30,ps2,(255,246,220),shadow=(36,21,39))
B.save(f"{D}/fishy_x_banner_{NOW}.png")
# profile picture
P=Image.open(f"{D}/pfp_low.png").convert("RGB").resize((400,400),Image.NEAREST);P.save(f"{D}/fishy_x_pfp.png")
m=Image.new("L",(400,400),0);ImageDraw.Draw(m).ellipse([0,0,399,399],fill=255);prev=Image.new("RGB",(400,400),(255,255,255));prev.paste(P,(0,0),m);prev.save(f"{D}/pfp_circle_preview.png")
