package com.xx.service;

import com.xx.entity.Result;

public interface IHealthService {

    //腰围
    Result waistline(float height, int sex, float wl);
    //心率
    Result heartPulse(int age,float value);
    //体温
    Result temp(float value);
}
