import logging
from urllib import  request
from bs4 import BeautifulSoup as bs
import re

from data.hospital.hosinfo import Hosinfo
from entity.addr import Addr
from sql.addrsql import Addrsql
from sql.logsql import Logsql


class Addrinfo(object):

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
            logging.info("addr url except out!")

    # 区、县
    @classmethod
    def get_area(self, url):
        try:
            soup = Addrinfo.get_soup(url)
            acity = soup.find_all("a", {"class": "tipnav"})
            citylist = []
            for el in acity:
                citylist.append(el.get_text())
            return citylist
        except:
            logging.info("area except out!")


    # 省、市
    @classmethod
    def get_province_city(self, url):
        soup=Addrinfo.get_soup(url)
        divprovice=soup.find_all("div", {"class": "m-clump"})[0]
        dlprovice=divprovice.find_all("dl", {"class": "clump-row"})
        for el in dlprovice:
            dtprovice =el.find("dt").get_text()

            ddcity=el.find("dd")
            acity=ddcity.find_all("a")
            for ela in acity:
                city=ela.get_text()
                cityurl=ela.get("href")
                arealist=Addrinfo.get_area("https://yyk.99.com.cn"+cityurl)
                if arealist!=None:
                    for area in arealist:
                        addr = Addr()
                        addr.provice = dtprovice
                        addr.city = city
                        addr.area = area
                        addrsql=Addrsql()
                        addrsql.insert(addr)
                        logging.info("insert addr",dtprovice, city, area)

    # 区、县
    @classmethod
    def get_hos_url(self, url):
        soup = Addrinfo.get_soup(url)
        divprovice = soup.find_all("div", {"class": "m-clump"})[0]
        dlprovice = divprovice.find_all("dl", {"class": "clump-row"})
        for el in dlprovice:
            dtprovice = el.find("dt").get_text()
            ddcity = el.find("dd")
            acity = ddcity.find_all("a")
            for ela in acity:
                try:
                    city = ela.get_text()
                    cityurl = ela.get("href")
                    soup = Addrinfo.get_soup("https://yyk.99.com.cn" + cityurl)
                    hoslist = soup.find_all("td")
                    for tdhos in hoslist:
                        ahos = tdhos.find("a")
                        hosurl = "https://yyk.99.com.cn" + ahos.get("href")
                        code = hosurl.split("/")[4]
                        logsql = Logsql()
                        if logsql.exist_hos(code):
                            print("ignor" + code)
                            continue
                        else:
                            print(code)
                            logsql.insert_hos(code)
                            Hosinfo.get_info(hosurl)
                except:
                    continue




#print(Addrinfo.get_province_city("https://yyk.99.com.cn/city.html"))

Addrinfo.get_hos_url("https://yyk.99.com.cn/city.html")




