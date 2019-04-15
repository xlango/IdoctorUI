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
    public List<Object> getCol(Collection collection) {
        if (collection.getType()==1){
            return Collections.singletonList(collectionMapper.getHosCol(collection));
        }
        if (collection.getType()==2){
            return Collections.singletonList(collectionMapper.getDocCol(collection));
        }
        if (collection.getType()==3){
            return Collections.singletonList(collectionMapper.getDisCol(collection));
        }
        return Collections.singletonList(collectionMapper.getDrugCol(collection));
    }

    @Override
    public int cancelCollection(Collection collection) {
        return collectionMapper.cancelCollection(collection);
    }
}
