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
    public List<Object> level() {
        return rankMapper.level();
    }

    @Override
    public List<Object> isAuth() {
        return rankMapper.isAuth();
    }

    @Override
    public List<Object> manage() {
        return rankMapper.manage();
    }

    @Override
    public List<Object> hosViewTop(String type) {
        return rankMapper.hosViewTop(type);
    }

    @Override
    public List<Object> doctorTop(String ks) {
        return rankMapper.doctorTop(ks);
    }
}
