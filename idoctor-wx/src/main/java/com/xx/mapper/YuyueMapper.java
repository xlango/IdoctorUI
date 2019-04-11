package com.xx.mapper;

import com.xx.entity.Admin;
import com.xx.entity.User;
import com.xx.entity.Yuyue;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface YuyueMapper {

    int add(@Param("yuyue") Yuyue yuyue);

    List<Yuyue> getByIf(@Param("yuyue") Yuyue yuyue);
}
