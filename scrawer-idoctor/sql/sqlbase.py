# -*- coding: UTF-8 -*-

import pymysql    #导入pymysql模块 这里面模块名称可以小写

class Sqlbase(object):

	def __init__(self):
		# 打开数据库连接
		self.db = pymysql.connect("localhost", "root", "123456", "idata")
		# 使用cursor()方法获取操作游标
		self.cursor = self.db.cursor()


	def select(self,sql):
		try:
			# 执行sql语句
			result=self.cursor.execute(sql)
			# 提交到数据库执行
			self.db.commit()
			return result
		except:
			# 如果发生错误则回滚
			self.db.rollback()
		finally:
			# 关闭数据库连接
			self.db.close()

	def execute(self,sql):
		try:
			# 执行sql语句
			result=self.cursor.execute(sql)
			# 提交到数据库执行
			self.db.commit()
		except:
			# 如果发生错误则回滚
			self.db.rollback()

		# 关闭数据库连接
		self.db.close()


if __name__ == '__main__':
	sqlbase=Sqlbase()
	# SQL 插入语句
	sql = """INSERT INTO tb_test(test)
		         VALUES ('xx')"""
	sqlbase.execute(sql)