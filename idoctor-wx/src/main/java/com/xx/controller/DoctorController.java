package com.xx.controller;

import com.xx.entity.Doctor;
import com.xx.service.IDoctorService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Api(value="/doctor", tags="医生接口")
@RestController
@RequestMapping("/doctor")
@CrossOrigin
public class DoctorController {

    @Autowired
    private IDoctorService doctorService;

    @ApiOperation(value="多条件查询医生", notes="多条件查询医生")
    @PostMapping("/getByIf")
    public List<Doctor> getByIf(int pageNum, int pageSize, Doctor doctor){
        return doctorService.getByIf(pageNum,pageSize,doctor);
    }

    @ApiOperation(value="删除医生", notes="删除医生")
    @PostMapping("/delete")
    public int delete(int[] ids){
        return doctorService.delete(ids);
    }
}
