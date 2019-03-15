package com.xx.service.impl;

import com.xx.entity.Admin;
import com.xx.entity.Body;
import com.xx.mapper.UserMapper;
import com.xx.service.IBodyService;
import com.xx.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements IUserService {

    @Autowired
    private UserMapper userMapper;

    @Override
    public int getAgeByMac(String mac) {
        return userMapper.getAgeByMac(mac);
    }

    @Override
    public Admin adminLogin(String username, String password) {
        return userMapper.adminLogin(username,password);
    }

    @Override
    public boolean adminExsit(String username) {
        Admin admin=userMapper.getByUsername(username);
        if (admin==null){
            return false;
        }
        return true;
    }

    @Override
    public Admin getByUsername(String username) {
        return userMapper.getByUsername(username);
    }

    @Override
    public boolean updateAdminPwd(Admin admin ,String newpwd) {
        if (userMapper.updateAdminPwd(admin , newpwd)!=0){
            return true;
        }
        return false;
    }
}
