#!/usr/bin/env python3
"""Generate the white, two-page PDF resume from the portfolio's registered original images.
Usage: python3 tools/generate_resume.py _site
Dependencies: reportlab, Pillow. All nine original figures must exist in the supplied site.
"""
from pathlib import Path
import io, json, sys
from xml.sax.saxutils import escape
from PIL import Image, ImageOps
from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor, white
from reportlab.lib.pagesizes import letter
from reportlab.lib.utils import ImageReader
from reportlab.platypus import Paragraph
from reportlab.lib.styles import ParagraphStyle
from reportlab.pdfbase.pdfmetrics import stringWidth

W,H=letter
M=36
WIDTH=W-2*M
NAVY='#1A2845'; MUTED='#526376'; LINE='#CBD6DF'; PAPER='#F4F7FA'
COLORS={'school':'#185F91','work':'#9C4325','personal':'#50643A'}
TINT={'school':'#EDF4F8','work':'#FCF2EC','personal':'#F2F5ED'}
PALETTE=['#2878B1','#378AA8','#687E47','#DCAE34','#DC814C','#B65128']
SITE='https://mjscarpello.github.io/Portfolio-Repository/'
LINKEDIN='https://www.linkedin.com/in/matthewscarpello/'
GITHUB='https://github.com/mjscarpello'
EMAIL='matthewscarpello@gmail.com'
# Concise contribution statements based on the About page and current project registry.
CARDS=[
 ('noaa','NOAA Storm Damage','Data scientist','Compared logistic regression and Random Forest for documented storm damage.','Python / scikit-learn'),
 ('ercot','ERCOT Electricity Demand','Visualizer & presenter','Explored forecast errors and the hybrid experiment; created an educational video.','Time series / visualization'),
 ('capstone-three','NYC Dry Recycling','Data wrangler','Reconciled collection and neighborhood data across 59 community districts.','Python / validation'),
 ('amazon-pick','Amazon Package Pick-Time','Researcher & visualizer','Used delivery observations to motivate simulations of package search times.','R / ggplot2'),
 ('amazon-clothing','Driver Gear Performance Lab','Model & app developer','Built a Streamlit prototype for weather-informed clothing recommendations.','Random Forest / Streamlit'),
 ('unmc','UNMC Learning Media','E-learning intern','Created educational animations and interactive learning media for health sciences.','Vyond / Articulate 360'),
 ('lab-rat','Lab Rat Revolt','E-learning development','Developed a medical terminology game with assessment and game-state logic.','Storyline / JavaScript'),
 ('studio-s','Studio S','Designer & developer','Developing a code-driven presentation editor with synchronized media and cues.','Electron / JavaScript'),
 ('mini-bookmaker','Mini Bookmaker','Developer & maker','Built a Swift PDF imposition tool for printable, ring-bound miniature books.','Swift / PDFKit'),
]

class Resume:
    def __init__(self,root):
        self.root=Path(root).resolve()
        raw=(self.root/'portfolio-data.js').read_text(encoding='utf-8')
        data=json.loads(raw[raw.index('{'):raw.rindex('}')+1])
        self.projects={p['id']:p for p in data['projects']}
        self.images={}
        for pid,*_ in CARDS:
            p=self.projects[pid]
            src=(self.root/p['figures'][0]['src']).resolve()
            if not src.is_relative_to(self.root) or not src.is_file():
                raise ValueError('Missing original image: '+str(src))
            with Image.open(src) as image:
                image=ImageOps.exif_transpose(image).convert('RGBA')
                bg=Image.new('RGBA',image.size,'white'); bg.alpha_composite(image)
                image=bg.convert('RGB'); image.thumbnail((850,600),Image.Resampling.LANCZOS)
                buffer=io.BytesIO(); image.save(buffer,format='JPEG',quality=91,optimize=True)
                self.images[pid]=(buffer.getvalue(),image.size)
        dest=self.root/'downloads'/'matthew-scarpello-resume.pdf'
        dest.parent.mkdir(parents=True,exist_ok=True)
        self.dest=dest
        self.c=canvas.Canvas(str(dest),pagesize=letter,pageCompression=1)
        self.c.setTitle('Matthew Scarpello | Resume & Project Portfolio')
        self.c.setAuthor('Matthew Scarpello')
        self.c.setSubject('Professional experience, education, technical skills and selected portfolio projects')
    def fill(self,color): self.c.setFillColor(HexColor(color))
    def rect(self,x,top,w,h,fill=None,stroke=None,width=.65):
        assert x>=0 and top>=0 and x+w<=W+.01 and top+h<=H+.01,(x,top,w,h)
        if fill:self.fill(fill)
        if stroke:self.c.setStrokeColor(HexColor(stroke));self.c.setLineWidth(width)
        self.c.rect(x,H-top-h,w,h,fill=int(bool(fill)),stroke=int(bool(stroke)))
    def line(self,x,top,x2,color=LINE,width=.65):
        self.c.setStrokeColor(HexColor(color)); self.c.setLineWidth(width); self.c.line(x,H-top,x2,H-top)
    def txt(self,x,top,t,size=10,color=NAVY,bold=False,limit=None):
        font='Helvetica-Bold' if bold else 'Helvetica'
        tw=stringWidth(t,font,size)
        if limit is not None: assert tw<=limit+.1,(t,tw,limit)
        assert x+tw<=W+.01 and top+size<=H,(x,top,t)
        self.fill(color); self.c.setFont(font,size); self.c.drawString(x,H-top-size,t)
        return tw
    def para(self,x,top,t,w,size=10,leading=14,color=MUTED,bold=False,maxh=None):
        style=ParagraphStyle('r',fontName='Helvetica-Bold' if bold else 'Helvetica',fontSize=size,leading=leading,textColor=HexColor(color),spaceAfter=0,splitLongWords=0)
        p=Paragraph(escape(t),style); _,h=p.wrap(w,H)
        if maxh is not None: assert h<=maxh+.1,(t,h,maxh)
        assert top+h<=H,(t,top,h)
        p.drawOn(self.c,x,H-top-h); return top+h
    def label(self,x,top,t,col=COLORS['school']):
        self.txt(x,top,t,9,col,True)
    def link(self,x,top,label,url,size=9.5,color=COLORS['school'],bold=False):
        tw=self.txt(x,top,label,size,color,bold)
        self.c.linkURL(url,(x,H-top-size-2,x+tw,H-top+3),relative=0,thickness=0)
        return tw
    def image(self,pid,x,top,w,h):
        # Contain, never crop, original charts, application screens or photographs.
        raw,(iw,ih)=self.images[pid]; scale=min(w/iw,h/ih)
        dw,dh=iw*scale,ih*scale
        self.c.drawImage(ImageReader(io.BytesIO(raw)),x+(w-dw)/2,H-top-(h+dh)/2,dw,dh,mask='auto')
    def stripe(self,top=27):
        widths=[.22,.18,.16,.16,.15,.13];x=M
        for weight,col in zip(widths,PALETTE):
            self.rect(x,top,WIDTH*weight,3,col); x+=WIDTH*weight
    def footer(self,n,label):
        self.line(M,748,W-M)
        self.txt(M,758,label,8,MUTED,True)
        self.link(249,758,'mjscarpello.github.io/Portfolio-Repository',SITE,8)
        self.txt(W-M-31,758,f'0{n} / 02',8,MUTED,True)
    def job(self,top,title,org,years,description,pid=None):
        x=M;w=310
        self.txt(x,top,title,12,NAVY,True,limit=w)
        self.txt(x,top+18,org,10,MUTED,limit=w)
        self.txt(x,top+32,years,9,COLORS['work'],True)
        bottom=self.para(x,top+49,description,w,10.5,14,maxh=42)
        if pid:
            self.link(x,bottom+5,'See related portfolio work >',SITE+self.projects[pid]['page'],9,COLORS['school'],True)
            bottom+=17
        self.line(x,bottom+10,x+w)
        return bottom+16
    def page1(self):
        self.stripe(); self.label(M,43,'DATA SCIENCE / CREATIVE TECHNOLOGY')
        self.txt(M,61,'Matthew Scarpello',32,NAVY,True,limit=WIDTH)
        self.txt(M,104,'Data science  |  Software  |  Visual storytelling',13,MUTED)
        self.link(M,129,EMAIL,'mailto:'+EMAIL,10)
        self.link(267,129,'linkedin.com/in/matthewscarpello',LINKEDIN,10)
        self.link(M,146,'mjscarpello.github.io/Portfolio-Repository',SITE,10)
        self.link(340,146,'github.com/mjscarpello',GITHUB,10)
        self.para(M,169,'Data science degree candidate with experience in operational workflows, health-science learning media and independent software development. I turn practical questions into documented, evidence-linked projects.',WIDTH,11,15,maxh=30)
        self.line(M,210,W-M)
        self.label(M,224,'PROFESSIONAL EXPERIENCE',COLORS['work'])
        top=243
        top=self.job(top,'Delivery Driver','Amazon DSP | Omaha, Nebraska','2025-Present','Manage time-sensitive deliveries and changing route conditions. Firsthand package-search observations motivated an operational simulation project.','amazon-pick')
        top=self.job(top,'Digital Assistant Intern | E-Learning','University of Nebraska Medical Center','2023-2025','Developed instructional animations and interactive learning media. Supported educational workflows through visual communication, feedback and collaboration.','unmc')
        top=self.job(top,'Certified Nursing Assistant','Papillion Manor | Papillion, Nebraska','2022-2023','Provided direct patient care and communicated with patients and care teams in a busy healthcare setting.')
        assert top<=590,top
        x=363;w=213
        self.rect(x,222,w,356,TINT['school'],LINE)
        sx=x+13;sw=w-26
        self.label(sx,235,'EDUCATION')
        self.txt(sx,255,'B.S. Data Science',13,NAVY,True,limit=sw)
        self.para(sx,273,'Bellevue University | Degree candidate, expected 2026',sw,10,13,maxh=26)
        self.para(sx,306,'Previous neuroscience coursework, University of Nebraska Omaha.',sw,10,13,maxh=26)
        self.line(sx,342,x+w-13)
        self.label(sx,354,'TECHNICAL SKILLS')
        for top,name,body in [(373,'Data preparation','Python, pandas, wrangling, validation'),(419,'Predictive modeling','scikit-learn, classification, time series'),(465,'Visualization & learning','R, ggplot2, Vyond, Articulate 360'),(511,'Software development','Swift, SwiftUI, PDFKit, JavaScript, HTML/CSS, Streamlit')]:
            self.txt(sx,top,name,10.5,NAVY,True,limit=sw)
            self.para(sx,top+15,body,sw,9.6,12.5,maxh=37.5)
        self.label(M,596,'CAPSTONE / THREE ROLES, ONE ANALYTICAL WORKFLOW')
        gap=10;cw=(WIDTH-2*gap)/3
        for i,(pid,title,role) in enumerate([('noaa','NOAA storm damage','Data scientist'),('ercot','ERCOT forecasting','Visualizer & presenter'),('capstone-three','NYC recycling','Data wrangler')]):
            cx=M+i*(cw+gap)
            self.rect(cx,614,cw,118,'#FFFFFF',LINE)
            self.rect(cx,614,cw,3,COLORS['school'])
            self.image(pid,cx+7,622,cw-14,67)
            self.txt(cx+9,695,title,11,NAVY,True,limit=cw-18)
            self.txt(cx+9,711,role,9,COLORS['school'],limit=cw-18)
            self.c.linkURL(SITE+self.projects[pid]['page'],(cx,H-732,cx+cw,H-614),relative=0,thickness=0)
        self.footer(1,'01 / PROFESSIONAL BACKGROUND')
        self.c.showPage()
    def page2(self):
        self.stripe(); self.label(M,43,'SELECTED PROJECTS / ORIGINAL WORK')
        self.txt(M,61,'Project portfolio',28,NAVY,True)
        self.para(M,99,'Nine projects across academic research, professional learning media and independent software.',WIDTH,10.5,14,maxh=14)
        x=M
        for name in ['school','work','personal']:
            self.rect(x,124,5,9,COLORS[name]); self.txt(x+10,122,name.upper(),9,COLORS[name],True); x+=102
        gap=10; cw=(WIDTH-2*gap)/3; ch=190; first=145
        for i,(pid,title,role,desc,skills) in enumerate(CARDS):
            p=self.projects[pid]; cat=p['category']; col=COLORS[cat]; x=M+(i%3)*(cw+gap); top=first+(i//3)*(ch+9); inner=cw-18
            self.rect(x,top,cw,ch,'#FFFFFF',LINE)
            self.rect(x,top,cw,3,col)
            self.rect(x+6,top+8,cw-12,71,PAPER)
            self.image(pid,x+7,top+9,cw-14,69)
            self.txt(x+9,top+85,cat.upper(),8,col,True)
            t=self.para(x+9,top+97,title,inner,11.2,12.6,NAVY,True,maxh=25.2)
            t=self.para(x+9,t+3,role,inner,8.8,10.5,col,True,maxh=21)
            t=self.para(x+9,t+3,desc,inner,9.1,11.2,MUTED,maxh=44.8)
            assert t<=top+174,(pid,t,top+174)
            self.txt(x+9,top+176,skills,8.1,col,True,limit=inner)
            self.c.linkURL(SITE+p['page'],(x,H-top-ch,x+cw,H-top),relative=0,thickness=0)
        self.footer(2,'02 / PROJECT EVIDENCE')
        self.c.showPage()
    def generate(self):
        self.page1();self.page2();self.c.save()
        assert self.dest.is_file() and self.dest.stat().st_size>15000
        print(f'Generated two-page US Letter PDF with nine original project images: {self.dest} ({self.dest.stat().st_size:,} bytes)')

if __name__=='__main__':
    Resume(sys.argv[1] if len(sys.argv)>1 else '.').generate()
