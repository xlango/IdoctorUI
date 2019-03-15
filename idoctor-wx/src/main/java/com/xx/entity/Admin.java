package com.xx.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class Admin {

    int id;
    String username;
    @JsonIgnore
    String password;
    String name;
    String tel;
    String email;
}
