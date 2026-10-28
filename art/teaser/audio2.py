import numpy as np,wave,sys
SR=44100;T=22.5;N=int(SR*T);mus=np.zeros(N);sfx=np.zeros(N)
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
# night intro: soft arpeggio + crickets
for i,m in enumerate([57,64,69,72,69,64,57,64,69,72,76,72]):note(mus,.1+i*.19,m,.3,"tri",.45,r=.2)
for k in range(30):t0=k*.09+(k//6)*.2;add(sfx,t0,env(wav("sq",4200,.02,.5),r=.01),.04)
note(sfx,1.9,88,.06,"sq",.35);note(sfx,1.97,93,.08,"sq",.35)
def sweep(t0,a,b,d,v=.25,kind="sq"):add(sfx,t0,env(wav(kind,np.linspace(a,b,int(SR*d)),d,.5),r=.05),v)
sweep(2.3,1800,200,.45,.22);sweep(10.1,1800,200,.45,.22);sweep(18.5,1800,200,.45,.2)
# battle 1 music (A minor, 160 bpm)
b=60/160;bass=[45,45,52,45,43,43,50,43,41,41,48,41,40,40,47,44];lead=[69,72,76,72,74,72,71,67, 69,72,76,79,77,76,74,71]
t=2.8;k=0
while t<10.4:
    note(mus,t,bass[k%16],b/2*.9,"tri",.55)
    if k%2==0:note(mus,t,lead[(k//2)%16],b*.85,"sq",.18,.25)
    if k%4==2:add(mus,t,env(wav("noise",0,.035),r=.03),.12)
    t+=b/2;k+=1
# boss music (faster, darker)
b2=60/190;bb=[45,45,45,46,45,45,43,44];t=11.0;k=0
while t<17.4:
    note(mus,t,bb[k%8]-12,b2/2*.9,"tri",.65);note(mus,t,bb[k%8]+12,b2/2*.4,"sq",.1,.125)
    if k%2==0:add(mus,t,env(wav("noise",0,.05),r=.04),.2)
    if k%8==0:note(mus,t,57+(k//8)%3,b2*3.5,"sq",.12,.5,r=.2)
    t+=b2/2;k+=1
# text blips
D=[(3.8,"A SKETCHY PEPE SWIMS UP!",42),(6.2,"ROBIN USED LARP SCAN!",42),(7.6,"IT'S A CLONE! SAME TICKER, DIFFERENT FISH.",34),(9.2,"CLONE PEPE WAS EXPOSED! +50 EXP",42),
   (11.5,"THE KRAKEN IS DRAINING THE POOL!",42),(14.3,"ROBIN RANG THE SHARK WATCH BELL!",42),(16.1,"HOLDERS GOT OUT IN TIME!",42),(17.6,"YOU WIN! LOOT: 1X PEACE OF MIND",42)]
for t0,s,cps in D:
    for i,ch in enumerate(s):
        if ch!=" " and i%2==0:note(sfx,t0+i/cps,84+(i%3),.025,"sq",.12,.25,r=.01)
# menu
for tt in (5.6,13.6):note(sfx,tt,88,.04,"sq",.25)
for tt in (6.15,14.15):note(sfx,tt,84,.05,"sq",.3);note(sfx,tt+.06,91,.08,"sq",.3)
# beam + hit + drain + exposed
for k in range(8):sweep(6.4+k*.1,600+k*150,1400+k*150,.08,.12)
add(sfx,7.2,np.random.uniform(-1,1,int(SR*.2))*np.exp(-np.linspace(0,7,int(SR*.2))),.5)
sweep(8.0,900,200,1.0,.15)
for i,m in enumerate([72,76,79,84]):note(sfx,9.25+i*.08,m,.1,"sq",.25)
# boss roar
x=np.random.uniform(-1,1,int(SR*.9))*np.exp(-np.linspace(0,3,int(SR*.9)));add(sfx,10.6,x,.45);add(sfx,10.6,env(wav("sq",np.linspace(110,55,int(SR*.9)),.9,.5),r=.3),.35)
sweep(11.4,400,120,1.5,.12,"tri")
# bell
t=14.25
while t<16.0:
    for fr,v in ((1568,.25),(2093,.15),(3136,.06)):add(sfx,t,wav("sin",fr,.5)*np.exp(-np.linspace(0,8,int(SR*.5))),v)
    t+=.28
sweep(16.0,300,1200,.5,.15,"tri")
# victory fanfare
seq=[(72,.12),(72,.12),(72,.12),(72,.36),(68,.36),(70,.36),(72,.2),(70,.1),(72,.7)];t0=17.55
for m,d in seq:note(mus,t0,m,d*.95,"sq",.32,.5,r=.06);note(mus,t0,m-12,d*.95,"tri",.4);t0+=d
# end jingle + coin
for i,m in enumerate([69,72,76,81,76,84]):note(mus,19.1+i*.2,m,.22,"tri",.4,r=.1)
note(sfx,19.9,83,.08,"sq",.3);note(sfx,19.98,88,.45,"sq",.3,r=.35)
note(mus,20.6,57,1.6,"tri",.45,r=1.0);note(mus,20.6,69,1.6,"sq",.12,.25,r=1.0)
mix=mus*.4+sfx*.55;mix/=np.max(np.abs(mix))*1.1;fade=np.ones(N);fade[-int(SR*.7):]=np.linspace(1,0,int(SR*.7));mix*=fade
w=wave.open(sys.argv[1],"wb");w.setnchannels(1);w.setsampwidth(2);w.setframerate(SR);w.writeframes((mix*32767).astype(np.int16).tobytes());w.close()
