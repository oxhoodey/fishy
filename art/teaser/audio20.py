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











def ding(t0,v=.25):
    for f,vv in ((1320,v),(1980,v*.5),(2640,v*.25)):add(sfx,t0,wav("sin",f,.6)*np.exp(-np.linspace(0,6,int(SR*.6))),vv)
for i,m in enumerate([60,64,67,72,76]):note(mus,.2+i*.1,m,.16,"sq",.3,.25)
ding(1.3);ding(1.7)
sweep(2.35,300,1600,.3,.15,"tri")
b=60/96;bass=[48,55,52,55,53,57,55,52];mel=[72,0,76,74,72,0,69,0]
def chill(t,t1,v=1):
    k=0
    while t<t1:
        sw=b/2;note(mus,t,bass[k%8],sw*.8,"tri",.45*v,r=.08);m=mel[k%8]
        if m:note(mus,t,m,sw*.5,"sin",.18*v,r=.08)
        t+=sw;k+=1
chill(2.6,11.0,.85)
# bell hung
ding(6.1,.18)
# happy catch splash
add(sfx,8.3,np.random.uniform(-1,1,int(SR*.25))*np.exp(-np.linspace(0,6,int(SR*.25))),.25);for_=None
for i,m in enumerate([79,83,86]):note(sfx,9.2+i*.07,m,.08,"sq",.15,.25)
# shark tension
t=10.6
while t<12.2:note(mus,t,40,.3,"tri",.5,r=.1);t+=.4
# BELL RINGS
t=12.2
while t<15.8:ding(t,.22);t+=.3
for i in range(3):note(sfx,12.25+i*.16,84,.1,"sq",.2,.5)
# fish flee whoosh
sweep(14.2,900,300,.8,.12,"tri")
for i,m in enumerate([67,66,65,64]):add(sfx,15.5+.12*i,env(wav("sq",f(m),.12,.4),r=.05),.1)
b2=60/120;bass2=[48,55,52,55,53,60,57,60,50,57,53,57,55,62,59,62];mel2=[72,76,79,0,77,0,76,74,72,0,69,72,74,0,71,0]
t=16.0;k=0
while t<24.8:
    sw=b2/2;note(mus,t,bass2[k%16],sw*.8,"tri",.5,r=.05);m=mel2[k%16]
    if m:note(mus,t,m,sw*.55,"sq",.11,.25,r=.04)
    t+=sw;k+=1
sweep(17.0,300,1200,.25,.12,"tri")
D=[(2.8,"STARING AT CHARTS ALL DAY...",30),(5.3,"...OR LET THE BELL WATCH.",30),(14.3,"THANKS, BELL. EVERYBODY OUT!",30),(21.6,"STOP STARING. LET THE BELL WATCH.",30)]
for t0,s,cps in D:
    for i,ch in enumerate(s):
        if ch in " .":continue
        if i%2==0:note(sfx,t0+i/cps,67+(i*5)%4,.045,"tri",.35,r=.02)
for i,m in enumerate([69,72,76,81,76,84]):note(mus,25.1+i*.2,m,.2,"sq",.25,.25)
ding(25.7,.2);ding(26.0,.15)
note(mus,26.4,57,1.5,"tri",.5,r=1.0);note(mus,26.4,69,1.5,"sq",.12,.25,r=1.0)
mix=mus*.4+sfx*.55;mix/=np.max(np.abs(mix))*1.1;fade=np.ones(N);fade[-int(SR*.7):]=np.linspace(1,0,int(SR*.7));mix*=fade
w=wave.open(sys.argv[1],"wb");w.setnchannels(1);w.setsampwidth(2);w.setframerate(SR);w.writeframes((mix*32767).astype(np.int16).tobytes());w.close()
