package com.backend.app_core.repository;

import com.backend.app_core.model.Content_item;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface Content_itemRepository extends JpaRepository<Content_item, Long> {

    List<Content_item> findByTopic_Id(Long topicId);

    List<Content_item> findByTopic_IdIn(List<Long> topicIds);
}