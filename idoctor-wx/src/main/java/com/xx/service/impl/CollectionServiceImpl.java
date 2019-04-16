package com.xx.service.impl;

import com.xx.entity.*;
import com.xx.mapper.CollectionMapper;
import com.xx.service.ICollectionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Service
public class CollectionServiceImpl implements ICollectionService {

    @Autowired
    private CollectionMapper collectionMapper;

    @Override
    public int add(Collection collection) {
        return collectionMapper.add(collection);
    }

    @Override
    public List<Hospital> getHosCol(Collection collection) {
        return collectionMapper.getHosCol(collection);
    }

    @Override
    public List<Doctor> getDocCol(Collection collection) {
        return collectionMapper.getDocCol(collection);
    }

    @Override
    public List<Disease> getDisCol(Collection collection) {
        return collectionMapper.getDisCol(collection);
    }

    @Override
    public List<Drug> getDrugCol(Collection collection) {
        return collectionMapper.getDrugCol(collection);
    }

    @Override
    public int cancelCollection(Collection collection) {
        return collectionMapper.cancelCollection(collection);
    }

    @Override
    public Collection isCol(Collection collection) {
        return collectionMapper.isCol(collection);
    }
}
