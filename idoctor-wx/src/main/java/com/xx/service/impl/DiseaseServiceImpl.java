package com.xx.service.impl;

import com.xx.entity.Disease;
import com.xx.mapper.DiseaseMapper;
import com.xx.service.IDiseaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DiseaseServiceImpl implements IDiseaseService {

    @Autowired
    private DiseaseMapper diseaseMapper;

    @Override
    public List<Disease> all(int pageNum, int pageSize) {
        return diseaseMapper.all((pageNum-1)*pageSize,pageSize);
    }

    @Override
    public List<Disease> getByIfLike(int pageNum, int pageSize, String buwei, String keshi,String name) {
        return diseaseMapper.getByIfLike((pageNum-1)*pageSize,pageSize,buwei,keshi,name);
    }

    @Override
    public int delete(int[] ids) {
        return diseaseMapper.delete(ids);
    }
}
