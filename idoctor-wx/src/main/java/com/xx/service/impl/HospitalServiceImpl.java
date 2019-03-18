package com.xx.service.impl;

import com.xx.entity.Hospital;
import com.xx.mapper.HospitalMapper;
import com.xx.service.IHospitalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HospitalServiceImpl implements IHospitalService {

    @Autowired
    private HospitalMapper hospitalMapper;

    @Override
    public List<Hospital> getByIf(int pageNum, int pageSize, Hospital hospital) {
        return hospitalMapper.getByIf((pageNum-1)*pageSize,pageSize,hospital);
    }

    @Override
    public List<String> allType() {
        return hospitalMapper.allType();
    }

    @Override
    public List<String> allLevel() {
        return hospitalMapper.allLevel();
    }

    @Override
    public int delete(int[] ids) {
        return hospitalMapper.delete(ids);
    }

}
