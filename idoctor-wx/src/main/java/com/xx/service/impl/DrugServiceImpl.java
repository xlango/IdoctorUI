package com.xx.service.impl;

import com.xx.entity.Drug;
import com.xx.mapper.DrugMapper;
import com.xx.service.IDrugService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DrugServiceImpl implements IDrugService {

    @Autowired
    private DrugMapper drugMapper;

    @Override
    public List<String> allDrugOne() {
        return drugMapper.allDrugOne();
    }

    @Override
    public List<String> getDrugTwoByOne(String one) {
        return drugMapper.getDrugTwoByOne(one);
    }

    @Override
    public List<Drug> getByIf(int pageNum, int pageSize, Drug drug) {
        return drugMapper.getByIf((pageNum-1)*pageSize,pageSize,drug);
    }
    @Override
    public int delete(int[] ids) {
        return drugMapper.delete(ids);
    }

}
