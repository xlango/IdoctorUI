package com.xx.service.impl;

import com.xx.dao.es.DiseaseSearchLogDao;
import com.xx.entity.Disease;
import com.xx.entity.DiseaseSearchLog;
import com.xx.service.IDiseaseSearchLogService;
import com.xx.service.IDiseaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DiseaseSearchLogServiceImpl implements IDiseaseSearchLogService{

    @Autowired
    private DiseaseSearchLogDao diseaseSearchLogDao;

    @Override
    public void save(DiseaseSearchLog diseaseSearchLog) {
        diseaseSearchLogDao.save(diseaseSearchLog);
    }
}
