from urllib.request import urlopen
from urllib.request import Request
from urllib import parse


req=Request("https://www.daquan.com/plus/search.php")

postData=parse.urlencode([
    ("kwtype", "0"),
    ("q", "肾亏")
])

req.add_header("user-agent","Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36")

resp=urlopen(req,data=postData.encode("utf-8"))

print(resp.read().decode("utf-8"))
