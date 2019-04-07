from sql.sqlbase import Sqlbase

class Diseasesql(object):

    def insert(self,disease):
        sql = "INSERT INTO tb_disease(name,buwei,keshi,yongyao,question,anwser,binyin,zhengzhuang,jiancha,yufang,zhiliao,jianbie,binfazheng,img) \
        		         VALUES ('%s', '%s','%s', '%s','%s', '%s','%s', '%s','%s', '%s','%s', '%s','%s', '%s')" % \
              (disease.name,disease.buwei,disease.keshi,disease.yongyao,disease.question,
               disease.anwser,disease.binyin,disease.zhengzhuang,disease.jiancha,
               disease.yufang,disease.zhiliao,disease.jianbie,disease.binfazheng,disease.img)
        sqlbase = Sqlbase()
        sqlbase.execute(sql)