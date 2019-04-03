package com.xx.auth;

public interface UserConstantInterface {
    // 请求的网址
    public static final String WX_LOGIN_URL = "https://api.weixin.qq.com/sns/jscode2session";
    // 你的appid
    public static final String WX_LOGIN_APPID = "wx1c16cbfedca1b7e6";
    // 你的密匙
    public static final String WX_LOGIN_SECRET = "f0506efa95d7fbef58d3e6a91f17c976";
    // 固定参数
    public static final String WX_LOGIN_GRANT_TYPE = "authorization_code";

}