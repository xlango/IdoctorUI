package com.xx.service;

import com.xx.entity.Hospital;

import java.util.List;

public interface IHospitalService {

    List<Hospital> getByIf(int pageNum,int pageSize,Hospital hospital);

    List<String> allType();

    List<String> allLevel();
}
