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







def crackle(t0,d,v):
    t=t0
    while t<t0+d:add(sfx,t,np.random.uniform(-1,1,int(SR*.012))*np.exp(-np.linspace(0,6,int(SR*.012))),v*(0.5+np.random.rand()));t+=0.03+np.random.rand()*.07
# title: fire whoosh
for i,m in enumerate([57,60,64,69,72]):note(mus,.2+i*.11,m,.18,"sq",.28,.25)
add(sfx,1.3,np.random.uniform(-1,1,int(SR*.6))*np.linspace(0,.6,int(SR*.6)),.3);crackle(1.4,1.0,.12)
sweep(2.35,300,1600,.3,.15,"tri")
b=60/104;bass=[45,52,48,52,43,50,47,50,41,48,45,48,40,47,44,47];mel=[69,0,72,0,71,69,67,0,67,0,71,0,69,67,64,0]
def tune(t,t1,v=1,up=0):
    k=0
    while t<t1:
        sw=b/2;note(mus,t,bass[k%16]+up,sw*.8,"tri",.5*v,r=.06);m=mel[k%16]
        if m:note(mus,t,m+up,sw*.55,"sq",.11*v,.25,r=.05)
        t+=sw;k+=1
tune(2.6,12.6,.8)
# fire lit
add(sfx,7.6,np.random.uniform(-1,1,int(SR*.5))*np.linspace(.8,0,int(SR*.5)),.3);crackle(7.7,4.9,.08)
# cat sneaks, nope
t=8.2
while t<8.8:add(sfx,t,env(wav("sin",np.linspace(500,900,int(SR*.05)),.05),r=.03),.12);t+=.09
for i,ch in enumerate("WAIT! I'LL HOLD IT FOR YOU!"):
    if ch not in " ." and i%2==0:note(sfx,8.8+i/30,76+(i*3)%5,.04,"sq",.12,.5,r=.02)
add(sfx,10.65,env(wav("sq",110,.2,.5),r=.05),.25)
t=10.9
while t<11.8:add(sfx,t,env(wav("sin",np.linspace(500,900,int(SR*.05)),.05),r=.03),.14);t+=.08
# throw + WHOOMPH
sweep(11.6,300,1200,.6,.12,"tri")
add(sfx,12.6,env(wav("sin",np.linspace(160,40,int(SR*.5)),.5),r=.2),1.0);add(sfx,12.6,np.random.uniform(-1,1,int(SR*.9))*np.exp(-np.linspace(0,4,int(SR*.9))),.45);crackle(12.7,11.5,.1)
tune(12.6,24.8,.9,3)
# supply meter ticking down
t=12.8
while t<15.0:note(sfx,t,90-int((t-12.8)*8),.03,"sq",.08,.25);t+=.07
note(sfx,15.05,84,.08,"sq",.25);note(sfx,15.13,91,.15,"sq",.25)
# burn report stamp
sweep(15.6,200,900,.25,.12,"tri");add(sfx,16.6,env(wav("sin",np.linspace(150,50,int(SR*.15)),.15),r=.08),.8)
for i,m in enumerate([72,76,79]):note(sfx,16.75+i*.08,m,.1,"sq",.18,.25)
note(sfx,22.0,84,.06,"sq",.3);note(sfx,22.07,91,.12,"sq",.3)
D=[(6.0,"ALL OF IT...",24),(7.4,"...GOES IN THE FIRE.",30),(10.6,"NOPE.",20),(19.7,"NO DEV BAG. NO DEV DUMP.",30)]
for t0,s,cps in D:
    for i,ch in enumerate(s):
        if ch in " .":continue
        if i%2==0:note(sfx,t0+i/cps,67+(i*5)%4,.045,"tri",.35,r=.02)
for i,ch in enumerate("SO... HOW MUCH OF THE SUPPLY DO YOU KEEP?"):
    if ch not in " ." and i%2==0:note(sfx,2.8+i/30,72+(i*7)%3,.04,"tri",.2,r=.02)
for i,m in enumerate([69,72,76,81,76,84]):note(mus,25.1+i*.2,m,.2,"sq",.25,.25)
note(sfx,25.8,83,.08,"sq",.3);note(sfx,25.88,88,.45,"sq",.3,r=.35);crackle(25.6,2.2,.06)
note(mus,26.4,57,1.5,"tri",.5,r=1.0);note(mus,26.4,69,1.5,"sq",.12,.25,r=1.0)
mix=mus*.4+sfx*.55;mix/=np.max(np.abs(mix))*1.1;fade=np.ones(N);fade[-int(SR*.7):]=np.linspace(1,0,int(SR*.7));mix*=fade
w=wave.open(sys.argv[1],"wb");w.setnchannels(1);w.setsampwidth(2);w.setframerate(SR);w.writeframes((mix*32767).astype(np.int16).tobytes());w.close()
