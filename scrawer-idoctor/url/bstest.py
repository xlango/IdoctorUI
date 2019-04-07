from bs4 import BeautifulSoup as bs
import re

html_doc = """
<html><head><title>The Dormouse's story</title></head>
<body>
<p class="title"><b>The Dormouse's story</b></p>

<p class="story">Once upon a time there were three little sisters; and their names were
<a href="http://examplescom/elsie" class="sister" id="link1">Elsie</a>,
<a href="http://example.com/lacie" class="sister" id="link2">Lacie</a> and
<a href="http://example.com/tillie" class="sister" id="link3">Tillie</a>;
and they lived at the bottom of a well.</p>

<p class="story">...</p>
"""

soup = bs(html_doc, "html.parser")

#print(soup.prettify())

#print(soup.title.string)

#print(soup.title.parent.name)

#print(soup.p["class"])

#print(soup.a["href"])

#print(soup.find_all("a")[1])

#print(soup.find(id="link3")["href"])

#for link in soup.find_all("a"):
    #print(link.get("href"))

#print(soup.get_text())

#print(soup.find("p", {"class": "title"}))

# for el in soup.find_all(re.compile("^b")):
#     print(el.get_text())

data=soup.find_all("a",href=re.compile(r"^http://example\.com/"))
print(data)