from sql.sqlbase import Sqlbase


class Addrsql(object):

    def insert(self,addr):
        sql = "INSERT INTO tb_addr(provice,city,area) \
        		         VALUES ('%s','%s','%s')" % \
              (addr.provice,addr.city,addr.area)
        sqlbase = Sqlbase()
        sqlbase.execute(sql)