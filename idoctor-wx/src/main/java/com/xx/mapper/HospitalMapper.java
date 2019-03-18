package com.xx.mapper;

import com.xx.entity.Hospital;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HospitalMapper {

    List<Hospital> getByIf(@Param("pageNum")int pageNum, @Param("pageSize")int pageSize,@Param("hospital")Hospital hospital);
    List<String> allType();
    List<String> allLevel();
    int totel(@Param("pageNum")int pageNum, @Param("pageSize")int pageSize,@Param("hospital")Hospital hospital);
    int delete(int[] ids);
}
