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








for i,m in enumerate([64,67,71,76]):note(mus,.2+i*.1,m,.16,"sq",.28,.25)
for i in range(3):sweep(1.3+i*.25,1200,600,.12,.12,"sq")
add(sfx,1.0,env(wav("sin",np.linspace(160,50,int(SR*.22)),.22),r=.1),.7)
sweep(2.35,300,1600,.3,.15,"tri")
# chill tea music
b=60/92;bass=[48,55,52,55,53,57,55,52];mel=[72,0,76,74,72,0,69,0]
def chill(t,t1,v=1):
    k=0
    while t<t1:
        sw=b/2;note(mus,t,bass[k%8],sw*.8,"tri",.45*v,r=.08);m=mel[k%8]
        if m:note(mus,t,m,sw*.5,"sin",.18*v,r=.08)
        t+=sw;k+=1
chill(2.6,5.4)
# countdown beeps + GO
for tt in (4.4,4.8,5.1):note(sfx,tt,81,.12,"sq",.25,.5)
note(sfx,5.4,93,.3,"sq",.3,.5,r=.2);add(sfx,5.4,env(wav("sin",np.linspace(180,40,int(SR*.3)),.3),r=.1),.8)
# frantic bot music + zips
b2=60/170;fb=[45,45,57,45,46,46,58,46];fm=[81,84,81,88,82,85,82,89]
def frantic(t,t1,v=1):
    k=0
    while t<t1:
        sw=b2/2;note(mus,t,fb[k%8],sw*.7,"sq",.25*v,.5,r=.02);note(mus,t,fm[k%8],sw*.4,"sq",.08*v,.25,r=.02)
        if k%2==0:add(mus,t,np.random.uniform(-1,1,int(SR*.03))*np.exp(-np.linspace(0,8,int(SR*.03))),.2*v)
        t+=sw;k+=1
frantic(6.0,12.5)
for i in range(10):sweep(6.0+i*.07,2400,600,.12,.08,"sq")
t=6.0
while t<7.2:note(sfx,t,96+int(t*31)%5,.02,"sq",.06,.25);t+=.04
# snipe tax stamp + coin clinks
add(sfx,9.6,env(wav("sin",np.linspace(150,50,int(SR*.18)),.18),r=.08),.9);add(sfx,9.65,env(wav("sq",110,.25,.5),r=.05),.3)
t=9.8
while t<12:note(sfx,t,95+int(t*17)%4,.05,"sq",.1,.25);t+=.16
# dump + leave
sweep(12.5,1600,200,.9,.15,"sq")
chill(13.0,16.2,.9)
# holders: warm tune
b3=60/112;hb=[48,55,52,55,53,60,57,60,50,57,53,57,55,62,59,62];hm=[72,76,79,0,77,0,76,74,72,0,69,72,74,0,71,0]
def warm(t,t1,v=1):
    k=0
    while t<t1:
        sw=b3/2;note(mus,t,hb[k%16],sw*.8,"tri",.5*v,r=.05);m=hm[k%16]
        if m:note(mus,t,m,sw*.55,"sq",.12*v,.25,r=.04)
        t+=sw;k+=1
warm(16.2,24.8,.85)
for tt in (17.0,17.8,18.6,19.4,20.2):add(sfx,tt+.8,env(wav("sin",np.linspace(700,250,int(SR*.09)),.09),r=.05),.22)
note(sfx,20.6,84,.06,"sq",.3);note(sfx,20.67,91,.12,"sq",.3)
D=[(2.8,"LAUNCH DAY PLAN: SIT BACK. DRINK TEA.",30),(13.0,"...AND THEY'RE GONE. THAT WAS QUICK.",30),(16.2,"BOTS SNIPE IN SECONDS. HOLDERS STAY.",30)]
for t0,s,cps in D:
    for i,ch in enumerate(s):
        if ch in " .":continue
        if i%2==0:note(sfx,t0+i/cps,67+(i*5)%4,.045,"tri",.35,r=.02)
for i,m in enumerate([69,72,76,81,76,84]):note(mus,25.1+i*.2,m,.2,"sq",.25,.25)
note(sfx,25.8,83,.08,"sq",.3);note(sfx,25.88,88,.45,"sq",.3,r=.35)
note(mus,26.4,57,1.5,"tri",.5,r=1.0);note(mus,26.4,69,1.5,"sq",.12,.25,r=1.0)
mix=mus*.4+sfx*.55;mix/=np.max(np.abs(mix))*1.1;fade=np.ones(N);fade[-int(SR*.7):]=np.linspace(1,0,int(SR*.7));mix*=fade
w=wave.open(sys.argv[1],"wb");w.setnchannels(1);w.setsampwidth(2);w.setframerate(SR);w.writeframes((mix*32767).astype(np.int16).tobytes());w.close()
