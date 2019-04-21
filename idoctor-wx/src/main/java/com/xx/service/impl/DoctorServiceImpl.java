package com.xx.service.impl;

import com.xx.entity.Doctor;
import com.xx.mapper.DoctorMapper;
import com.xx.service.IDoctorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DoctorServiceImpl implements IDoctorService {

    @Autowired
    private DoctorMapper doctorMapper;

    @Override
    public List<Doctor> getByIf(int pageNum, int pageSize, Doctor doctor) {
        return doctorMapper.getByIf((pageNum-1)*pageSize,pageSize,doctor);
    }

    @Override
    public List<Doctor> getByHos(String hos) {
        return doctorMapper.getByHos(hos);
    }

    @Override
    public int delete(int[] ids) {
        return doctorMapper.delete(ids);
    }

    @Override
    public int update(Doctor doc) {
        return doctorMapper.update(doc);
    }
}
