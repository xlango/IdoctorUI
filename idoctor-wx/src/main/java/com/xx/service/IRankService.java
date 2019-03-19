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
    List<Object> doctorTop(String ks);
}
