from urllib import  request
from bs4 import BeautifulSoup as bs

from data.disease.diseaselist import Diseaselist

req = request.Request("https://jbk.99.com.cn/keshi/neike.html")
# req = request.Request(url)
req.add_header("user-agent",
               "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36")
resp = request.urlopen(req)
html_doc = resp.read().decode("gb18030")
# print(html_doc)
soup = bs(html_doc, "html.parser")


ksflist = soup.find(id="ksfl")

aksflist=ksflist.find_all("a")
# lilist=ksflist.find_all("li")
# for liel in lilist:
#     print(liel.find_all("a")[1:])


for el in aksflist:
    #print("https:"+el.get("href"))
    url="https:"+el.get("href")
    urlname=url.split("/")[4].split(".")[0]
    print(urlname)

    i = 0
    j = 0
    while (True):
        i = i + 1
        try:
            print("第" + str(i) + "页")
            disease = Diseaselist.get_list("https://jbk.99.com.cn/keshi/" + urlname + "-" + str(i) + ".html")
            if disease == None:
                j = j + 1
                if j >= 10:
                    print("now page stop")
                    break
        except:
            print("异常抛出")