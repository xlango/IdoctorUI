import string
from urllib import  request
from bs4 import BeautifulSoup as bs

from entity.heat import Heat


class Heatinfo(object):

    @classmethod
    def get_info(self, url):
        # req = request.Request("https://jf.99.com.cn/reliangbiao/shuiguolei/625876.htm")
        req = request.Request(url)
        req.add_header("user-agent",
                       "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36")
        resp = request.urlopen(req)
        html_doc = resp.read().decode("gb2312")
        soup = bs(html_doc, "html.parser")

        # print(html_doc)
        heat=Heat()

        h1 = soup.find("h1")
        title = h1.get_text()
        heat.title=title
        heat.name=title.split("可以")[0]

        daoyu = soup.find("div", {"class", "profile_box"}).find("p").get_text()
        heat.introduction=daoyu

        divinfo = soup.find("div", {"class", "new_cont detail_con"})
        pinfo = divinfo.find_all("p")
        infolist=[]
        for el in pinfo:
            rlflag = "热量：" in el.get_text()
            if (rlflag):
                rl=el.get_text().split("：")[1]
                if  rl==None:
                    heat.rl =""
                else:
                    heat.rl =rl
            typeflag = "分类：" in el.get_text()
            if (typeflag):
                type=el.get_text().split("：")[1]
                if  type==None:
                    heat.type=""
                else:
                    heat.type =type

        return heat

if __name__ == '__main__':
    heatinfo=Heatinfo()
    heat=heatinfo.get_info("https://jf.99.com.cn/reliangbiao/shuiguolei/625876.htm")
    print(heat.name)


