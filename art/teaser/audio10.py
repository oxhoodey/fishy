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






# title: mysterious
for i,m in enumerate([60,63,67,70,72]):note(mus,.2+i*.12,m,.2,"sq",.28,.25)
add(sfx,1.0,env(wav("sin",np.linspace(160,50,int(SR*.22)),.22),r=.1),.7)
sweep(2.35,300,1600,.3,.15,"tri")
b=60/120;bass=[45,52,48,52,45,52,50,52,43,50,47,50,44,52,47,52];mel=[69,0,72,71,69,0,64,0,67,0,71,69,68,0,64,0]
def tune(t,t1,v=1,up=0):
    k=0
    while t<t1:
        sw=b/2;note(mus,t,bass[k%16]+up,sw*.8,"tri",.5*v,r=.05);m=mel[k%16]
        if m:note(mus,t,m+up,sw*.55,"sq",.12*v,.25,r=.04)
        if k%2==1:add(mus,t,env(wav("noise",0,.015),r=.01),.05*v)
        t+=sw;k+=1
tune(2.6,17.0,.85)
# alert
for i in range(3):note(sfx,2.75+i*.16,84,.1,"sq",.2,.5)
# impostors arrive, chant
for i in range(3):sweep(5.4+i*.3,900,400,.25,.1,"tri")
for i,ch in enumerate("BUY ME! I'M THE REAL FISHY!"):
    if ch not in " ." and i%2==0:note(sfx,5.9+i/28,76+(i*3)%5,.04,"sq",.12,.5,r=.02)
# three scans: swoosh, scan beep, LURE buzzer
for i in range(3):
    t0=8.0+i*3.0;sweep(t0,200,900,.25,.12,"tri")
    for j in range(4):note(sfx,t0+.3+j*.12,88+j,.04,"sq",.1,.25)
    ts=t0+.9;add(sfx,ts,env(wav("sin",np.linspace(150,50,int(SR*.15)),.15),r=.08),.7);add(sfx,ts+.05,env(wav("sq",110,.22,.5),r=.05),.3);add(sfx,ts+.05,env(wav("sq",116,.22,.5),r=.05),.2)
# flee
t=16.9
while t<17.8:add(sfx,t,env(wav("sin",np.linspace(500,900,int(SR*.05)),.05),r=.03),.14);t+=.08
# egg: soft magic + wobble taps
tune(17.8,24.8,.8,3)
for i,m in enumerate([79,84,88,91]):note(sfx,17.6+i*.1,m,.2,"tri",.15,r=.15)
for tt in (19.2,19.6,22.2,22.5,22.8):note(sfx,tt,72,.04,"sq",.15,.25)
note(sfx,22.0,84,.06,"sq",.3);note(sfx,22.07,91,.12,"sq",.3)
D=[(4.0,"WAIT. WE HAVEN'T LAUNCHED YET...",30),(17.1,"NICE COSTUMES. WRONG FISH.",30),(19.9,"THE REAL ONE HASN'T HATCHED YET.",30)]
for t0,s,cps in D:
    for i,ch in enumerate(s):
        if ch in " .":continue
        if i%2==0:note(sfx,t0+i/cps,67+(i*5)%4,.045,"tri",.35,r=.02)
for i,m in enumerate([69,72,76,81,76,84]):note(mus,25.1+i*.2,m,.2,"sq",.25,.25)
note(sfx,25.8,83,.08,"sq",.3);note(sfx,25.88,88,.45,"sq",.3,r=.35)
for tt in (26.2,26.5,26.8):note(sfx,tt,72,.04,"sq",.15,.25)
note(mus,26.4,57,1.5,"tri",.5,r=1.0);note(mus,26.4,69,1.5,"sq",.12,.25,r=1.0)
mix=mus*.4+sfx*.55;mix/=np.max(np.abs(mix))*1.1;fade=np.ones(N);fade[-int(SR*.7):]=np.linspace(1,0,int(SR*.7));mix*=fade
w=wave.open(sys.argv[1],"wb");w.setnchannels(1);w.setsampwidth(2);w.setframerate(SR);w.writeframes((mix*32767).astype(np.int16).tobytes());w.close()
