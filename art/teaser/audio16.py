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












# egg wobble: rising taps, heartbeat
for i in range(14):note(sfx,.3+i*.19,70+i,.03,"sq",.1+.01*i,.25)
for t0 in (.5,1.3,2.1):add(sfx,t0,env(wav("sin",np.linspace(90,50,int(SR*.12)),.12),r=.06),.6);add(sfx,t0+.18,env(wav("sin",np.linspace(80,45,int(SR*.12)),.12),r=.06),.5)
sweep(2.4,200,2600,.8,.15,"sq")
# HATCH: boom + crack + fanfare
add(sfx,3.2,env(wav("sin",np.linspace(200,40,int(SR*.5)),.5),r=.2),1.0);add(sfx,3.2,np.random.uniform(-1,1,int(SR*.25))*np.exp(-np.linspace(0,5,int(SR*.25))),.5)
for i,m in enumerate([72,76,79,84,88,91]):note(sfx,3.3+i*.08,m,.18,"sq",.25,.25)
for i in range(40):note(sfx,3.4+i*.025,95+(i*7)%9,.02,"sq",.05,.25)
b=60/140;bass=[45,45,57,45,48,48,60,48,43,43,55,43,47,47,59,47];mel=[69,72,76,72,79,76,72,76,67,71,74,71,79,74,71,74]
t=3.8;k=0
while t<14.6:
    sw=b/2;note(mus,t,bass[k%16],sw*.7,"tri",.55,r=.04);note(mus,t,mel[k%16],sw*.45,"sq",.11,.25,r=.03)
    if k%4==0:add(mus,t,env(wav("sin",np.linspace(120,45,int(SR*.12)),.12),r=.06),.6)
    if k%4==2:add(mus,t,np.random.uniform(-1,1,int(SR*.06))*np.exp(-np.linspace(0,6,int(SR*.06))),.25)
    add(mus,t+sw/2,np.random.uniform(-1,1,int(SR*.015))*np.exp(-np.linspace(0,8,int(SR*.015))),.08)
    t+=sw;k+=1
note(sfx,4.5,84,.08,"sq",.3);note(sfx,4.58,91,.15,"sq",.3)
sweep(8.2,300,1300,.25,.12,"tri");note(sfx,8.5,88,.06,"sq",.22);note(sfx,8.56,93,.1,"sq",.22)
for i,m in enumerate([72,76,79,84]):note(sfx,11.6+i*.09,m,.16,"sq",.25,.25)
note(mus,14.4,57,.6,"tri",.5,r=.5);note(mus,14.4,81,.6,"sq",.12,.25,r=.5)
mix=mus*.4+sfx*.55;mix/=np.max(np.abs(mix))*1.1;fade=np.ones(N);fade[-int(SR*.4):]=np.linspace(1,0,int(SR*.4));mix*=fade
w=wave.open(sys.argv[1],"wb");w.setnchannels(1);w.setsampwidth(2);w.setframerate(SR);w.writeframes((mix*32767).astype(np.int16).tobytes());w.close()
