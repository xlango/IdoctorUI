from urllib import  request
from bs4 import BeautifulSoup as bs

from data.disease.diseaseinfo import Diseaseinfo
from sql.diseasesql import Diseasesql


class Diseaselist(object):

    @classmethod
    def get_list(self,url):
        # req = request.Request("https://jbk.99.com.cn/keshi/huxineike.html")
        req = request.Request(url)
        req.add_header("user-agent",
                       "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36")
        resp = request.urlopen(req)
        html_doc = resp.read().decode("gb18030")
        # print(html_doc)
        soup = bs(html_doc, "html.parser")

        divdislist = soup.find("div", {"class", "part-cont3"})

        alist = divdislist.find_all("dt")
        for el in alist:
            disease = Diseaseinfo.get_info("https:" + el.find("a").get("href"))
            diseasesql=Diseasesql()
            diseasesql.insert(disease)

i=0
j=0
while(True):
    i=i+1
    try:
        print("第"+str(i)+"页")
        disease=Diseaselist.get_list("https://jbk.99.com.cn/keshi/neike-"+str(i)+".html")
        if disease==None:
            j=j+1
            if j>=3:
                print("now page stop")
                break
    except:
        print("异常抛出")

