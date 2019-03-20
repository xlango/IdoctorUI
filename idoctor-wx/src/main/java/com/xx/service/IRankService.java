package com.xx.service;

import com.xx.entity.Admin;
import com.xx.entity.Result;

import java.util.List;
import java.util.Map;

public interface IRankService {

    List<Object> level();
    List<Object> isAuth();
    List<Object> manage();
    List<Object> hosViewTop(String type);
    List<Object> doctorPraiseTop(String ks);
    List<Object> doctorDiagTop(String ks);
    List<Object> diseaseViewTop(String ks,String buwei);
}
