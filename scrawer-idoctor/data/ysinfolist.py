from urllib import  request
from bs4 import BeautifulSoup as bs

from data.ysinfo import Ysinfo
from sql.logsql import Logsql


class Ysinfolist(object):

    @classmethod
    def get_list(self,url):
        #req = request.Request("https://ysk.99.com.cn/department/neike/1/")
        req = request.Request(url)
        req.add_header("user-agent",
                        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36")
        resp = request.urlopen(req)

        html_doc = resp.read().decode("utf-8")

        #print(html_doc)

        soup = bs(html_doc, "html.parser")

        yslist=soup.find("div",{"class": "dpt-cont"})
        ysdllist=yslist.find_all("dl")

        for ys in ysdllist:
            ays=ys.find("a")
            htmlcode=ays.get("href").split("/ys/")[1]
            print(htmlcode)

            codelog=htmlcode.split(".")[0]
            dlogsql=Logsql()
            if dlogsql.exist(codelog):
                #print("当前医生信息已经爬取过了！")
                continue
            else:
                dlogsql.insert(codelog)
                try:
                    Ysinfo.get_info("https://ysk.99.com.cn/ys/introduction/" + htmlcode)
                except:
                    print("页面获取异常")

