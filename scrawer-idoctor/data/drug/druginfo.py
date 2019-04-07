from builtins import object, classmethod
from urllib import  request
from bs4 import BeautifulSoup as bs

from entity.drug import Drug
from sql.drugsql import Drugsql


class Druginfo(object):

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
    def get_info(self, url):
        soup=Druginfo.get_soup(url)

        img=soup.find("div", {"class": "items"}).find("img").get("bimg")
        print(img)
        divtop=soup.find("div", {"class": "detail_right"})
        divdivtop=divtop.find("div")
        labeltoplist=divdivtop.find_all("label")
        toplist=[]
        for el in labeltoplist:
            toplist.append(el.get_text().strip())
        chufang=toplist[0]
        zhongxi=toplist[1]
        yibao=toplist[2]
        changuo=toplist[3]
        print(chufang,zhongxi,yibao,changuo)

        pxgjb=divtop.find("p",{"class": "xgjb"})
        axgjbs=pxgjb.find_all("a")
        jb=""
        for jbel in  axgjbs:
            jb=jb+jbel.get_text().strip()+" "
        print(jb)

        divdetail=soup.find("div",{"class": "detail"})
        pdetail=divdetail.find_all("p")
        name=pdetail[0].get_text().split("通用名称：")[1].strip()
        chengfen=pdetail[1].get_text().strip()
        zhuzhi=pdetail[2].get_text().strip()
        yongliang=pdetail[3].get_text().strip()
        buliang=pdetail[4].get_text().strip()
        jingji=pdetail[5].get_text().strip()
        zhuyi=pdetail[6].get_text().strip()
        xianghu=pdetail[7].get_text().strip()
        chucang=pdetail[8].get_text().strip()
        youxiaoqi=pdetail[9].get_text().strip()
        piwen=pdetail[10].get_text().strip()
        gongsi=pdetail[11].get_text().strip()
        print(name,chengfen,zhuzhi,yongliang,buliang,jingji,zhuyi,xianghu,chucang,youxiaoqi,piwen,gongsi)

        drug=Drug()
        drug.chufang = chufang
        drug.zhongxi = zhongxi
        drug.yibao = yibao
        drug.changuo = changuo
        drug.jb = jb
        drug.name = name
        drug.chengfen = chengfen
        drug.zhuzhi = zhuzhi
        drug.yongliang = yongliang
        drug.buliang = buliang
        drug.jingji = jingji
        drug.zhuyi = zhuyi
        drug.xianghu = xianghu
        drug.chucang = chucang
        drug.youxiaoqi = youxiaoqi
        drug.piwen = piwen
        drug.gongsi = gongsi
        drug.img = img

        drugsql=Drugsql()
        drugsql.insert(drug)


#DrugTypeinfo.get_two("http://www.39yst.com/yaopin/c/list_21_2_2_2_0_2_1.shtml")
#Druginfo.get_info("http://www.39yst.com/yaopin/67445/")