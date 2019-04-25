package com.xx.controller;


import com.xx.entity.KeyWord;
import com.xx.thrid.ltp;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.List;

@Api(value="/thrid", tags="第三方使用接口")
@RestController
@RequestMapping("/thrid")
@CrossOrigin
public class ThridController {


    @ApiOperation(value="关键字提取", notes="关键字提取")
    @GetMapping("/getKeyWords")
    public List<KeyWord> getKeyWords(String keyword) throws IOException {
        return ltp.getKeyWords(keyword);
    }
}
