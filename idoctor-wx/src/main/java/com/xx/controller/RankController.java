package com.xx.controller;

import com.xx.entity.DiseaseSearchLog;
import com.xx.service.IDiseaseSearchLogService;
import com.xx.service.IRankService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.Date;
import java.util.List;

@Api(value = "/rank", tags = "统计排行接口")
@RestController
@RequestMapping("/rank")
@CrossOrigin
public class RankController {

    @Autowired
    private IDiseaseSearchLogService diseaseSearchLogService;

    @Autowired
    private IRankService rankService;

    @ApiOperation(value = "保存疾病搜索日志", notes = "保存疾病搜索日志")
    @PostMapping("/disease/log/save")
    public void saveDiseaseLog(DiseaseSearchLog diseaseSearchLog) {
        diseaseSearchLog.setTime(new Date());
        diseaseSearchLogService.save(diseaseSearchLog);
    }

    @ApiOperation(value = "根据等级统计医院等级各数量", notes = "根据等级统计医院等级各数量")
    @GetMapping("/level")
    public List<Object> level() {
        return rankService.level();
    }

    @ApiOperation(value = "根据认证统计医院等级各数量", notes = "根据认证统计医院等级各数量")
    @GetMapping("/isAuth")
    public List<Object> isAuth() {
        return rankService.isAuth();
    }

    @ApiOperation(value = "根据经营情况统计医院各数量", notes = "根据经营情况统计医院各数量")
    @GetMapping("/manage")
    public List<Object> manage() {
        return rankService.manage();
    }

    @ApiOperation(value = "根据浏览量获取前十医院排行", notes = "根据浏览量获取前十医院排行")
    @PostMapping("/hosViewTop")
    public List<Object> hosViewTop(String type) {
        return rankService.hosViewTop(type);
    }

    @ApiOperation(value = "根据好评数获取前十医生排行", notes = "根据好评数获取前十医生排行")
    @PostMapping("/doctorPraiseTop")
    public List<Object> doctorPraiseTop(String ks) {
        return rankService.doctorPraiseTop(ks);
    }

    @ApiOperation(value = "根据就诊数获取前十医生排行", notes = "根据就诊数获取前十医生排行")
    @PostMapping("/doctorDiagTop")
    public List<Object> doctorDiagTop(String ks) {
        return rankService.doctorDiagTop(ks);
    }

    @ApiOperation(value = "根据浏览量获取前十疾病排行", notes = "根据浏览量获取前十疾病排行")
    @PostMapping("/diseaseViewTop")
    public List<Object> diseaseViewTop(String ks,String buwei) {
        return rankService.diseaseViewTop(ks,buwei);
    }

}
