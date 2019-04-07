from builtins import object, classmethod
from urllib import  request
from bs4 import BeautifulSoup as bs

from data.drug.druginfo import Druginfo


class Drugpage(object):

    @classmethod
    def get_soup(self,url):
        # req = request.Request("https://jbk.99.com.cn/ganmao/")
        req = request.Request(url)
        req.add_header("user-agent",
                       "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36")
        resp = request.urlopen(req)
        html_doc = resp.read().decode("utf8")
        #print(html_doc)
        soup = bs(html_doc, "html.parser")
        return soup

    @classmethod
    def get_list(self, url):
        soup = Drugpage.get_soup(url)

        divlist=soup.find("div", {"class", "medicines_list_bar"})
        h3list=divlist.find_all("h3")
        for ael in h3list:
            Druginfo.get_info("http://www.39yst.com"+ael.find("a").get("href"))


for i in range(0,85):
    Drugpage.get_list("http://www.39yst.com/yaopin/c/list_0_2_2_2_0_2_"+str(i)+".shtml")