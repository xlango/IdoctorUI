from urllib import  request
from bs4 import BeautifulSoup as bs
import re

req=request.Request("https://ysk.99.com.cn/ys/introduction/582396.html")
req.add_header("user-agent","Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36")
resp=request.urlopen(req)

html_doc=resp.read().decode("utf-8")

#print(html_doc)

soup = bs(html_doc, "html.parser")

#print(soup.find("a", {"class": "query-cur"}))

dl=soup.find("dl",{"class": "info-nr"})
dt=dl.find("span")
name=dt.get_text()
print(name)

i=dl.find("i")
job=i.get_text()
print(job)

p=dl.find("p")
hospital=p.get_text().split("--")[0]
keshi=p.get_text().split("--")[1]
print(hospital,keshi)

divjj=soup.find("div",{"class": "induce-text1"})
tds=divjj.find_all("td")
i=0
for el in tds:
    if i%2==0:
        print(el.get_text(), end=' ')
    else:
        print(el.get_text())
    i+=1


divlxfs=soup.find("div",{"class": "doctor-text2"})
lilxfs=divlxfs.find_all("li")
for el in lilxfs:
    print(el.get_text())

divinduce=soup.find_all("div",{"class": "induce-text2"})
for pel in divinduce:
    pinduce = pel.find("p").get_text()
    print(pinduce, "=======================================================================================")


#hrefintroduction=soup.find_all("a",href=re.compile(r"^/ys/introduction/"))
# divmenu=soup.find("div",{"class": "doct-menu"})
# limenu=divmenu.find("a",href=re.compile(r"^/ys/introduction/"))
# hrefintroduction=limenu.get("href")
# print(hrefintroduction)

# req=request.Request("https://ysk.99.com.cn"+hrefintroduction)
# req.add_header("user-agent","Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36")
# resp=request.urlopen(req)
# html_doc=resp.read().decode("utf-8")
# soup = bs(html_doc, "html.parser")
# print(html_doc)