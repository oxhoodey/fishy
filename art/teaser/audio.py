import numpy as np,wave,sys
SR=44100;T=21.0;N=int(SR*T);mus=np.zeros(N);sfx=np.zeros(N)
def f(m):return 440*2**((m-69)/12)
def wav(kind,fr,d,duty=.5):
    t=np.arange(int(SR*d))/SR;ph=np.cumsum(np.broadcast_to(fr,t.shape)/SR) if np.ndim(fr) else fr*t
    ph=ph%1
    if kind=="sq":return np.where(ph<duty,1.,-1.)
    if kind=="tri":return 4*np.abs(ph-.5)-1
    if kind=="sin":return np.sin(2*np.pi*ph)
    if kind=="noise":return np.random.uniform(-1,1,t.shape)
def env(x,a=.005,r=.05):
    n=len(x);e=np.ones(n);A=min(n,max(1,int(a*SR)));R=min(n,max(1,int(r*SR)));e[:A]=np.linspace(0,1,A);e[-R:]*=np.linspace(1,0,R);return x*e
def add(buf,t0,x,v):i=int(t0*SR);j=min(N,i+len(x));buf[i:j]+=x[:j-i]*v
def note(buf,t0,m,d,kind="sq",v=.5,duty=.5,r=.04):add(buf,t0,env(wav(kind,f(m),d,duty),r=r),v)
# ---- music ----
beat=60/150
mel=[72,76,79,76,81,79,76,74, 72,76,79,84,83,79,81,79]
bas=[48,48,45,45,41,41,43,43]
for i,m in enumerate([60,64,67,72,67,64,60,64,67,72,76,79]):note(mus,.15+i*.16,m,.14,"sq",.35,.25)
t=2.6;k=0
while t<10.5:
    note(mus,t,mel[k%16],beat/2*.9,"sq",.32,.25);
    if k%2==0:note(mus,t,bas[(k//2)%8],beat*.95,"tri",.55)
    if k%4==2:add(mus,t,env(wav("noise",0,.04),r=.03),.12)
    t+=beat/2;k+=1
bb=60/180;bos=[45,45,57,45,43,43,55,43,41,41,53,41,40,40,52,40];t=10.6;k=0
while t<14.9:
    note(mus,t,bos[k%16],bb/2*.9,"tri",.6);note(mus,t,bos[k%16]+24,bb/2*.5,"sq",.12,.125)
    if k%2==0:add(mus,t,env(wav("noise",0,.05),r=.04),.18)
    t+=bb/2;k+=1
for i,(m,d) in enumerate([(72,.12),(76,.12),(79,.12),(84,.5),(79,.12),(81,.12),(83,.12),(84,.8)]):
    note(mus,16.0+sum(x[1] for x in [(72,.12),(76,.12),(79,.12),(84,.5),(79,.12),(81,.12),(83,.12),(84,.8)][:i]),m,d,"sq",.38,.5,r=.08)
for i,m in enumerate([48,52,55,60]):note(mus,16.0+i*.3,m,.3,"tri",.5)
for i,m in enumerate([72,79,76,84,79,88]):note(mus,18.2+i*.22,m,.2,"sq",.25,.25)
note(mus,19.6,84,1.2,"sq",.22,.25,r=.6);note(mus,19.6,48,1.2,"tri",.5,r=.6)
# ---- sfx ----
for i,m in enumerate([72,76,79,84]):note(sfx,2.0+i*.05,m,.06,"sq",.4,.5)
x=wav("noise",0,.35)*np.linspace(1,0,int(SR*.35))**2;add(sfx,2.9,x,.35)
add(sfx,3.68,env(wav("sin",np.linspace(500,140,int(SR*.14)),.14)),.6)
for d in (0,.09):note(sfx,4.55+d,96,.05,"sq",.35)
t=5.2
while t<5.9:add(sfx,t,env(wav("noise",0,.012),r=.008),.35);t+=.045
add(sfx,6.0,env(wav("sq",np.concatenate([np.linspace(900,1600,int(SR*.12)),np.linspace(1600,800,int(SR*.16))]),.28,.3),r=.05),.3)
def thud(t0):add(sfx,t0,env(wav("sin",np.linspace(160,50,int(SR*.2)),.2),r=.1),.9);add(sfx,t0,env(wav("noise",0,.08),r=.06),.35)
for tt in (6.3,9.4,13.0,16.0):thud(tt)
t=8.4
while t<9.25:note(sfx,t,96,.03,"sq",.25);t+=.1
add(sfx,9.2,env(wav("sq",np.linspace(600,1400,int(SR*.15)),.15,.5)),.2)
t=10.6;h=0
while t<12.1:note(sfx,t,81 if h%2==0 else 76,.15,"sq",.28,.5,r=.01);t+=.15;h+=1
x=wav("noise",0,.3)*np.exp(-np.linspace(0,6,int(SR*.3)));add(sfx,12.9,x,.6);add(sfx,12.9,env(wav("sq",np.linspace(140,60,int(SR*.25)),.25,.5)),.35)
for i,(m,d) in enumerate([(67,.35),(66,.35),(65,.35),(64,.9)]):
    t0=13.3+.35*i;fr=f(m)*(1+.03*np.sin(np.arange(int(SR*d))/SR*2*np.pi*6)) if i==3 else f(m);add(sfx,t0,env(wav("sq",fr,d,.4),r=.08),.22)
note(sfx,18.8,83,.08,"sq",.35);note(sfx,18.88,88,.4,"sq",.35,r=.3)
mix=mus*.35+sfx*.55;mix/=max(1e-6,np.max(np.abs(mix)))*1.1
fade=np.ones(N);fade[-int(SR*.6):]=np.linspace(1,0,int(SR*.6));mix*=fade
pcm=(mix*32767).astype(np.int16)
w=wave.open(sys.argv[1],"wb");w.setnchannels(1);w.setsampwidth(2);w.setframerate(SR);w.writeframes(pcm.tobytes());w.close()
