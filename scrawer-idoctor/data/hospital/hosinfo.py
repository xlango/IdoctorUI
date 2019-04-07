import logging
from urllib import  request
from bs4 import BeautifulSoup as bs
import re

from entity.hospital import Hospital
from sql.hossql import Hossql


class Hosinfo(object):

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
            print("hospital url except out!")

    @classmethod
    def get_info(self,url):
        soup = Hosinfo.get_soup(url)
        hospital=Hospital()

        divHosName = soup.find("div", {"class": "wrap-name"})
        hosName = divHosName.find("h1").get_text()
        spanHosNmae=divHosName.find_all("span")
        isAuth = spanHosNmae[2].get_text()
        level = spanHosNmae[0].get_text()
        manage = spanHosNmae[1].get_text()

        divInfo = soup.find("div", {"class": "wrap-info"})
        img = divInfo.find("dt").find("img").get("src")

        ddinfo = divInfo.find("dd")
        pinfolist = ddinfo.find_all("p")
        if len(pinfolist) == 4:
            alias = pinfolist[0].get_text().split("别名：")[1]
            type = pinfolist[1].get_text().split("性质：")[1]
            tele = pinfolist[2].find("em").get_text()
            addr = pinfolist[3].find("em").get_text()

        divSorce = soup.find("div", {"class": "assess-mn"})
        sorces = divSorce.find("em").get_text().split("(")[1].split(")")[0].split(",")
        sorce = (float(sorces[0]) + float(sorces[1]) + float(sorces[2])) / 3

        info = soup.find("div", {"class": "hospital-info"}).find("p").get_text().split("[查看详细]")[0]
        #print(info)

        mainurl="https://yyk.99.com.cn"+soup.find("li", {"class": "wrap-ncur"}).find("a").get("href")
        soup=Hosinfo.get_soup(mainurl+"jianjie.html")
        table = soup.find("table", {"class": "present-table"})
        tds=table.find_all("td")
        dean=tds[5].get_text()
        year=tds[7].get_text()
        personnum=tds[15].get_text()
        bednum=tds[17].get_text()
        yearoutpnum=tds[19].get_text()
        isinsurance=tds[21].get_text()

        soup=Hosinfo.get_soup(mainurl+"zhuanjia.html")
        keshilist = ""
        try:
            divkslist = soup.find("div", {"class": "hd-top"}).find_all("li")
            for ksel in divkslist:
                keshilist = keshilist + ksel.find("a").get_text() + ","
        except:
            print("no keshi !")


        hospital.hosName=hosName.strip()
        hospital.isAuth=isAuth.strip()
        hospital.level=level.strip()
        hospital.manage=manage.strip()
        hospital.img="https:"+img.strip()
        hospital.tele=tele.strip()
        hospital.addr=addr.strip()
        hospital.alias=alias.strip()
        hospital.type=type.strip()
        hospital.sorce=str(sorce)
        hospital.info=info.strip()
        hospital.dean=dean.strip()
        hospital.year=year.strip()
        hospital.personnum=personnum
        hospital.bednum=bednum
        hospital.yearoutpnum=yearoutpnum
        hospital.isinsurance=isinsurance.strip()
        hospital.keshi=keshilist.strip()

        hossql=Hossql()
        hossql.insert(hospital)
        #print(hospital.hosName,hospital.isAuth,hospital.level,hospital.manage,hospital.img,hospital.tele,hospital.addr,hospital.alias,hospital.type,hospital.sorce,hospital.info,hospital.dean,hospital.year,hospital.personnum,hospital.bednum,hospital.yearoutpnum,hospital.isinsurance,hospital.keshi)



#Hosinfo.get_info("https://yyk.99.com.cn/furong/106099/")



