package com.xx.mapper;

import com.xx.entity.Admin;
import com.xx.entity.Body;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserMapper {

    int getAgeByMac(String mac);

    Admin adminLogin(@Param("username")String username , @Param("password")String password);

    Admin getByUsername(@Param("username")String username);

    int updateAdminPwd(@Param("admin") Admin admin,@Param("newpwd") String newpwd);
}
