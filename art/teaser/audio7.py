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



# title
for i,m in enumerate([60,64,67,72,76]):note(mus,.2+i*.1,m,.16,"sq",.3,.25)
add(sfx,1.0,env(wav("sin",np.linspace(160,50,int(SR*.22)),.22),r=.1),.8)
for i in range(5):note(sfx,1.45+i*.08,96+(i%2)*3,.04,"sq",.12,.25)
sweep(2.35,300,1600,.3,.15,"tri")
b=60/124;bass=[48,55,52,55,53,60,57,60,50,57,53,57,55,62,59,62];mel=[72,76,79,0,77,0,76,74,72,0,69,72,74,0,71,0]
def tune(t,t1,v=1,minor=False,shift=0):
    k=0
    while t<t1:
        sw=b/2;bb=bass[k%16]-(3 if minor and k%4==0 else 0)+shift;note(mus,t,bb,sw*.8,"tri",.5*v,r=.05);m=mel[k%16]
        if m:note(mus,t,m+shift-(1 if minor and m%12==4 else 0),sw*.55,"sq",.12*v,.25,r=.04)
        if k%2==1:add(mus,t,env(wav("noise",0,.015),r=.01),.05*v)
        t+=sw;k+=1
tune(2.6,10.3)
# cast + sign pop
sweep(4.6,1200,300,.3,.12,"tri");add(sfx,4.95,env(wav("sin",np.linspace(700,250,int(SR*.09)),.09),r=.05),.3);note(sfx,4.85,84,.05,"sq",.2)
# bots arriving: robotic blips + counter ticks
t=6.2
while t<9.6:note(sfx,t,100+int(t*53)%4,.02,"sq",.07,.25);t+=.06
for tt in (6.5,7.1,7.7,8.2):add(sfx,tt,env(wav("sq",np.linspace(300,600,int(SR*.08)),.08,.25),r=.03),.12)
# check panel: swoosh + buzzers
tune(10.3,13.2,.7,True)
sweep(10.3,200,900,.25,.15,"tri");note(sfx,10.45,84,.05,"sq",.2)
for tt in (10.9,11.4,11.9):add(sfx,tt,env(wav("sq",110,.22,.5),r=.05),.3);add(sfx,tt,env(wav("sq",116,.22,.5),r=.05),.2)
# sad trombone + bots flee
for i,(m,d) in enumerate([(67,.25),(66,.25),(65,.25),(64,.6)]):add(sfx,12.75+.25*i,env(wav("sq",f(m),d,.4),r=.08),.16)
sweep(13.2,900,200,.9,.12)
t=13.2
while t<14.3:note(sfx,t,95-int((t-13.2)*20),.02,"sq",.06,.25);t+=.05
# menu
for tt in (14.2,14.5,14.8):note(sfx,tt,79,.03,"sq",.15,.25)
note(sfx,15.0,84,.04,"sq",.25,.25);note(sfx,15.05,91,.1,"sq",.25,.25)
# real data: bright tune, card pops, happy fish plops, counter
tune(15.8,24.8,.85,False,5)
for tt in (16.6,17.4,18.2):sweep(tt,400,1200,.12,.12,"tri");note(sfx,tt+.12,88 if tt<18 else 93,.08,"sq",.18,.25)
for tt in (16.6,17.4,18.2,19.0,19.8):add(sfx,tt+.4,env(wav("sin",np.linspace(700,250,int(SR*.09)),.09),r=.05),.25)
t=16.4
while t<21:note(sfx,t,88,.03,"sq",.06,.25);t+=.35
note(sfx,19.0,84,.06,"sq",.25);note(sfx,19.07,91,.15,"sq",.25)
note(sfx,21.8,84,.06,"sq",.3);note(sfx,21.87,91,.12,"sq",.3);note(sfx,22.8,86,.06,"sq",.3);note(sfx,22.87,93,.12,"sq",.3)
D=[(2.8,"I NEED FOLLOWERS. HOW HARD CAN IT BE?",30),(8.3,"5,000 FOLLOWERS?! I'M FAMOUS!",30),(12.75,"...THEY'RE ALL BOTS.",30),(15.8,"NEW BAIT: REAL DATA.",30),(21.0,"NO BOTS. JUST FISH.",30)]
for t0,s,cps in D:
    for i,ch in enumerate(s):
        if ch in " .":continue
        if i%2==0:note(sfx,t0+i/cps,67+(i*5)%4,.045,"tri",.35,r=.02)
for i,m in enumerate([69,72,76,81,76,84]):note(mus,25.1+i*.2,m,.2,"sq",.25,.25)
note(sfx,25.8,83,.08,"sq",.3);note(sfx,25.88,88,.45,"sq",.3,r=.35)
note(mus,26.4,57,1.5,"tri",.5,r=1.0);note(mus,26.4,69,1.5,"sq",.12,.25,r=1.0)
mix=mus*.4+sfx*.55;mix/=np.max(np.abs(mix))*1.1;fade=np.ones(N);fade[-int(SR*.7):]=np.linspace(1,0,int(SR*.7));mix*=fade
w=wave.open(sys.argv[1],"wb");w.setnchannels(1);w.setsampwidth(2);w.setframerate(SR);w.writeframes((mix*32767).astype(np.int16).tobytes());w.close()
