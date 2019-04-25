package com.xx.thrid;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.xx.entity.KeyWord;
import org.apache.commons.codec.binary.Base64;
import org.apache.commons.codec.digest.DigestUtils;




public class ltp {
		// webapi接口地址
	private static final String WEBTTS_URL = "http://ltpapi.xfyun.cn/v1/ke";
	// 应用ID
	private static final String APPID = "5bd0853a";
	// 接口密钥
	private static final String API_KEY = "309aa84c8aa6c1656b1684b0dd688af9";
	// 文本
	private static final String TEXT = "打开页面物联网";
	

	private static final String TYPE = "dependent";
	
	public static void main(String[] args) throws IOException {
		System.out.println(TEXT.length());

		for (int i=0;i<getKeyWords(TEXT).size();i++) {
			System.out.println("itp 接口调用结果：" + getKeyWords(TEXT).get(i).getWord());
		}

	}


	public static List<KeyWord> getKeyWords(String keywords) throws IOException {
		Map<String, String> header = buildHttpHeader();
		String result = HttpUtil.doPost1(WEBTTS_URL, header, "text=" + URLEncoder.encode(keywords, "utf-8"));
		JSONArray jsonArray= JSONObject.parseObject(result).getJSONObject("data").getJSONArray("ke");
		String jsonStr = JSONObject.toJSONString(jsonArray);
		List<KeyWord> keyWords = JSONObject.parseArray(jsonStr,  KeyWord.class);
		return keyWords;
	}
	/**
	 * 组装http请求头
	 */
	private static Map<String, String> buildHttpHeader() throws UnsupportedEncodingException {
		String curTime = System.currentTimeMillis() / 1000L + "";
		String param = "{\"type\":\"" + TYPE +"\"}";
		String paramBase64 = new String(Base64.encodeBase64(param.getBytes("UTF-8")));
		String checkSum = DigestUtils.md5Hex(API_KEY + curTime + paramBase64);
		Map<String, String> header = new HashMap<String, String>();
		header.put("Content-Type", "application/x-www-form-urlencoded; charset=utf-8");
		header.put("X-Param", paramBase64);
		header.put("X-CurTime", curTime);
		header.put("X-CheckSum", checkSum);
		header.put("X-Appid", APPID);
		return header;
	}
}
