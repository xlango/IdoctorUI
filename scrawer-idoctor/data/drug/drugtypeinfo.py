from builtins import object, classmethod
from urllib import  request
from bs4 import BeautifulSoup as bs

from entity.drugtype import DrugType
from sql.drugtypesql import DrugTypesql


class DrugTypeinfo(object):

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
    def get_two(self, url):
        soup=DrugTypeinfo.get_soup(url)
        spanlist=soup.find("div", {"class": "sx_bar"}).find("span")
        atypes=spanlist.find_all("a")
        i=0
        twolist=[]
        for el in atypes:
            if(i!=0):
                twolist.append(el.get_text())
            i=1
        return twolist

    @classmethod
    def get_one(self, url):
        soup=DrugTypeinfo.get_soup(url)
        spanlist=soup.find("div", {"class": "sx_bar"}).find("span")
        atypes=spanlist.find_all("a")
        i=0
        for el in atypes:
            if(i!=0):
                one=el.get_text()
                twourl=el.get("href")
                twolist=DrugTypeinfo.get_two("http://www.39yst.com"+twourl)
                #print(one,twolist)
                for two in twolist:
                    druttype=DrugType()
                    druttype.one=one
                    druttype.two=two
                    druttypesql=DrugTypesql()
                    druttypesql.insert(druttype)
                    print(one,two)
            i=1
#DrugTypeinfo.get_two("http://www.39yst.com/yaopin/c/list_21_2_2_2_0_2_1.shtml")
DrugTypeinfo.get_one("http://www.39yst.com/yaopin/c/list_0_2_2_2_0_2_1.shtml")