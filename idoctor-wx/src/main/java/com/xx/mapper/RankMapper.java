package com.xx.mapper;

import com.xx.entity.Result;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface RankMapper {

    List<Object> level();
    List<Object> isAuth();
    List<Object> manage();
    List<Object> hosViewTop(@Param("type") String type);
    List<Object> doctorPraiseTop(@Param("ks") String ks);
    List<Object> doctorDiagTop(@Param("ks") String ks);
    List<Object> diseaseViewTop(@Param("keshi") String ks,@Param("buwei") String buwei);
}
