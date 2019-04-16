package com.xx.controller;

import com.xx.entity.*;
import com.xx.service.ICollectionService;
import com.xx.service.IYuyueService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Api(value = "/collection", tags = "用户收藏接口")
@RestController
@RequestMapping("/collection")
@CrossOrigin
public class CollectionController {

    @Autowired
    private ICollectionService collectionService;

    SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");


    @ApiOperation(value = "添加收藏", notes = "添加收藏")
    @PostMapping("/add")
    public int addCol(Collection collection) {
        collection.setCreateTime(sdf.format(new Date()));
        return collectionService.add(collection);
    }

    @ApiOperation(value = "查询收藏医院列表", notes = "查询收藏医院列表")
    @PostMapping("/hos")
    public List<Hospital> getHosCol(Collection collection) {
        collection.setType(1);
        return collectionService.getHosCol(collection);
    }

    @ApiOperation(value = "查询收藏医生列表", notes = "查询收藏医生列表")
    @PostMapping("/doc")
    public List<Doctor> getDocCol(Collection collection) {
        collection.setType(2);
        return collectionService.getDocCol(collection);
    }

    @ApiOperation(value = "查询收藏疾病列表", notes = "查询收藏疾病列表")
    @PostMapping("/dis")
    public List<Disease> getDisCol(Collection collection) {
        collection.setType(3);
        return collectionService.getDisCol(collection);
    }

    @ApiOperation(value = "查询收藏药品列表", notes = "查询收藏药品列表")
    @PostMapping("/drug")
    public List<Drug> getDrugCol(Collection collection) {
        collection.setType(4);
        return collectionService.getDrugCol(collection);
    }

    @ApiOperation(value = "取消收藏", notes = "取消收藏")
    @PostMapping("/cancel")
    public int cancelCollection(Collection collection) {
        return collectionService.cancelCollection(collection);
    }


    @ApiOperation(value = "判断是否为收藏", notes = "判断是否为收藏")
    @PostMapping("/isCol")
    public int isCol(Collection collection) {
        Collection col= collectionService.isCol(collection);
        if (col==null){
            return 0;
        }
        return 1;
    }
}
