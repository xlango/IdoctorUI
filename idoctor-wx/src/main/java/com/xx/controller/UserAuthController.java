package com.xx.controller;

import com.alibaba.fastjson.JSONObject;
import com.xx.auth.UserConstantInterface;
import com.xx.entity.User;
import com.xx.service.IUserService;
import com.xx.util.HttpClientUtil;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@Api(value="/auth", tags="用户认证接口")
@RestController
@RequestMapping("/auth")
@CrossOrigin
public class UserAuthController {

    @Autowired
    private IUserService userService;

    @ApiOperation(value="微信授权登录", notes="微信授权登录")
    @PostMapping("/login")
    public User user_login(
            @RequestParam("code") String code,
            @RequestParam("userHead") String userHead,
            @RequestParam("userName") String userName,
            @RequestParam("userGender") int userGender,
            @RequestParam("userCity") String userCity,
            @RequestParam("userProvince") String userProvince
    ){
        // 配置请求参数
        Map<String, String> param = new HashMap<>();
        param.put("appid", UserConstantInterface.WX_LOGIN_APPID);
        param.put("secret", UserConstantInterface.WX_LOGIN_SECRET);
        param.put("js_code", code);
        param.put("grant_type", UserConstantInterface.WX_LOGIN_GRANT_TYPE);
        // 发送请求
        String wxResult = HttpClientUtil.doGet(UserConstantInterface.WX_LOGIN_URL, param);
        JSONObject jsonObject = JSONObject.parseObject(wxResult);
        // 获取参数返回的
        String session_key = jsonObject.get("session_key").toString();
        String open_id = jsonObject.get("openid").toString();
        // 根据返回的user实体类，判断用户是否是新用户，不是的话，更新最新登录时间，是的话，将用户信息存到数据库

        User user = userService.getByOpenid(open_id);
        if(user != null){
            return  user;
        }else{
            User user_insert = new User();
            user_insert.setAvatarUrl(userHead);
            user_insert.setNickName(userName);
            user_insert.setGender(userGender);
            user_insert.setCity(userCity);
            user_insert.setProvince(userProvince);
            user_insert.setOpenid(open_id);
            // 添加到数据库
            int flag = userService.add(user_insert);
            if(flag>0){
                return user_insert;
            }
        }
        // 封装返回小程序
//        Map<String, String> result = new HashMap<>();
//        result.put("session_key", session_key);
//        result.put("open_id", open_id);
        return user;

    }

}