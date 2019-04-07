from urllib import  request


req=request.Request("https://www.daquan.com/cyzy/")
req.add_header("user-agent","Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36")
resp=request.urlopen(req)

print(resp.read().decode("utf-8"))

