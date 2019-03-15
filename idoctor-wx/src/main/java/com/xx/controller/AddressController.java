package com.xx.controller;

import com.xx.service.IAddressService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Api(value="/addr", tags="地址接口")
@RestController
@RequestMapping("/addr")
@CrossOrigin
public class AddressController {

    @Autowired
    private IAddressService addressService;

    @ApiOperation(value="省", notes="省")
    @GetMapping("/allProvice")
    public List<String> provice(){
        return addressService.allProvice();
    }

    @ApiOperation(value="根据省查市", notes="根据省查市")
    @PostMapping("/getCityByProvice")
    public List<String> getCityByProvice(String provice){
        return addressService.getCityByProvice(provice);
    }

    @ApiOperation(value="根据省、市查地区", notes="根据省、市查地区")
    @PostMapping("/getAreaByProviceAndCity")
    public List<String> getAreaByProviceAndCity(String provice,String city){
        return addressService.getAreaByProviceAndCity(provice,city);
    }
}
