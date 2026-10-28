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


# title: coin jingle
for i,m in enumerate([60,64,67,72,76]):note(mus,.2+i*.1,m,.16,"sq",.3,.25)
for tt in (.9,1.2,1.5):note(sfx,tt,95,.05,"sq",.15,.25);note(sfx,tt+.05,100,.1,"sq",.15,.25)
add(sfx,1.0,env(wav("sin",np.linspace(160,50,int(SR*.22)),.22),r=.1),.8)
sweep(2.35,300,1600,.3,.15,"tri")
# bouncy music
b=60/126;bass=[48,55,52,55,53,60,57,60,50,57,53,57,55,62,59,62];mel=[72,76,79,0,77,0,76,74,72,0,69,72,74,0,71,0]
def tune(t,t1,v=1,minor=False):
    k=0
    while t<t1:
        sw=b/2;bb=bass[k%16]-(3 if minor and k%4==0 else 0);note(mus,t,bb,sw*.8,"tri",.5*v,r=.05);m=mel[k%16]
        if m:note(mus,t,m-(1 if minor and m%12==4 else 0),sw*.55,"sq",.12*v,.25,r=.04)
        if k%2==1:add(mus,t,env(wav("noise",0,.015),r=.01),.05*v)
        t+=sw;k+=1
tune(2.6,11.0)
# breaking news alert
for i in range(3):note(sfx,2.75+i*.16,84,.1,"sq",.2,.5)
# send: button press, swoosh, cha-ching, frog ribbit
note(sfx,9.4,72,.04,"sq",.25);sweep(9.6,400,1400,.25,.15,"tri")
for m in (88,95):note(sfx,9.95+(m-88)*.01,m,.25,"sq",.18,.25,r=.2)
for tt in (10.0,10.25):add(sfx,tt,env(wav("sq",np.linspace(180,120,int(SR*.12)),.12,.3),r=.05),.25)
# requests: ding-dongs, then a flood
tune(11.0,15.6,.8,True)
for tt in (11.2,12.3,13.4):note(sfx,tt,81,.08,"sq",.25,.25);note(sfx,tt+.09,76,.18,"sq",.25,.25,r=.1)
t=14.4
while t<15.5:note(sfx,t,86+int(t*37)%5,.03,"sq",.12,.25);t+=.045
# menu blips + select
for tt in (15.7,16.0,16.3):note(sfx,tt,79,.03,"sq",.15,.25)
note(sfx,16.7,84,.04,"sq",.25,.25);note(sfx,16.75,91,.1,"sq",.25,.25)
# checking: scan sweep + X buzzers
sweep(17.6,200,900,.3,.12,"tri")
for tt in (18.0,18.6,19.2):add(sfx,tt,env(wav("sq",110,.22,.5),r=.05),.3);add(sfx,tt,env(wav("sq",116,.22,.5),r=.05),.2)
# villains flee
t=20.0
while t<20.9:add(sfx,t,env(wav("sin",np.linspace(500,900,int(SR*.05)),.05),r=.03),.15);t+=.09
sweep(20.0,800,200,.5,.12)
# moral + one good coin
tune(21.0,24.8,.8)
note(sfx,22.45,88,.25,"sq",.18,.25,r=.2);note(sfx,22.47,95,.25,"sq",.18,.25,r=.2)
note(sfx,23.0,84,.06,"sq",.3);note(sfx,23.07,91,.12,"sq",.3)
# Robin's voice blips
D=[(4.3,"SEND MONEY TO ANYONE?! LET'S GO!",30),(6.0,"FIRST: $5 TO LIL FROG FOR BAIT.",30),(21.0,"SENDING IS EASY. UN-SENDING ISN'T.",30)]
for t0,s,cps in D:
    for i,ch in enumerate(s):
        if ch in " .":continue
        if i%2==0:note(sfx,t0+i/cps,67+(i*5)%4,.045,"tri",.35,r=.02)
# end card
for i,m in enumerate([69,72,76,81,76,84]):note(mus,25.1+i*.2,m,.2,"sq",.25,.25)
note(sfx,25.8,83,.08,"sq",.3);note(sfx,25.88,88,.45,"sq",.3,r=.35)
note(mus,26.4,57,1.5,"tri",.5,r=1.0);note(mus,26.4,69,1.5,"sq",.12,.25,r=1.0)
mix=mus*.4+sfx*.55;mix/=np.max(np.abs(mix))*1.1;fade=np.ones(N);fade[-int(SR*.7):]=np.linspace(1,0,int(SR*.7));mix*=fade
w=wave.open(sys.argv[1],"wb");w.setnchannels(1);w.setsampwidth(2);w.setframerate(SR);w.writeframes((mix*32767).astype(np.int16).tobytes());w.close()
