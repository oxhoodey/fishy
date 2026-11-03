import numpy as np,wave,sys
SR=44100;T=15.0;N=int(SR*T);mus=np.zeros(N);sfx=np.zeros(N)
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











add(sfx,0.0,env(wav("sin",np.linspace(180,40,int(SR*.4)),.4),r=.2),.9)
for i,m in enumerate([60,64,67,72,76,79]):note(mus,.1+i*.08,m,.14,"sq",.3,.25)
sweep(1.5,300,1800,.3,.15,"tri")
# tense pulse under the countdown, rising
for k in range(5):
    t0=1.8+k*1.44
    add(sfx,t0,env(wav("sin",np.linspace(160,45,int(SR*.25)),.25),r=.1),.9)
    note(sfx,t0,72+k*2,.35,"sq",.25,.5,r=.2);note(sfx,t0+.02,84+k*2,.25,"sq",.12,.25,r=.15)
    for j in range(4):note(mus,t0+j*.36,45+k*2,.3,"tri",.5,r=.05);add(mus,t0+j*.36+.18,np.random.uniform(-1,1,int(SR*.03))*np.exp(-np.linspace(0,8,int(SR*.03))),.12)
    for j in range(8):note(sfx,t0+j*.18,96,.015,"sq",.05+.01*k,.5)
sweep(8.6,400,2400,.4,.15,"sq")
# SEE YOU ON PONS fanfare
for i,m in enumerate([72,76,79,84,88]):note(sfx,9.0+i*.09,m,.16,"sq",.25,.25)
b=60/132;bass=[48,55,52,55,53,60,57,60];mel=[72,76,79,76,77,81,79,76]
t=9.0;k=0
while t<14.6:
    sw=b/2;note(mus,t,bass[k%8],sw*.8,"tri",.5,r=.05);note(mus,t,mel[k%8],sw*.5,"sq",.11,.25,r=.04)
    if k%2==1:add(mus,t,np.random.uniform(-1,1,int(SR*.02))*np.exp(-np.linspace(0,8,int(SR*.02))),.1)
    t+=sw;k+=1
for tt in (10.0,10.25,10.5):note(sfx,tt,93,.08,"sq",.15,.25)
note(sfx,12.2,84,.08,"sq",.3);note(sfx,12.28,91,.4,"sq",.3,r=.3)
mix=mus*.4+sfx*.55;mix/=np.max(np.abs(mix))*1.1;fade=np.ones(N);fade[-int(SR*.5):]=np.linspace(1,0,int(SR*.5));mix*=fade
w=wave.open(sys.argv[1],"wb");w.setnchannels(1);w.setsampwidth(2);w.setframerate(SR);w.writeframes((mix*32767).astype(np.int16).tobytes());w.close()
