package com.xx.controller;

import com.xx.service.IKeshiService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Api(value="/keshi", tags="科室接口")
@RestController
@RequestMapping("/keshi")
@Slf4j
@CrossOrigin
public class KeshiController {

    @Autowired
    private IKeshiService keshiService;

    @ApiOperation(value="获取所有医院一级科室", notes="获取所有医院一级科室")
    @GetMapping("/getAllOne")
    public List<String> getAllone(){
        return keshiService.getAllOne();
    }

    @ApiOperation(value="获取所有二级医院科室", notes="获取所有二级医院科室")
    @PostMapping("/getAllTwoByOne")
    public List<String> getAllTwoByOne(String one){
        return keshiService.getAllTwoByOne(one);
    }
}
