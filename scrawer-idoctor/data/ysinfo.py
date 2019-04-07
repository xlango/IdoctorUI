from urllib import  request
from bs4 import BeautifulSoup as bs
import re

from entity.doctor import Doctor
from sql.doctorsql import Doctorsql


class Ysinfo(object):

    @classmethod
    def get_info(self,url):
        #req = request.Request("https://ysk.99.com.cn/ys/introduction/580026.html")
        req = request.Request(url)
        req.add_header("user-agent",
                       "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36")
        resp = request.urlopen(req)

        html_doc = resp.read().decode("utf-8")

        # print(html_doc)

        soup = bs(html_doc, "html.parser")

        # print(soup.find("a", {"class": "query-cur"}))

        doctor=Doctor()

        dl = soup.find("dl", {"class": "info-nr"})
        dt = dl.find("span")
        name = dt.get_text()
        #print(name)
        doctor.name=name.strip()

        i = dl.find("i")
        zc = i.get_text()
        #print(zc)
        doctor.zc=zc.strip()


        p = dl.find("p")
        hospital = p.get_text().split("--")[0]
        keshi = p.get_text().split("--")[1]
        #print(hospital, keshi)
        doctor.hospital=hospital.strip()
        doctor.ks=keshi.strip()

        divjj = soup.find("div", {"class": "induce-text1"})
        tds = divjj.find_all("td")
        i = 0
        jjtable=[]
        for el in tds:
            if i % 2 != 0:
                #print(el.get_text())
                jjtable.append(el.get_text())
            i += 1
        #print(len(jjtable))
        doctor.jxzc=jjtable[0]
        doctor.xzzc=jjtable[1]
        doctor.xw=jjtable[2]
        doctor.sc=jjtable[3]



        divlxfs = soup.find("div", {"class": "doctor-text2"})
        emlxfs = divlxfs.find_all("em")
        doctorurl=divlxfs.find("a").get_text()
        lxfstable=[]
        for el in emlxfs:
            lxfstable.append(el.get_text())

        #print(len(lxfstable))
        doctor.url=doctorurl
        doctor.tel=lxfstable[0]
        doctor.fax=lxfstable[1]
        doctor.email=lxfstable[2]
        doctor.zipcode=lxfstable[3].strip()
        doctor.addr =lxfstable[4].strip()

        divinduce = soup.find_all("div", {"class": "induce-text2"})
        inducelist=[]

        for pel in divinduce:
            pinduce = pel.find("p").get_text()
            inducelist.append(pinduce)

        #print(len(inducelist))
        doctor.introduction=inducelist[0].strip()
        doctor.honor=inducelist[1].strip()
        doctor.paper=inducelist[2].strip()

        dlphoto=soup.find("dl",{"class": "photo"})
        imgurl=dlphoto.find("img").get("src")
        doctor.imgurl="https:"+imgurl

        doctorsql=Doctorsql()
        doctorsql.insert(doctor)


if __name__ == '__main__':
    try:
        Ysinfo.get_info("https://ysk.99.com.cn/ys/introduction/580026.html")
    except:
        print("页面获取异常")