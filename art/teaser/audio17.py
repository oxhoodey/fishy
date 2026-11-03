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













add(sfx,0.0,env(wav("sin",np.linspace(180,40,int(SR*.35)),.35),r=.15),.8)
for i,m in enumerate([60,64,67,72,76]):note(mus,.1+i*.08,m,.14,"sq",.3,.25)
sweep(2.0,300,1600,.3,.15,"tri")
b=60/124;bass=[48,55,52,55,53,60,57,60,50,57,53,57,55,62,59,62];mel=[72,76,79,0,77,0,76,74,72,0,69,72,74,0,71,0]
t=2.4;k=0
while t<14.6:
    sw=b/2;note(mus,t,bass[k%16],sw*.8,"tri",.5,r=.05);m=mel[k%16]
    if m:note(mus,t,m,sw*.55,"sq",.11,.25,r=.04)
    if k%2==1:add(mus,t,np.random.uniform(-1,1,int(SR*.015))*np.exp(-np.linspace(0,8,int(SR*.015))),.08)
    t+=sw;k+=1
sweep(2.4,300,1200,.25,.12,"tri")
for tt in (3.0,3.5,4.0,4.6):note(sfx,tt,84,.05,"sq",.2,.25);note(sfx,tt+.06,91,.08,"sq",.2,.25)
t=4.8
while t<6.0:note(sfx,t,80+int((t-4.8)*10),.03,"sq",.08,.25);t+=.08
for i,m in enumerate([79,84,88]):note(sfx,6.4+i*.08,m,.12,"tri",.2,r=.1)
for i,ch in enumerate("THE FISH HATCHED. NOW LET'S SEE IT GROW."):
    if ch not in " ." and i%2==0:note(sfx,9.6+i/32,67+(i*5)%4,.045,"tri",.35,r=.02)
note(sfx,10.6,84,.06,"sq",.3);note(sfx,10.67,91,.12,"sq",.3)
for i,m in enumerate([72,76,79,84]):note(sfx,12.0+i*.09,m,.16,"sq",.25,.25)
note(mus,14.3,57,.6,"tri",.5,r=.5);note(mus,14.3,81,.6,"sq",.12,.25,r=.5)
mix=mus*.4+sfx*.55;mix/=np.max(np.abs(mix))*1.1;fade=np.ones(N);fade[-int(SR*.4):]=np.linspace(1,0,int(SR*.4));mix*=fade
w=wave.open(sys.argv[1],"wb");w.setnchannels(1);w.setsampwidth(2);w.setframerate(SR);w.writeframes((mix*32767).astype(np.int16).tobytes());w.close()
