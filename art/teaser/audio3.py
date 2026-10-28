import numpy as np,wave,sys
SR=44100;T=26.0;N=int(SR*T);mus=np.zeros(N);sfx=np.zeros(N)
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
# title
for i,m in enumerate([60,64,67,72]):note(mus,.2+i*.12,m,.2,"sq",.3,.25)
add(sfx,.9,env(wav("sin",np.linspace(150,55,int(SR*.25)),.25),r=.1),.8);sweep(2.2,300,1600,.3,.15,"tri")
# bouncy music 2.5-17.4 and 19.8-23
b=60/120;bass=[48,55,52,55,45,52,48,52,41,48,45,48,43,50,47,50];mel=[76,0,79,76,74,0,72,0,77,76,74,72,71,0,67,0]
def bouncy(t,t1):
    k=0
    while t<t1:
        note(mus,t,bass[k%16],b/2*.8,"tri",.5,r=.08)
        m=mel[k%16]
        if m:note(mus,t,m,b/2*.6,"sq",.14,.25,r=.06)
        if k%2==1:add(mus,t,env(wav("noise",0,.02),r=.015),.06)
        t+=b/2;k+=1
bouncy(2.5,17.3);bouncy(19.8,22.8)
# tension 17.4-19.8
t=17.4;h=0
while t<19.0:note(mus,t,40 if h%2==0 else 41,.09,"tri",.6,r=.02);t+=.1;h+=1
# voices
D=[(4.0,"PSST! NEW TOKEN! PEPE2. 1000X GUARANTEED. TRUST ME BRO.",26,"crab"),(7.0,"HMM... LET ME CHECK IT FIRST.",24,"robin"),(13.1,"8% REAL VOLUME. $40 EXIT. AND IT'S A CLONE.",26,"robin"),
   (15.3,"IT'S... UH... A COMMUNITY TOKEN?",22,"crab"),(18.3,"...GOTTA GO!",30,"crab"),(19.9,"THAT'S FISHY: REAL VOLUME, REAL EXIT, RUG ALERTS.",30,"robin")]
for t0,s,cps,who in D:
    for i,ch in enumerate(s):
        if ch in " .": continue
        if who=="crab" and i%2==0:note(sfx,t0+i/cps,90+(i*7)%5,.03,"sq",.13,.125,r=.01)
        if who=="robin" and i%2==0:note(sfx,t0+i/cps,67+(i*5)%4,.045,"tri",.35,r=.02)
# events
noiseb(3.0,.35,.45,5);sweep(3.0,700,250,.2,.2,"sin")
sweep(8.6,200,900,.25,.15,"tri");note(sfx,8.9,84,.06,"sq",.25);note(sfx,8.96,91,.08,"sq",.25)
for tt in (9.4,10.2,11.0):add(sfx,tt,env(wav("sq",110,.22,.5),r=.05),.3);add(sfx,tt,env(wav("sq",116,.22,.5),r=.05),.2)
add(sfx,11.8,env(wav("sin",np.linspace(160,50,int(SR*.2)),.2),r=.1),.9);noiseb(11.8,.08,.35)
for i in range(9):
    t0=15.6+i*.18;sweep(t0,1400,600,.15,.06,"tri")
    add(sfx,t0+.45,env(wav("sq",np.concatenate([np.linspace(900,1500,int(SR*.08)),np.linspace(1500,800,int(SR*.1))]),.18,.3),r=.04),.18)
sweep(18.8,300,2400,.35,.2);sweep(19.1,2400,600,.3,.12)
noiseb(19.0,.4,.5,4);noiseb(19.45,.25,.6,7);add(sfx,19.45,env(wav("sq",np.linspace(160,60,int(SR*.2)),.2,.5)),.35)
for i,tt in enumerate((20.9,21.3,21.7)):note(sfx,tt,79+i*4,.08,"sq",.28);note(sfx,tt+.07,86+i*4,.1,"sq",.28)
sweep(22.7,400,2000,.3,.12,"tri")
for i,m in enumerate([72,76,79,84,79,88]):note(mus,23.1+i*.2,m,.2,"sq",.25,.25)
note(sfx,23.8,83,.08,"sq",.3);note(sfx,23.88,88,.45,"sq",.3,r=.35);note(mus,24.4,60,1.5,"tri",.5,r=1.0);note(mus,24.4,72,1.5,"sq",.12,.25,r=1.0)
mix=mus*.4+sfx*.55;mix/=np.max(np.abs(mix))*1.1;fade=np.ones(N);fade[-int(SR*.7):]=np.linspace(1,0,int(SR*.7));mix*=fade
w=wave.open(sys.argv[1],"wb");w.setnchannels(1);w.setsampwidth(2);w.setframerate(SR);w.writeframes((mix*32767).astype(np.int16).tobytes());w.close()
