package com.xx.service.impl;

import com.xx.entity.Yuyue;
import com.xx.mapper.YuyueMapper;
import com.xx.service.IYuyueService;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class YuyueServiceImpl implements IYuyueService {

    @Autowired
    private YuyueMapper yuyueMapper;


    @Override
    public int add(Yuyue yuyue) {
        return yuyueMapper.add(yuyue);
    }

    @Override
    public List<Yuyue> getByIf(Yuyue yuyue) {
        return yuyueMapper.getByIf(yuyue);
    }

    @Override
    public int cancelYuyue(Yuyue yuyue) {
        return yuyueMapper.cancelYuyue(yuyue);
    }
}
