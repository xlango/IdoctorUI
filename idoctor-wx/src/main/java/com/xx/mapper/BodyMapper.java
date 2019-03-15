package com.xx.mapper;

import com.xx.entity.Body;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BodyMapper {

    List<String> all();
}
