package com.xx.mapper;

import com.xx.entity.Doctor;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DoctorMapper {

    List<Doctor> getByIf(@Param("pageNum") int pageNum, @Param("pageSize") int pageSize, @Param("doctor")Doctor doctor);

    List<Doctor> getByHos(@Param("hos")String hos);

    int totel(@Param("pageNum") int pageNum, @Param("pageSize") int pageSize, @Param("doctor")Doctor doctor);

    int delete(int[] ids);
}
