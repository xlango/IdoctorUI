package com.xx.dao.es;

import com.xx.entity.DiseaseSearchLog;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DiseaseSearchLogDao extends ElasticsearchRepository<DiseaseSearchLog,String> {

}
