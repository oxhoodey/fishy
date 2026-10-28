import numpy as np,wave,sys
SR=44100;T=28.0;N=int(SR*T);mus=np.zeros(N);sfx=np.zeros(N)
def f(m):return 440*2**((m-69)/12)
def wav(kind,fr,d,duty=.5):
    n=int(SR*d);t=np.arange(n)/SR
    ph=(np.cumsum(np.broadcast_to(fr,(n,))/SR) if np.ndim(fr) else fr*t)%1
    if kind=="sq":return np.where(ph<duty,1.,-1.)
    if kind=="tri":return 4*np.abs(ph-.5)-1
    if kind=="sin":return np.sin(2*np.pi*ph)
    return np.random.uniform(-1,1,n)
def env(x,a=.004,r=.05):
    n=len(x);e=np.ones(n);A=min(n,max(1,int(a*SR)));R=min(n,max(1,int(r*SR)));e[:A]=np.linspace(0,1,A);e[-R:]*=np.linspace(1,0,R);return x*e
def add(buf,t0,x,v):
    i=int(t0*SR)
    if i>=N:return
    j=min(N,i+len(x));buf[i:j]+=x[:j-i]*v
def note(buf,t0,m,d,kind="sq",v=.5,duty=.5,r=.04):add(buf,t0,env(wav(kind,f(m),d,duty),r=r),v)

def sweep(t0,a,b,d,v=.25,kind="sq"):add(sfx,t0,env(wav(kind,np.linspace(a,b,int(SR*d)),d,.5),r=.05),v)
def noiseb(t0,d,v,k=6):add(sfx,t0,np.random.uniform(-1,1,int(SR*d))*np.exp(-np.linspace(0,k,int(SR*d))),v)

def ding(t0,v=.22):note(sfx,t0,88,.06,"sq",v,.25);note(sfx,t0+.06,93,.12,"sq",v,.25,r=.08)
def plop(t0,v=.3):add(sfx,t0,env(wav("sin",np.linspace(700,250,int(SR*.09)),.09),r=.05),v)
# title
for i,m in enumerate([57,60,64,69]):note(mus,.2+i*.12,m,.2,"sq",.3,.25)
noiseb(1.7,.2,.4,2);sweep(1.7,2000,300,.2,.2);add(sfx,1.9,env(wav("sin",np.linspace(160,50,int(SR*.22)),.22),r=.1),.9);noiseb(1.9,.08,.35)
# music
b=60/120;bass=[48,55,52,55,45,52,48,52,41,48,45,48,43,50,47,50];mel=[76,0,79,76,74,0,72,0,77,76,74,72,71,0,67,0]
def bouncy(t,t1,v=1):
    k=0
    while t<t1:
        note(mus,t,bass[k%16],b/2*.8,"tri",.5*v,r=.08);m=mel[k%16]
        if m:note(mus,t,m,b/2*.6,"sq",.14*v,.25,r=.06)
        if k%2==1:add(mus,t,env(wav("noise",0,.02),r=.015),.06*v)
        t+=b/2;k+=1
bouncy(2.6,11.5);bouncy(21.2,24.9,.8)
b2=60/170;bb=[45,45,45,46,45,45,43,44];t=11.6;k=0
while t<21.0:
    vv=.55 if t<14.6 else .3
    note(mus,t,bb[k%8]-12,b2/2*.9,"tri",vv);
    if k%2==0:add(mus,t,env(wav("noise",0,.05),r=.04),.15*vv/.55)
    if k%8==0 and t<14.6:note(mus,t,57,b2*3.5,"sq",.1,.5,r=.2)
    t+=b2/2;k+=1
# fishing up the first bottle
for d in (0,.1,.2):note(sfx,3.6+d,96,.04,"sq",.25)
t=4.0
while t<4.6:add(sfx,t,env(wav("noise",0,.012),r=.008),.3);t+=.045
noiseb(4.6,.06,.4,9);add(sfx,4.6,env(wav("sin",900,.06),r=.04),.3);ding(4.8)
# DM flood: cards, then accelerating dings + bottle plops
for i in range(6):ding(7.6+i*.6,.2)
t=9.0;gap=.3
while t<11.5:ding(t,.12);t+=gap;gap=max(.04,gap*.85)
for i in range(18):plop(7.4+i/3,.18)
# boss
noiseb(11.6,.9,.45,3);add(sfx,11.6,env(wav("sq",np.linspace(110,55,int(SR*.9)),.9,.5),r=.3),.35)
# megaphone blares for each board line
for tt in (14.8,15.5,16.3,17.5,18.1,19.1):
    for fr in (330,415):add(sfx,tt,env(wav("sq",fr,.22,.4),r=.06),.12)
    noiseb(tt,.05,.08)
# DO NOT DISTURB knock + kraken deflate + bottles sinking
for d in (0,.12):add(sfx,21.0+d,env(wav("sin",np.linspace(220,120,int(SR*.06)),.06),r=.04),.6)
sweep(21.1,600,80,1.3,.15,"tri")
for i in range(8):plop(21.1+i*.08,.12)
# last bottle
plop(23.45,.3);ding(23.75,.15);sweep(24.0,500,250,.6,.18,"tri");add(sfx,24.45,env(wav("sin",np.linspace(400,120,int(SR*.15)),.15),r=.08),.4)
sweep(24.7,400,2000,.3,.12,"tri")
# voices
D=[(6.2,"WE... DON'T EVEN DO PROMO.",24),(12.9,"OH NO.",20),(21.8,"AH. PEACE AND QUIET.",24)]
for t0,s,cps in D:
    for i,ch in enumerate(s):
        if ch in " .":continue
        if i%2==0:note(sfx,t0+i/cps,67+(i*5)%4,.045,"tri",.35,r=.02)
# end card
for i,m in enumerate([69,72,76,81,76,84]):note(mus,25.1+i*.2,m,.2,"sq",.25,.25)
note(mus,26.4,57,1.5,"tri",.5,r=1.0);note(mus,26.4,69,1.5,"sq",.12,.25,r=1.0)
mix=mus*.4+sfx*.55;mix/=np.max(np.abs(mix))*1.1;fade=np.ones(N);fade[-int(SR*.7):]=np.linspace(1,0,int(SR*.7));mix*=fade
w=wave.open(sys.argv[1],"wb");w.setnchannels(1);w.setsampwidth(2);w.setframerate(SR);w.writeframes((mix*32767).astype(np.int16).tobytes());w.close()
