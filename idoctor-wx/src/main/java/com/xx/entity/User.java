package com.xx.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class User {

    @JsonIgnore
    int id;
    String nickName;
    int gender;
    String city;
    String province;
    String country;
    String openid; //微信用户openid
    //String username;
    @JsonIgnore
    String password;
    String phone;
    int age;
    String avatarUrl;//微信头像
}
