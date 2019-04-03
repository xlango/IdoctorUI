package com.xx.service;

import com.xx.entity.Doctor;

import java.util.List;

public interface IDoctorService {

    List<Doctor> getByIf(int pageNum, int pageSize, Doctor doctor);
    List<Doctor> getByHos(String hos);
    int delete(int[] ids);
}
