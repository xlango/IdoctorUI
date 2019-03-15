package com.xx.service;

import java.util.List;

public interface IAddressService {

    List<String> allProvice();

    List<String> getCityByProvice(String provice);

    List<String> getAreaByProviceAndCity(String provice,String city);
}
