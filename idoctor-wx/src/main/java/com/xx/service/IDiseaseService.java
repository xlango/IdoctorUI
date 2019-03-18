package com.xx.service;

import com.xx.entity.Disease;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface IDiseaseService {

    List<Disease> all(int pageNum, int pageSize);
    List<Disease> getByIfLike(int pageNum,int pageSize,String buwei,String keshi,String name);
    int delete(int[] ids);
}
