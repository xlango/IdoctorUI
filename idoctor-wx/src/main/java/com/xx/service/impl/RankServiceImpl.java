package com.xx.service.impl;

import com.xx.entity.Result;
import com.xx.mapper.RankMapper;
import com.xx.service.IRankService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class RankServiceImpl implements IRankService  {

    @Autowired
    private RankMapper rankMapper;

    @Override
    public List<Result> level() {
        return rankMapper.level();
    }
}
