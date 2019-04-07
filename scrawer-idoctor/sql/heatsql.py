from entity.heat import Heat
from sql.sqlbase import Sqlbase


class Heatsql(object):

    def insert(self,heat):
        sql = "INSERT INTO tb_heat(name,title,type,introduction,rl) \
        		         VALUES ('%s','%s','%s','%s', '%s')" % \
              (heat.name,heat.title,heat.type,heat.introduction,heat.rl)
        sqlbase = Sqlbase()
        sqlbase.execute(sql)


if __name__ == '__main__':
    heat=Heat()
    heat.rl="test"
    heat.name="test"
    heat.title="test"
    heat.type="test"
    heat.introduction="test"
