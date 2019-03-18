package com.xx.entity;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;

import java.util.Date;

@Document(indexName = "diseasesearchlog",type = "diseasesearchlog", shards = 1,replicas = 0, refreshInterval = "-1")
@Setter
@Getter
public class DiseaseSearchLog {

    @Id
    String id;
    @Field
    String useid;
    @Field
    String diseaseid;
    @Field
    String name;
    @Field
    String buwei;
    @Field
    Date time;

}
