package com.xx.mapper;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AddressMapper {

    List<String> allProvice();

    List<String> getCityByProvice(@Param("provice") String provice);

    List<String> getAreaByProviceAndCity(@Param("provice") String provice,@Param("city") String city);
}
