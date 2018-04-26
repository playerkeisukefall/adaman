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


#font = ImageFont.truetype('/Library/Fonts/Arial Bold.ttf', 48)
#draw.multiline_text((0, 0), 'Pillow sample', fill=(0, 0, 0), font=font)

im.save('pil.png', quality=95)
