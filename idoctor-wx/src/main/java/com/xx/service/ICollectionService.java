package com.xx.service;

import com.xx.entity.*;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface ICollectionService {

    int add(Collection collection);

    List<Object> getCol(Collection collection);

    int cancelCollection(Collection collection);
}
