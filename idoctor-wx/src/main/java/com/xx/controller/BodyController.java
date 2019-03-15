package com.xx.controller;

import com.xx.entity.Body;
import com.xx.service.IBodyService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Api(value="/body", tags="身体部位接口")
@RestController
@RequestMapping("/body")
@CrossOrigin
public class BodyController {

    @Autowired
    private IBodyService bodyService;

    @ApiOperation(value="获取所有身体部位", notes="获取所有身体部位")
    @GetMapping("/all")
    public List<String> all(){
        return bodyService.all();
    }
}
