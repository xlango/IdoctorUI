from sql.sqlbase import Sqlbase


class Hossql(object):

    def insert(self,hospital):
        sql = "INSERT INTO tb_hos(hosName,isAuth,level,manage,img,tele,addr,alias,type,sorce,info,dean,year,personnum,bednum,yearoutpnum,isinsurance,keshi) \
        		         VALUES ('%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s','%s','%s','%s')" % \
              (hospital.hosName,hospital.isAuth,hospital.level,hospital.manage,hospital.img
               ,hospital.tele,hospital.addr,hospital.alias,hospital.type,hospital.sorce
               ,hospital.info,hospital.dean,hospital.year,hospital.personnum,hospital.bednum
               ,hospital.yearoutpnum,hospital.isinsurance,hospital.keshi)
        sqlbase = Sqlbase()
        sqlbase.execute(sql)