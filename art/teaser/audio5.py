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

# title: sizzle + jingle
add(sfx,.9,np.random.uniform(-1,1,int(SR*1.4))*np.linspace(.6,0,int(SR*1.4))*.5,.25)
for i,m in enumerate([60,64,67,72,76]):note(mus,.2+i*.1,m,.16,"sq",.3,.25)
add(sfx,1.0,env(wav("sin",np.linspace(160,50,int(SR*.22)),.22),r=.1),.8)
sweep(2.35,300,1600,.3,.15,"tri")
# smooth "chef" music 2.6-17.5: swing-y bass + plucks
b=60/112;bass=[48,52,55,57,53,57,60,57,50,53,57,59,55,59,62,59];mel=[76,0,74,72,0,69,72,0,74,0,72,69,67,0,64,0]
def chef(t,t1,v=1):
    k=0
    while t<t1:
        sw=(b/2)*(1.15 if k%2==0 else .85);note(mus,t,bass[k%16],sw*.8,"tri",.5*v,r=.06);m=mel[k%16]
        if m:note(mus,t,m,sw*.6,"sq",.12*v,.25,r=.05)
        if k%2==1:add(mus,t,env(wav("noise",0,.018),r=.012),.05*v)
        t+=sw;k+=1
chef(2.6,17.4)
# stove sizzle under the cooking part
add(sfx,2.6,np.random.uniform(-1,1,int(SR*14.4))*(.5+.5*np.sin(np.linspace(0,60,int(SR*14.4))))*.035,1)
# tweets: notification pops + like counter ticks
for tt in (2.9,12.9):note(sfx,tt,88,.06,"sq",.22,.25);note(sfx,tt+.06,93,.1,"sq",.22,.25)
for i in range(10):note(sfx,3.2+i*.25,100+(i%3),.02,"sq",.06,.25)
# panel: swoosh + red X buzzers + coin clinks while cooking
sweep(8.0,200,900,.25,.15,"tri")
for tt in (9.8,10.6):add(sfx,tt,env(wav("sq",110,.22,.5),r=.05),.3);add(sfx,tt,env(wav("sq",116,.22,.5),r=.05),.2)
t=8.2
while t<16.6:note(sfx,t,95+int((t*7)%3),.05,"sq",.08,.25);t+=1/1.6/3*3
sweep(8.4,900,300,8.0,.04,"tri")
# lid CLANG, empty pot
for fr,v in ((1200,.3),(1650,.2),(2400,.1)):add(sfx,16.6,wav("sq",fr,.4,.5)*np.exp(-np.linspace(0,9,int(SR*.4))),v)
# cat runs away
t=17.6
while t<18.5:add(sfx,t,env(wav("sin",np.linspace(500,900,int(SR*.05)),.05),r=.03),.15);t+=.09
# record scratch + reveal
add(sfx,17.85,np.random.uniform(-1,1,int(SR*.25))*np.linspace(1,0,int(SR*.25)),.35);sweep(17.85,900,120,.25,.2)
t=17.95
while t<19.2:note(mus,t,45,.35,"tri",.35,r=.1);t+=.6
add(sfx,19.3,env(wav("sin",np.linspace(140,40,int(SR*.5)),.5),r=.2),.9);noiseb(19.3,.3,.4,4)
add(sfx,19.9,env(wav("sin",np.linspace(160,50,int(SR*.22)),.22),r=.1),.9);noiseb(19.9,.08,.35)
for i,(m,d) in enumerate([(67,.3),(66,.3),(65,.3),(64,.8)]):add(sfx,20.1+.3*i,env(wav("sq",f(m),d,.4),r=.08),.18)
# outro music + CTA pop
chef(21.0,24.8,.8)
note(sfx,22.4,84,.06,"sq",.3);note(sfx,22.47,91,.12,"sq",.3)
# voices (Robin)
D=[(6.1,"COOKING WHAT, EXACTLY?",24),(15.1,"...THE POOL IS ALMOST EMPTY.",26),(16.7,"WAIT. WHERE'S THE LIQUIDITY?",30),(21.0,"WATCH THE POOL, NOT THE TWEETS.",30)]
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
