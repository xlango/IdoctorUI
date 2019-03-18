package com.xx.controller;

import com.xx.entity.Hospital;
import com.xx.service.IHospitalService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Api(value="/hospital", tags="医院接口")
@RestController
@RequestMapping("/hospital")
@CrossOrigin
public class HospitalController {

    @Autowired
    private IHospitalService hospitalService;

    @ApiOperation(value="多条件查询医院", notes="多条件查询医院")
    @PostMapping("/getByIf")
    public List<Hospital> getByIf(int pageNum, int pageSize, Hospital hospital){
        return hospitalService.getByIf(pageNum,pageSize,hospital);
    }

    @ApiOperation(value="获取所有医院类型", notes="获取所有医院类型")
    @GetMapping("/allType")
    public List<String> type(){
        return hospitalService.allType();
    }

    @ApiOperation(value="获取所有医院等级", notes="获取所有医院等级")
    @GetMapping("/allLevel")
    public List<String> level(){
        return hospitalService.allLevel();
    }

    @ApiOperation(value="删除医院", notes="删除医院")
    @PostMapping("/delete")
    public int delete(int[] ids){
        return hospitalService.delete(ids);
    }
}
