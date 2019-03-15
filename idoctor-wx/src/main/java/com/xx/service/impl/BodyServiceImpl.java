package com.xx.service.impl;

import com.xx.entity.Body;
import com.xx.mapper.BodyMapper;
import com.xx.service.IBodyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BodyServiceImpl implements IBodyService {

    @Autowired
    private BodyMapper bodyMapper;

    @Override
    public  List<String> all() {
        return bodyMapper.all();
    }
}
