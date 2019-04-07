from urllib import  request
from bs4 import BeautifulSoup as bs

from data.heat.heatinfo import Heatinfo
from data.heat.heatpage import Heatpage

req = request.Request("https://jf.99.com.cn/reliangbiao/shucailei/")
# req = request.Request(url)
req.add_header("user-agent",
               "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36")
resp = request.urlopen(req)
html_doc = resp.read().decode("gb2312")
soup = bs(html_doc, "html.parser")

typelist=soup.find("div", {"class", "list_cation"}).find_all("a")
for el in typelist:
    url=el.get("href")
    try:
        heat=Heatpage.get_page("https:"+url)
    except:
        print("url异常")