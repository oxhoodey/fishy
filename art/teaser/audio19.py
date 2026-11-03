import numpy as np,wave,sys
SR=44100;T=18.0;N=int(SR*T);mus=np.zeros(N);sfx=np.zeros(N)
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















add(sfx,0.0,env(wav("sin",np.linspace(180,40,int(SR*.35)),.35),r=.15),.8)
for i,m in enumerate([60,64,67,72,76]):note(mus,.1+i*.08,m,.14,"sq",.3,.25)
sweep(1.8,300,1600,.3,.15,"tri")
b=60/120;bass=[48,55,52,55,53,60,57,60,50,57,53,57,55,62,59,62];mel=[72,76,79,0,77,0,76,74,72,0,69,72,74,0,71,0]
def tune(t,t1,v=1,up=0):
    k=0
    while t<t1:
        sw=b/2;note(mus,t,bass[k%16]+up,sw*.8,"tri",.5*v,r=.05);m=mel[k%16]
        if m:note(mus,t,m+up,sw*.55,"sq",.11*v,.25,r=.04)
        if k%2==1:add(mus,t,np.random.uniform(-1,1,int(SR*.015))*np.exp(-np.linspace(0,8,int(SR*.015))),.08*v)
        t+=sw;k+=1
tune(2.2,17.6,.85)
for i,ch in enumerate("A RUG CHECKER SHOULD CHECK ITSELF FIRST."):
    if ch not in " ." and i%2==0:note(sfx,2.3+i/32,67+(i*5)%4,.045,"tri",.35,r=.02)
sweep(4.2,200,900,.25,.12,"tri")
for i in range(5):
    tt=5.0+i*1.1
    for j in range(3):note(sfx,tt+j*.05,90+j*2,.03,"sq",.08,.25)
    note(sfx,tt+.2,84+i,.06,"sq",.22,.25);note(sfx,tt+.26,91+i,.1,"sq",.22,.25)
add(sfx,10.6,env(wav("sin",np.linspace(150,50,int(SR*.18)),.18),r=.08),.9)
for i,m in enumerate([72,76,79,84,88]):note(sfx,10.75+i*.08,m,.14,"sq",.24,.25)
note(sfx,12.4,84,.06,"sq",.3);note(sfx,12.47,91,.12,"sq",.3)
for i,m in enumerate([72,76,79,84]):note(sfx,15.2+i*.09,m,.16,"sq",.25,.25)
note(mus,17.2,57,.7,"tri",.5,r=.5);note(mus,17.2,81,.7,"sq",.12,.25,r=.5)
mix=mus*.4+sfx*.55;mix/=np.max(np.abs(mix))*1.1;fade=np.ones(N);fade[-int(SR*.4):]=np.linspace(1,0,int(SR*.4));mix*=fade
w=wave.open(sys.argv[1],"wb");w.setnchannels(1);w.setsampwidth(2);w.setframerate(SR);w.writeframes((mix*32767).astype(np.int16).tobytes());w.close()
