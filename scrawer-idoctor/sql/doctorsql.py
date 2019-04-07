from sql.sqlbase import Sqlbase

class Doctorsql(object):

    def insert(self,doctor):
        sql = "INSERT INTO tb_doctor(name,zc,hospital,ks,jxzc,xzzc,xw,sc,introduction,honor,paper,url,tel,fax,zipcode,email,addr,imgurl) \
        		         VALUES ('%s', '%s','%s', '%s','%s', '%s','%s', '%s','%s', '%s','%s', '%s','%s', '%s','%s', '%s','%s','%s')" % \
              (doctor.name,doctor.zc,doctor.hospital,doctor.ks,doctor.jxzc,doctor.xzzc,doctor.xw,doctor.sc,doctor.introduction,doctor.honor,doctor.paper,doctor.url,doctor.tel,doctor.fax,doctor.zipcode,doctor.email,doctor.addr,doctor.imgurl)
        sqlbase = Sqlbase()
        sqlbase.execute(sql)
