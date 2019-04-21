package com.xx.service;

import com.xx.entity.Drug;

import java.util.List;

public interface IDrugService {

    List<String> allDrugOne();

    List<String> getDrugTwoByOne(String one);

    List<Drug> getByIf(int pageNum, int pageSize, Drug drug);
    int delete(int[] ids);
    int update(Drug drug);
}
