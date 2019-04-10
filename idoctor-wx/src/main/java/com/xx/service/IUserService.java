package com.xx.service;

import com.xx.entity.Admin;
import com.xx.entity.User;

public interface IUserService {

    int getAgeByMac(String mac);

    Admin adminLogin(String username , String password);

    boolean adminExsit(String username);

    Admin getByUsername(String username);

    boolean updateAdminPwd(Admin admin ,String newpwd);

    User getByOpenid(String  openid);

    int add(User user);
}
