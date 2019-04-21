package com.xx.mapper;

import com.xx.entity.Disease;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DiseaseMapper {

    List<Disease> all(@Param("pageNum")int pageNum,@Param("pageSize")int pageSize);
    List<Disease> getByIfLike(@Param("pageNum")int pageNum,@Param("pageSize")int pageSize,@Param("dis")Disease dis);
    int totel(@Param("pageNum")int pageNum,@Param("pageSize")int pageSize,@Param("buwei")String buwei,@Param("keshi")String keshi,@Param("name")String name);
    int delete(int[] ids);
    int update(@Param("dis") Disease dis);
}
