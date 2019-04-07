class ObjTest(object):
    hobby='play basketball'

    def __init__(self,name,age,weight):
        self.name=name
        self._age=age
        self.__weight=weight

    @classmethod
    def get_hobby(self):
        return self.hobby

    @property
    def get_weight(self):
        return self.__weight

    def self_intruduce(self):
        print("it's my test")

if __name__=='__main__':
    obj=ObjTest("test",11,80)
    print(dir(obj))
    print(ObjTest.get_hobby())
    print(obj.get_weight)
    obj.self_intruduce()
