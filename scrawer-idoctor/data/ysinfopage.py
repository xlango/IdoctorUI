from urllib import  request
from bs4 import BeautifulSoup as bs

from data.ysinfolist import Ysinfolist


class Ysinfopage(object):

    @classmethod
    def get_page(self,url):
        #req = request.Request("https://ysk.99.com.cn/department/neike/")
        req = request.Request(url)
        req.add_header("user-agent",
                       "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36")
        resp = request.urlopen(req)

        html_doc = resp.read().decode("utf-8")

        # print(html_doc)

        soup = bs(html_doc, "html.parser")

        divpage = soup.find("div", {"class", "time-page"})
        # print(divpage)
        spanpage = divpage.find_all("span", {"class", "l_pa"})
        spanweiye = spanpage[len(spanpage) - 1]
        aweiye = spanweiye.find("a").get("href").split("/")[3]

        pagesize = int(aweiye)

        for page in range(1, pagesize):
            Ysinfolist.get_list("https://ysk.99.com.cn/department/all/" + str(page) + "/")
