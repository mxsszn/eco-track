package com.backend.app_core.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.backend.app_core.model.Content_item;

public interface Content_itemRepository extends CrudRepository<Content_item, Long> {

    @Query("SELECT c FROM Content_item c WHERE c.topic.topic_id = :topicId")
    List<Content_item> findByTopic_Id(@Param("topicId") Long topicId);

    @Query("SELECT c FROM Content_item c WHERE c.topic.topic_id IN :topicIds")
    List<Content_item> findByTopic_IdIn(@Param("topicIds") List<Long> topicIds);
}