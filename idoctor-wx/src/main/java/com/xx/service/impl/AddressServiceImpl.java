package com.xx.service.impl;

import com.xx.mapper.AddressMapper;
import com.xx.service.IAddressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AddressServiceImpl implements IAddressService {

    @Autowired
    private AddressMapper addressMapper;

    @Override
    public List<String> allProvice() {
        return addressMapper.allProvice();
    }

    @Override
    public List<String> getCityByProvice(String provice) {
        return addressMapper.getCityByProvice(provice);
    }

    @Override
    public List<String> getAreaByProviceAndCity(String provice, String city) {
        return addressMapper.getAreaByProviceAndCity(provice,city);
    }
}
