package com.xx.mapper;

import com.xx.entity.Result;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface RankMapper {

    List<Result> level();
}
