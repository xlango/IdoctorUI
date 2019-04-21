package com.xx.controller;

import com.xx.entity.Disease;
import com.xx.service.IDiseaseService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Api(value="/disease", tags="疾病接口")
@RestController
@RequestMapping("/disease")
@CrossOrigin
public class DiseaseController {

    @Autowired
    private IDiseaseService diseaseService;

    @ApiOperation(value="分页获取所有疾病信息", notes="分页获取所有疾病信息")
    @PostMapping("/all")
    public List<Disease> all(int pageNum, int pageSize){
        return diseaseService.all(pageNum,pageSize);
    }

    @ApiOperation(value="模糊多条件查询疾病信息", notes="模糊多条件查询疾病信息")
    @PostMapping("/getByIfLike")
    public List<Disease> getByIfLike(int pageNum, int pageSize,Disease disease){
        return diseaseService.getByIfLike(pageNum,pageSize,disease);
    }

    @ApiOperation(value="删除疾病", notes="删除疾病")
    @PostMapping("/delete")
    public int delete(int[] ids){
        return diseaseService.delete(ids);
    }

    @ApiOperation(value="更新疾病", notes="更新疾病")
    @PostMapping("/update")
    public int update(Disease disease){
        return diseaseService.update(disease);
    }
}
