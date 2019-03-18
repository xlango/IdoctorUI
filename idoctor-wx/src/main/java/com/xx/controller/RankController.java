package com.xx.controller;

import com.xx.entity.DiseaseSearchLog;
import com.xx.entity.Result;
import com.xx.service.IDiseaseSearchLogService;
import com.xx.service.IDiseaseService;
import com.xx.service.IRankService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.spring.web.json.Json;

import java.util.Date;
import java.util.List;
import java.util.Map;

@Api(value="/rank", tags="统计排行接口")
@RestController
@RequestMapping("/rank")
@CrossOrigin
public class RankController {

    @Autowired
    private IDiseaseSearchLogService diseaseSearchLogService;

    @Autowired
    private IRankService rankService;

    @ApiOperation(value="保存疾病搜索日志", notes="保存疾病搜索日志")
    @PostMapping("/disease/log/save")
    public void  saveDiseaseLog(DiseaseSearchLog diseaseSearchLog){
        diseaseSearchLog.setTime(new Date());
        diseaseSearchLogService.save(diseaseSearchLog);
    }

    @ApiOperation(value="根据等级统计医院等级各数量", notes="根据等级统计医院等级各数量")
        @GetMapping("/level")
        public List<Result> level(){
        return rankService.level();
    }
}
