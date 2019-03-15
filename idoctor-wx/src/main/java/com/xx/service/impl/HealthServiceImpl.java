package com.xx.service.impl;

import com.xx.entity.Result;
import com.xx.service.IHealthService;
import org.springframework.stereotype.Service;

@Service
public class HealthServiceImpl implements IHealthService {

    @Override
    public Result waistline(float height, int sex, float wl) {
        Result result=new Result();
        result.setType("waistline");
        float waistline = 0f;
        if(sex==0){
            waistline = height / 2 - 11;
        }else {
            waistline = height / 2 - 13;
        }
        if (wl < waistline * (1 - 0.05)) {
            result.setContent("low");
            return result;
        } else if (wl > waistline * (1 + 0.05)) {
            result.setContent("high");
            return result;
        } else {
            result.setContent("normal");
            return result;
        }
    }

    @Override
    public Result heartPulse(int age,float value) {
        Result result=new Result();
        result.setType("heartPulse");
        if (value<40){
            result.setContent("lowdanger");
        }else if (value>160){
            result.setContent("highdanger");
        }
        if (age<=1){
            if (value<110){
                result.setContent("low");
            }else if (value>150){
                result.setContent("high");
            }else {
                result.setContent("normal");
            }
        }else if (age<=2){
            if (value<85){
                result.setContent("low");
            }else if (value>125){
                result.setContent("high");
            }else {
                result.setContent("normal");
            }
        }else if (age<18){
            if (value<65){
                result.setContent("low");
            }else if (value>105){
                result.setContent("high");
            }else {
                result.setContent("normal");
            }
        }else if (age<55){
            if (value<55){
                result.setContent("low");
            }else if (value>78){
                result.setContent("high");
            }else {
                result.setContent("normal");
            }
        }else {
            if (value<110){
                result.setContent("low");
            }else if (value>150){
                result.setContent("high");
            }else {
                result.setContent("normal");
            }
        }
        return result;
    }

    @Override
    public Result temp(float value) {
        Result rs=new Result();
        rs.setType("temp");

        if (value>41){
            rs.setContent("superhighheat");
        }else if (value>39){
            rs.setContent("highheat");
        }else if(value>38){
            rs.setContent("moderateheat");
        }else if (value>37.4){
            rs.setContent("heat");
        }else if (value>36.3){
            rs.setContent("normal");
        }else {
            rs.setContent("low");
        }
        return rs;
    }
}
