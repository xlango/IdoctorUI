from builtins import object, classmethod
from urllib import  request
from bs4 import BeautifulSoup as bs

from entity.disease import Disease


class Diseaseinfo(object):

    @classmethod
    def get_html(self,url):
        # req = request.Request("https://jbk.99.com.cn/ganmao/")
        req = request.Request(url)
        req.add_header("user-agent",
                       "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36")
        resp = request.urlopen(req)
        html_doc = resp.read().decode("gb18030")
        #print(html_doc)
        soup = bs(html_doc, "html.parser")
        return soup

    @classmethod
    def get_qa(self,soup):
        divqa=soup.find("div", {"class", "d-js-cont"})
        question=divqa.find("a").get_text()
        answer=divqa.find("dd").get_text()
        return question,answer

    @classmethod
    def get_binyin(self,soup):
        binyin=soup.find("div", {"class", "d-js-cont2"}).get_text()
        return binyin

    @classmethod
    def get_zhengzhuang(self,soup):
        zhengzhuang=soup.find("div", {"class", "d-js-cont2"}).get_text()
        return zhengzhuang

    @classmethod
    def get_jiancha(self, soup):
        jiancha = soup.find("div", {"class", "d-js-cont2"}).get_text()
        return jiancha

    @classmethod
    def get_yufang(self, soup):
        yufang = soup.find("div", {"class", "d-js-cont2"}).get_text()
        return yufang

    @classmethod
    def get_zhiliao(self, soup):
        zhiliao = soup.find("div", {"class", "d-js-cont2"}).get_text()
        return zhiliao

    @classmethod
    def get_jianbie(self, soup):
        jianbie = soup.find("div", {"class", "d-js-cont2"}).get_text()
        return jianbie

    @classmethod
    def get_binfazheng(self, soup):
        binfazheng = soup.find("div", {"class", "d-js-cont2"}).get_text()
        return binfazheng

    @classmethod
    def get_info(self,url):
        #soup=Diseaseinfo.get_html("https://jbk.99.com.cn/rxxzxbxbpfb/")
        soup=Diseaseinfo.get_html(url)

        divdis = soup.find(id="disease")

        disinfolist = divdis.find_all("a")
        disurllist = []
        for el in disinfolist:
            disurllist.append("https:" + el.get("href"))

        disease=Disease()

        disease.name=divdis.find("h2").get_text()

        divotherinfo=soup.find(id="d-top")

        disease.img=divotherinfo.find("img").get("src")

        liinfo=divotherinfo.find_all("li")
        liinfolist=[]
        for el in liinfo:
            atexts=el.find_all("a")
            alist=""
            for al in atexts:
                alist+=al.get_text()+" "
            liinfolist.append(alist)

        disease.buwei=liinfolist[0]
        disease.keshi=liinfolist[1]
        disease.yongyao=liinfolist[2]

        disease.question=Diseaseinfo.get_qa(Diseaseinfo.get_html(disurllist[0]))[0]
        disease.anwser=Diseaseinfo.get_qa(Diseaseinfo.get_html(disurllist[0]))[1]
        disease.binyin=Diseaseinfo.get_binyin(Diseaseinfo.get_html(disurllist[1]))
        disease.zhengzhuang=Diseaseinfo.get_zhengzhuang(Diseaseinfo.get_html(disurllist[2]))
        disease.jiancha=Diseaseinfo.get_jiancha(Diseaseinfo.get_html(disurllist[3]))
        disease.yufang=Diseaseinfo.get_yufang(Diseaseinfo.get_html(disurllist[4]))
        disease.zhiliao=Diseaseinfo.get_zhiliao(Diseaseinfo.get_html(disurllist[5]))
        disease.jianbie=Diseaseinfo.get_jianbie(Diseaseinfo.get_html(disurllist[6]))
        disease.binfazheng=Diseaseinfo.get_binfazheng(Diseaseinfo.get_html(disurllist[7]))

        return disease

#print(Diseaseinfo.get_info("https://jbk.99.com.cn/rxxzxbxbpfb/").img)