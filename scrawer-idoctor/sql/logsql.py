from entity.doctorlog import Doctorlog
from sql.doctorsql import Doctorsql
from sql.sqlbase import Sqlbase

class Logsql(object):

    #医生爬去日志
    def insert(self,code):
        sql = "INSERT INTO tb_doctor_log(code) \
        		         VALUES ('%s')" % \
              (code)
        sqlbase = Sqlbase()
        sqlbase.execute(sql)

    def exist(self,code):
        sql = "select * from tb_doctor_log where code="+code
        sqlbase = Sqlbase()
        flag=False

        if sqlbase.select(sql)!=0:
            flag=True
        return flag

    #医院爬去日志
    def insert_hos(self,code):
        sql = "INSERT INTO tb_hos_log(code) \
        		         VALUES ('%s')" % \
              (code)
        sqlbase = Sqlbase()
        sqlbase.execute(sql)

    def exist_hos(self,code):
        sql = "select * from tb_hos_log where code="+code
        sqlbase = Sqlbase()
        flag=False

        if sqlbase.select(sql)!=0:
            flag=True
        return flag

if __name__ == '__main__':
    dsql=Doctorsql()
    dlog=Doctorlog()
    dlog.code="11"
    print(dsql.exist(dlog))