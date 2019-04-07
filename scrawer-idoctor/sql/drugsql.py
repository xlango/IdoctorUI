from sql.sqlbase import Sqlbase


class Drugsql(object):

    def insert(self,drug):
        sql = "INSERT INTO tb_drug(name,chengfen,zhuzhi,yongliang,buliang,jingji,zhuyi,xianghu,chucang,youxiaoqi,piwen,gongsi,jb,chufang,zhongxi,yibao,changuo,img) \
        		         VALUES ('%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s')" % \
              (drug.name,drug.chengfen,drug.zhuzhi,drug.yongliang,drug.buliang
               ,drug.jingji,drug.zhuyi,drug.xianghu,drug.chucang,drug.youxiaoqi
               ,drug.piwen,drug.gongsi,drug.jb,drug.chufang,drug.zhongxi,drug.yibao,drug.changuo,drug.img)
        sqlbase = Sqlbase()
        sqlbase.execute(sql)