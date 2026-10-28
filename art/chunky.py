import sys;sys.path.insert(0,'.')
from render import render
O="#241527"
BASE=[
".......oooooooo..........",
".....oo11112222oo........",
"....o111222242223o.......",
"...o11owwwo2244223o...oo.",
"..o112owweo22222333o.o33o",
"..o122owweo22224433oo333o",
".opppooooo222224433o3333o",
"oppppPPo22222222333o333o.",
"ommmmmmo22242222333oo33o.",
"oppppPPbbbbbbbbb333o.oo..",
".oPPPbbbbbbbbbbBB3o......",
"..ooBbbbbbbbbBBBoo.......",
"....ooBBBBBBBBoo.........",
"......oooooooo...........",
]
MIN=[
"...oooooo...",
"..o11222oo.o",
".o1owo2232oo",
"opoweo23332o",
"omPoo2233oo.",
"oppbbbbBBo..",
".ooBBBBoo...",
"...oooo.....",
]
LIPS={"p":"#F59AAE","P":"#D86A86","m":"#5C1E2E","w":"#FFFFFF","e":O,"o":O}
PAL={
"bass":{"1":"#A6E07A","2":"#5DB44C","3":"#36924A","4":"#21643F","b":"#F7D2AA","B":"#E6A57D"},
"trout":{"1":"#EEF4FA","2":"#BFD0E0","3":"#8FA4B8","4":"#6F8296","b":"#FFE4EC","B":"#F5B9C8"},
"koi":{"1":"#FFFFFF","2":"#F6F2EC","3":"#D9DEE8","4":"#FF7A1A","b":"#FFFFFF","B":"#E8E2DA"},
"salmon":{"1":"#FFC89A","2":"#FF9A55","3":"#E8673A","4":"#B5452E","b":"#FFE9D0","B":"#F3C9A0"},
"minnow":{"1":"#C8F0E0","2":"#8FD3BD","3":"#5FA894","b":"#EEFAF4","B":"#CDE7DB"},
}
S={}
KOI=[list(r.ljust(25,'.')) for r in BASE]
for (x,y) in [(12,2),(13,2),(11,3),(12,3),(13,3),(16,4),(17,4),(15,5),(16,5),(17,5),(11,7),(12,7),(13,7),(12,8),(18,6),(18,7)]:
    if KOI[y][x] in "234":KOI[y][x]="4"
for y,r in enumerate(KOI):
    for x,ch in enumerate(r):
        if ch=="4" and (x,y) not in [(12,2),(13,2),(11,3),(12,3),(13,3),(16,4),(17,4),(15,5),(16,5),(17,5),(11,7),(12,7),(13,7),(12,8),(18,6),(18,7)]:KOI[y][x]="2"
for n in ["bass","trout","salmon"]:S[n]=dict(rows=[r.ljust(25,'.') for r in BASE],pal={**LIPS,**PAL[n]})
S["koi"]=dict(rows=["".join(r) for r in KOI],pal={**LIPS,**PAL["koi"]})
S["minnow"]=dict(rows=[r.ljust(12,'.') for r in MIN],pal={**LIPS,**PAL["minnow"]})
if __name__=="__main__":render(S,'chunky.png',scale=10,cols=5)
