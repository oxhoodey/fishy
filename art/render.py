import json,sys
from PIL import Image,ImageDraw
def hx(h):h=h.lstrip('#');return tuple(int(h[i:i+2],16) for i in (0,2,4))
def render(sprites,out,scale=8,cols=4):
    items=list(sprites.items());cw=max(len(v['rows'][0]) for _,v in items)*scale+16;ch=max(len(v['rows']) for _,v in items)*scale+30
    rows=(len(items)+cols-1)//cols;im=Image.new('RGB',(cw*cols,ch*rows),(120,170,210));d=ImageDraw.Draw(im)
    for i,(n,v) in enumerate(items):
        ox=(i%cols)*cw+8;oy=(i//cols)*ch+22;d.text((ox,oy-16),n,fill=(0,0,0))
        for y,row in enumerate(v['rows']):
            for x,c in enumerate(row):
                if c in '. ':continue
                col=v['pal'].get(c)
                if col is None: print('missing',n,repr(c));continue
                d.rectangle([ox+x*scale,oy+y*scale,ox+x*scale+scale-1,oy+y*scale+scale-1],fill=hx(col))
    im.save(out)
