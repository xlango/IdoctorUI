package com.xx.service;

import com.xx.entity.*;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface ICollectionService {

    int add(Collection collection);

    List<Hospital> getHosCol(Collection collection);
    List<Doctor> getDocCol(Collection collection);
    List<Disease> getDisCol(Collection collection);
    List<Drug> getDrugCol(Collection collection);

    int cancelCollection(Collection collection);

    Collection isCol(Collection collection);
}
