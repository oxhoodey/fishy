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














def crackle(t0,d,v):
    t=t0
    while t<t0+d:add(sfx,t,np.random.uniform(-1,1,int(SR*.012))*np.exp(-np.linspace(0,6,int(SR*.012))),v*(0.5+np.random.rand()));t+=0.03+np.random.rand()*.07
crackle(0,15,.07)
for i,ch in enumerate("LAUNCH DAY. FIRST THING FIRST..."):
    if ch not in " ." and i%2==0:note(sfx,.1+i/30,67+(i*5)%4,.045,"tri",.35,r=.02)
sweep(.6,300,1200,1.0,.12,"tri")
add(sfx,1.6,env(wav("sin",np.linspace(160,40,int(SR*.5)),.5),r=.2),1.0);add(sfx,1.6,np.random.uniform(-1,1,int(SR*.8))*np.exp(-np.linspace(0,4,int(SR*.8))),.4)
sweep(2.3,300,1800,.3,.15,"tri")
for i,m in enumerate([72,76,79,84,88,91]):note(sfx,2.6+i*.08,m,.18,"sq",.25,.25)
b=60/136;bass=[45,45,57,45,48,48,60,48,43,43,55,43,47,47,59,47];mel=[69,72,76,72,79,76,72,76,67,71,74,71,79,74,71,74]
t=2.6;k=0
while t<14.6:
    sw=b/2;note(mus,t,bass[k%16],sw*.7,"tri",.55,r=.04);note(mus,t,mel[k%16],sw*.45,"sq",.11,.25,r=.03)
    if k%4==0:add(mus,t,env(wav("sin",np.linspace(120,45,int(SR*.12)),.12),r=.06),.6)
    if k%4==2:add(mus,t,np.random.uniform(-1,1,int(SR*.06))*np.exp(-np.linspace(0,6,int(SR*.06))),.25)
    t+=sw;k+=1
for i in range(30):note(sfx,3.3+i*.03,95+(i*7)%9,.02,"sq",.05,.25)
for tt in (4.4,5.4,6.2):add(sfx,tt,env(wav("sin",np.linspace(150,50,int(SR*.15)),.15),r=.08),.8);note(sfx,tt+.12,84,.06,"sq",.2,.25);note(sfx,tt+.18,91,.1,"sq",.2,.25)
t=7.5
while t<8.4:note(sfx,t,80+int((t-7.5)*12),.03,"sq",.08,.25);t+=.08
for i,m in enumerate([72,76,79,84]):note(sfx,11.4+i*.09,m,.16,"sq",.25,.25)
note(mus,14.3,57,.6,"tri",.5,r=.5);note(mus,14.3,81,.6,"sq",.12,.25,r=.5)
mix=mus*.4+sfx*.55;mix/=np.max(np.abs(mix))*1.1;fade=np.ones(N);fade[-int(SR*.4):]=np.linspace(1,0,int(SR*.4));mix*=fade
w=wave.open(sys.argv[1],"wb");w.setnchannels(1);w.setsampwidth(2);w.setframerate(SR);w.writeframes((mix*32767).astype(np.int16).tobytes());w.close()
