package com.xx.controller;

import com.xx.entity.Admin;
import com.xx.service.IUserService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Api(value="/user", tags="用户接口")
@RestController
@RequestMapping("/user")
@CrossOrigin
public class UserController {

    @Autowired
    private IUserService userService;

    @ApiOperation(value="管理员登录验证", notes="管理员登录验证")
    @PostMapping("/admin/login")
    public int adminlogin(String username,String password){
        boolean isExist=userService.adminExsit(username);
        Admin admin=userService.adminLogin(username,password);
        if (isExist){
            if (admin!=null){
                return 0;
            }
            return 1;
        }
        return 2;
    }

    @ApiOperation(value="通过账号查找管理员", notes="通过账号查找管理员")
    @PostMapping("/admin/getByUsername")
    public Admin getByUsername(String username){
        return userService.getByUsername(username);
    }

    @ApiOperation(value="修改管理员密码", notes="修改管理员密码")
    @PostMapping("/admin/updateAdminPwd")
    public boolean updateAdminPwd(Admin admin,String newpwd){
        return userService.updateAdminPwd(admin,newpwd);
    }
}
