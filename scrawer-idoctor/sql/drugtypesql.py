from sql.sqlbase import Sqlbase


class DrugTypesql(object):

    def insert(self,drugtype):
        sql = "INSERT INTO tb_drug_type(one,two) \
        		         VALUES ('%s', '%s')" % \
              (drugtype.one,drugtype.two)
        sqlbase = Sqlbase()
        sqlbase.execute(sql)