from urllib import  request
from bs4 import BeautifulSoup as bs
from entity.keshi import Keshi
from sql.kssql import Kssql


class Ksinfo(object):

    @classmethod
    def get_info(self,url):
        #req = request.Request("https://ysk.99.com.cn/department/neike/")
        req = request.Request(url)
        req.add_header("user-agent",
                       "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36")
        resp = request.urlopen(req)

        html_doc = resp.read().decode("utf-8")

        soup = bs(html_doc, "html.parser")




        yjks = soup.find("a", {"class", "query-cur"})
        print("一级科室: ",yjks.get_text())




        dlejks=soup.find_all("dl", {"class", "dpt-text2"})
        if len(dlejks)==2:
            ejks = dlejks[1]
            ejkslist = ejks.find("dd").find_all("a")
            for el in ejkslist:
                print(el.get_text())
                kssql = Kssql()
                keshi = Keshi()
                keshi.two=el.get_text()
                keshi.one = yjks.get_text()

                kssql.insert(keshi)
        else:
            kssql1 = Kssql()
            keshi1 = Keshi()
            keshi1.two = ""
            keshi1.one = yjks.get_text()
            kssql1.insert(keshi1)



