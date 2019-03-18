package com.xx.controller;

import com.xx.entity.Drug;
import com.xx.service.IDrugService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import net.bytebuddy.asm.Advice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Api(value="/drug", tags="药品接口")
@RestController
@RequestMapping("/drug")
@CrossOrigin
public class DrugController {

    @Autowired
    private IDrugService drugService;

    @ApiOperation(value="获取所有药品一级类型", notes="获取所有药品一级类型")
    @GetMapping("/allDrugOne")
    public List<String> allDrugOne() {
        return drugService.allDrugOne();
    }

    @ApiOperation(value="根据一级类型获取所有药品二级类型", notes="根据一级类型获取所有药品二级类型")
    @PostMapping("/getDrugTwoByOne")
    public List<String> getDrugTwoByOne(String one) {
        return drugService.getDrugTwoByOne(one);
    }

    @ApiOperation(value="模糊多条件查询药品信息", notes="模糊多条件查询药品信息")
    @PostMapping("/getByIf")
    public List<Drug> getByIf(int pageNum, int pageSize, Drug drug){
        return drugService.getByIf(pageNum,pageSize,drug);
    }
    @ApiOperation(value="删除药品", notes="删除药品")
    @PostMapping("/delete")
    public int delete(int[] ids){
        return drugService.delete(ids);
    }

}
