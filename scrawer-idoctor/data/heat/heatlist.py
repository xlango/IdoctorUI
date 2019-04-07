from urllib import  request
from bs4 import BeautifulSoup as bs

from data.heat.heatinfo import Heatinfo
from sql.heatsql import Heatsql


class Heatlist(object):

    @classmethod
    def get_list(self,url):
        # req = request.Request("https://jf.99.com.cn/reliangbiao/shucailei/")
        req = request.Request(url)
        req.add_header("user-agent",
                       "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36")
        resp = request.urlopen(req)
        html_doc = resp.read().decode("gb2312")
        soup = bs(html_doc, "html.parser")

        rllist = soup.find("div", {"class", "tables_text"})

        dtlist = rllist.find_all("dt")
        for el in dtlist:
            url = "https:" + el.find("a").get("href")
            try:
                heat = Heatinfo.get_info(url)
                heatsql=Heatsql()
                heatsql.insert(heat)
            except:
                print("异常")

