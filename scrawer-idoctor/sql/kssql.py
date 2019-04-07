from sql.sqlbase import Sqlbase
from entity.keshi import Keshi as ks


class Kssql(object):

    def insert(self,keshi):
        sql = "INSERT INTO tb_keshi(one,two) \
        		         VALUES ('%s', '%s')" % \
              (keshi.one,keshi.two)
        sqlbase = Sqlbase()
        sqlbase.execute(sql)

if __name__ == '__main__':
    ks.one="test1"
    ks.two="test2"
    kssql=Kssql()
    kssql.insert(ks)