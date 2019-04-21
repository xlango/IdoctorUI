package com.xx.mapper;

import com.xx.entity.Body;
import com.xx.entity.Doctor;
import com.xx.entity.Drug;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DrugMapper {

    List<String> allDrugOne();

    List<String> getDrugTwoByOne(String one);

    List<Drug> getByIf(@Param("pageNum") int pageNum, @Param("pageSize") int pageSize, @Param("drug") Drug drug);
    int totel(@Param("pageNum") int pageNum, @Param("pageSize") int pageSize, @Param("drug") Drug drug);
    int delete(int[] ids);
    int update(@Param("drug") Drug drug);
}
