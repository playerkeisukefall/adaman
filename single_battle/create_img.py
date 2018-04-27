# -*- coding: utf-8 -*-
from PIL import Image, ImageDraw, ImageFont

back = Image.new("RGB", (173, 330), (256, 256, 256))

img = Image.open("pil.png")
print(img.size)
print(img.mode)
print(back.size)
print(back.mode)

back.paste(img, (0,0))
back.show()

back.save('p.png', quality=95)

''' 切り取り
# -*- coding: utf-8 -*-
from PIL import Image, ImageDraw, ImageFont

#back = Image.new("RGB", (90, 90), (256, 256, 256))

img = Image.open("p.jpg")
print(img.size)
print(img.mode)
img_crop = img.crop((20,10,193,175))
img_crop.show()
img_crop.save('pil.png', quality=95)
'''

''' create bullet
# -*- coding: utf-8 -*-
from PIL import Image, ImageDraw, ImageFont

im = Image.new("RGB", (90, 90), (256, 256, 256))

draw = ImageDraw.Draw(im)

x1 = 5
y1 = 5
x2 = 84
y2 = 84

r = 256
g = 0
b = 0
for i in range(8):
    draw.ellipse((x1,y1,x2,y2), fill=(r,g,b))
    x1 += 5
    y1 += 5
    x2 -= 5
    y2 -= 5
    #r += 32
    g += 32
    b += 32

im.save('pil.png', quality=95)
'''

''' create HP bar
# -*- coding: utf-8 -*-
from PIL import Image, ImageDraw, ImageFont

im = Image.new("RGB", (90, 600), (0, 0, 0))
draw = ImageDraw.Draw(im)

x1 = 0
y1 = 0
x2 = 2
y2 = 19

j_max = 30

r = 0
g = 255
b = 0
for i in range(30):
    if(15 <= i):
        r = 255
    if(25 <= i):
        g = 0
        b = 0
    for j in range(j_max):
        draw.rectangle((x1, y1, x2, y2), fill=(r, g, b))
        x1 += 3
        x2 += 3
    x1 = 0
    y1 += 20
    x2 = 2
    y2 += 20
    j_max -= 1
im.save('pil.png', quality=95)
'''
