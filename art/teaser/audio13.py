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









def tick(t0,t1,step=.5,v=.08):
    t=t0
    while t<t1:note(sfx,t,96,.015,"sq",v,.5);t+=step
for i,m in enumerate([60,64,67,72]):note(mus,.2+i*.12,m,.16,"sq",.28,.25)
tick(1.3,2.4,.25,.12);add(sfx,1.0,env(wav("sin",np.linspace(160,50,int(SR*.22)),.22),r=.1),.7)
sweep(2.35,300,1600,.3,.15,"tri")
b=60/108;bass=[48,55,52,55,53,60,57,60,50,57,53,57,55,62,59,62];mel=[72,0,76,0,79,77,76,0,74,0,72,0,71,72,74,0]
def tune(t,t1,v=1,up=0):
    k=0
    while t<t1:
        sw=b/2;note(mus,t,bass[k%16]+up,sw*.8,"tri",.48*v,r=.06);m=mel[k%16]
        if m:note(mus,t,m+up,sw*.5,"sq",.1*v,.25,r=.05)
        t+=sw;k+=1
tune(2.6,14.0,.85)
tick(2.6,24.7,.5,.06)
# checklist ticks
sweep(5.0,200,900,.25,.12,"tri")
for i in range(5):note(sfx,5.6+i*1.5,84+i*2,.06,"sq",.22,.25);note(sfx,5.66+i*1.5,91+i*2,.1,"sq",.22,.25)
# cat
tune(14.0,17.8,.7,-3)
t=14.0
while t<14.5:add(sfx,t,env(wav("sin",np.linspace(500,900,int(SR*.05)),.05),r=.03),.12);t+=.09
for i,ch in enumerate("PSST. EARLY CA? JUST FOR YOU."):
    if ch not in " ." and i%2==0:note(sfx,14.6+i/30,76+(i*3)%5,.04,"sq",.12,.5,r=.02)
add(sfx,16.2,env(wav("sin",np.linspace(150,50,int(SR*.18)),.18),r=.08),.8);add(sfx,16.25,env(wav("sq",110,.22,.5),r=.05),.3)
t=16.9
while t<17.7:add(sfx,t,env(wav("sin",np.linspace(500,900,int(SR*.05)),.05),r=.03),.14);t+=.08
# crowd + final card
tune(17.8,24.8,.9,5)
for k2 in range(6):add(sfx,18.4+k2*.4,env(wav("sin",np.linspace(700,250,int(SR*.09)),.09),r=.05),.2)
note(sfx,21.0,84,.06,"sq",.3);note(sfx,21.07,91,.12,"sq",.3)
D=[(2.8,"A FEW HOURS LEFT. FINAL CHECKS!",30),(16.2,"THERE IS NO EARLY CA.",30),(18.0,"SAME CA. SAME TIME. FOR EVERYONE.",30)]
for t0,s,cps in D:
    for i,ch in enumerate(s):
        if ch in " .":continue
        if i%2==0:note(sfx,t0+i/cps,67+(i*5)%4,.045,"tri",.35,r=.02)
for i,m in enumerate([69,72,76,81,76,84]):note(mus,25.1+i*.2,m,.2,"sq",.25,.25)
note(sfx,25.8,83,.08,"sq",.3);note(sfx,25.88,88,.45,"sq",.3,r=.35);tick(25.6,27.6,.5,.07)
note(mus,26.4,57,1.5,"tri",.5,r=1.0);note(mus,26.4,69,1.5,"sq",.12,.25,r=1.0)
mix=mus*.4+sfx*.55;mix/=np.max(np.abs(mix))*1.1;fade=np.ones(N);fade[-int(SR*.7):]=np.linspace(1,0,int(SR*.7));mix*=fade
w=wave.open(sys.argv[1],"wb");w.setnchannels(1);w.setsampwidth(2);w.setframerate(SR);w.writeframes((mix*32767).astype(np.int16).tobytes());w.close()
