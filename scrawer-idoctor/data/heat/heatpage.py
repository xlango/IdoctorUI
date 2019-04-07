from urllib import  request
from bs4 import BeautifulSoup as bs

from data.heat.heatlist import Heatlist

class Heatpage(object):

    @classmethod
    def get_page(self,url):
        # req = request.Request("https://jf.99.com.cn/reliangbiao/shucailei/")
        req = request.Request(url)
        req.add_header("user-agent",
                       "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36")
        resp = request.urlopen(req)
        html_doc = resp.read().decode("gb2312")
        soup = bs(html_doc, "html.parser")

        pagelist = soup.find("div", {"class", "list_page"}).find("a")
        code = pagelist.get("href").split("-")[0]
        page = pagelist.get("href").split("-")[1].split(".")[0]
        for num in range((int(page) + 1), 0, -1):
            # print(code+"-"+str(num)+".htm")
            Heatlist.get_list(url + code + "-" + str(num) + ".htm")


