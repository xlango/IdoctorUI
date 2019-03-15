package com.xx.mapper;

import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface KeshiMapper {

    List<String> getAllOne();
    List<String> getAllTwoByOne(String one);
}
