package com.xx.mapper;

import com.xx.entity.*;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CollectionMapper {

    int add(@Param("col") Collection collection);

    List<Hospital> getHosCol(@Param("col") Collection collection);
    List<Doctor> getDocCol(@Param("col") Collection collection);
    List<Disease> getDisCol(@Param("col") Collection collection);
    List<Drug> getDrugCol(@Param("col") Collection collection);

    int cancelCollection(@Param("col") Collection collection);
}
