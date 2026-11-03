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










for i,m in enumerate([60,64,67,72,76]):note(mus,.2+i*.1,m,.16,"sq",.3,.25)
add(sfx,1.0,env(wav("sin",np.linspace(160,50,int(SR*.22)),.22),r=.1),.7)
sweep(2.35,300,1600,.3,.15,"tri")
b=60/118;bass=[48,55,52,55,53,60,57,60,50,57,53,57,55,62,59,62];mel=[72,76,79,0,77,0,76,74,72,0,69,72,74,0,71,0]
def tune(t,t1,v=1,up=0):
    k=0
    while t<t1:
        sw=b/2;note(mus,t,bass[k%16]+up,sw*.8,"tri",.5*v,r=.05);m=mel[k%16]
        if m:note(mus,t,m+up,sw*.55,"sq",.11*v,.25,r=.04)
        if k%2==1:add(mus,t,env(wav("noise",0,.015),r=.01),.05*v)
        t+=sw;k+=1
tune(2.6,18.8,.85)
for i in range(4):
    t0=5.0+i*3.4;sweep(t0,300,1200,.2,.12,"tri");note(sfx,t0+.35,84+i*2,.08,"sq",.22,.25)
    note(sfx,t0+1.1,88+i*2,.06,"sq",.2,.25);note(sfx,t0+1.17,95+i*2,.1,"sq",.2,.25)
# kraken DM: alarm + stamp
tune(18.8,22.4,.7,-5)
note(sfx,19.0,88,.06,"sq",.22,.25);note(sfx,19.06,93,.1,"sq",.22,.25)
add(sfx,20.0,env(wav("sin",np.linspace(150,50,int(SR*.18)),.18),r=.08),.8);add(sfx,20.05,env(wav("sq",110,.22,.5),r=.05),.3)
sweep(21.2,800,150,.8,.12)
tune(22.4,24.8,.85,5);note(sfx,22.9,84,.06,"sq",.3);note(sfx,22.97,91,.12,"sq",.3)
D=[(2.8,"NEVER BOUGHT ON PONS? HERE'S HOW ROBIN DOES IT.",32),(21.2,"NOBODY LEGIT WILL EVER DM YOU A CA.",36)]
for t0,s,cps in D:
    for i,ch in enumerate(s):
        if ch in " .":continue
        if i%2==0:note(sfx,t0+i/cps,67+(i*5)%4,.045,"tri",.35,r=.02)
for i,m in enumerate([69,72,76,81,76,84]):note(mus,25.1+i*.2,m,.2,"sq",.25,.25)
note(sfx,25.8,83,.08,"sq",.3);note(sfx,25.88,88,.45,"sq",.3,r=.35)
note(mus,26.4,57,1.5,"tri",.5,r=1.0);note(mus,26.4,69,1.5,"sq",.12,.25,r=1.0)
mix=mus*.4+sfx*.55;mix/=np.max(np.abs(mix))*1.1;fade=np.ones(N);fade[-int(SR*.7):]=np.linspace(1,0,int(SR*.7));mix*=fade
w=wave.open(sys.argv[1],"wb");w.setnchannels(1);w.setsampwidth(2);w.setframerate(SR);w.writeframes((mix*32767).astype(np.int16).tobytes());w.close()
