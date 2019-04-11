package com.xx.service;

import com.xx.entity.Yuyue;

import java.util.List;

public interface IYuyueService {

    int add(Yuyue yuyue);

    List<Yuyue> getByIf(Yuyue yuyue);
}
