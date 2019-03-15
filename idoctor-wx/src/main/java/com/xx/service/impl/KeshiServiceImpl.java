package com.xx.service.impl;

import com.xx.mapper.KeshiMapper;
import com.xx.service.IKeshiService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
public class KeshiServiceImpl implements IKeshiService {

    @Autowired
    private KeshiMapper keshiMapper;

    @Override
    public List<String> getAllOne() {
        return keshiMapper.getAllOne();
    }

    @Override
    public List<String> getAllTwoByOne(String one) {
        return keshiMapper.getAllTwoByOne(one);
    }
}
