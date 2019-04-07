from urllib import  request
from bs4 import BeautifulSoup as bs

from data.ksinfo import Ksinfo

req = request.Request("https://ysk.99.com.cn/department/neike/")
#req = request.Request(url)
req.add_header("user-agent",
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36")
resp = request.urlopen(req)

html_doc = resp.read().decode("utf-8")

# print(html_doc)

soup = bs(html_doc, "html.parser")

yjkslist=soup.find_all("dl",{"class","dpt-text2"})[0].find_all("a")
for el in yjkslist:
    urlks=el.get("href").split("/")[2]
    if urlks=="":
        continue
    url="https://ysk.99.com.cn/department/"+urlks
    Ksinfo.get_info(url)