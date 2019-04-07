import time
from urllib import  request
from bs4 import BeautifulSoup as bs

from data.hospital.hosinfo import Hosinfo
from sql.logsql import Logsql


class Hosinfolist(object):

    @classmethod
    def get_soup(self, url):
        try:
            # req = request.Request("https://yyk.99.com.cn/beijing/")
            req = request.Request(url)
            req.add_header("user-agent",
                           "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36")
            resp = request.urlopen(req)
            html_doc = resp.read().decode("utf-8")
            soup = bs(html_doc, "html.parser")
            return soup
        except:
            print("hospital list url except out!")

    @classmethod
    def get_list(self, url):
        soup = Hosinfolist.get_soup(url)
        divlist= soup.find("div", {"class": "regin-text4"})
        urllist=divlist.find_all("dt")
        for urlel in  urllist:
            aurl=urlel.find("a").get("href")
            hosurl="https://yyk.99.com.cn"+aurl
            code = aurl.split("/")[2]
            print(hosurl)
            logsql = Logsql()
            if logsql.exist_hos(code):
                continue
            else:
                logsql.insert_hos(code)
                Hosinfo.get_info(hosurl)
            time.sleep(5)

Hosinfolist.get_list("https://yyk.99.com.cn/paihang/yy/")