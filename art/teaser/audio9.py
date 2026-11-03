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





# title: fanfare
for i,m in enumerate([60,64,67,72,76,79]):note(mus,.2+i*.09,m,.16,"sq",.3,.25)
add(sfx,1.0,env(wav("sin",np.linspace(160,50,int(SR*.22)),.22),r=.1),.8)
note(sfx,1.4,84,.06,"sq",.2);note(sfx,1.46,91,.12,"sq",.2)
sweep(2.35,300,1600,.3,.15,"tri")
b=60/128;bass=[48,55,52,55,53,60,57,60,50,57,53,57,55,62,59,62];mel=[72,76,79,0,77,0,76,74,72,0,69,72,74,0,71,0]
def tune(t,t1,v=1,minor=False):
    k=0
    while t<t1:
        sw=b/2;bb=bass[k%16]-(3 if minor and k%4==0 else 0);note(mus,t,bb,sw*.8,"tri",.5*v,r=.05);m=mel[k%16]
        if m:note(mus,t,m-(1 if minor and m%12==4 else 0),sw*.55,"sq",.12*v,.25,r=.04)
        if k%2==1:add(mus,t,env(wav("noise",0,.015),r=.01),.05*v)
        t+=sw;k+=1
tune(2.6,14.2)
# sign rising: hammer knocks
for tt in (2.95,3.15,3.35):add(sfx,tt,np.random.uniform(-1,1,int(SR*.05))*np.exp(-np.linspace(0,8,int(SR*.05))),.4);note(sfx,tt,57,.05,"tri",.3)
# tackle box: swoosh + PACKED stamp + ding
for i in range(5):
    t0=5.6+i*1.7;sweep(t0,900,300,.2,.1,"tri");ts=t0+.75
    add(sfx,ts,env(wav("sin",np.linspace(150,50,int(SR*.15)),.15),r=.08),.7);note(sfx,ts+.12,84+i,.06,"sq",.18,.25);note(sfx,ts+.19,91+i,.1,"sq",.18,.25)
# scam cat: sneaky music
tune(14.2,19.6,.75,True)
t=14.25
while t<14.8:add(sfx,t,env(wav("sin",np.linspace(500,900,int(SR*.05)),.05),r=.03),.12);t+=.09
add(sfx,17.6,env(wav("sin",np.linspace(150,50,int(SR*.18)),.18),r=.08),.8);add(sfx,17.62,env(wav("sq",110,.25,.5),r=.05),.3)
t=18.6
while t<19.4:add(sfx,t,env(wav("sin",np.linspace(500,900,int(SR*.05)),.05),r=.03),.15);t+=.08
# warning card: alarm beeps
for i in range(3):note(sfx,19.65+i*.2,88,.1,"sq",.2,.5)
tune(21.0,24.8,.85)
# sign lights up
for i,m in enumerate([72,76,79,84]):note(sfx,21.5+i*.08,m,.1,"sq",.18,.25)
D=[(3.0,"THE LAB IS ALMOST READY. PACKING UP!",32),(15.9,"WE DON'T HAVE A TOKEN.",30),(17.5,"...SO THAT ONE IS FAKE.",30),(22.3,"BETA SOON. BRING YOUR CAS.",30)]
for t0,s,cps in D:
    for i,ch in enumerate(s):
        if ch in " .":continue
        if i%2==0:note(sfx,t0+i/cps,67+(i*5)%4,.045,"tri",.35,r=.02)
for i,ch in enumerate("PSST! FISHY TOKEN PRESALE! 1000X!"):
    if ch not in " ." and i%2==0:note(sfx,14.6+i/30,74+(i*3)%5,.04,"sq",.12,.5,r=.02)
for i,m in enumerate([69,72,76,81,76,84]):note(mus,25.1+i*.2,m,.2,"sq",.25,.25)
note(sfx,25.8,83,.08,"sq",.3);note(sfx,25.88,88,.45,"sq",.3,r=.35)
note(mus,26.4,57,1.5,"tri",.5,r=1.0);note(mus,26.4,69,1.5,"sq",.12,.25,r=1.0)
mix=mus*.4+sfx*.55;mix/=np.max(np.abs(mix))*1.1;fade=np.ones(N);fade[-int(SR*.7):]=np.linspace(1,0,int(SR*.7));mix*=fade
w=wave.open(sys.argv[1],"wb");w.setnchannels(1);w.setsampwidth(2);w.setframerate(SR);w.writeframes((mix*32767).astype(np.int16).tobytes());w.close()
