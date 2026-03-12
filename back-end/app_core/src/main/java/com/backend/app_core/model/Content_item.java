package com.backend.app_core.model;

import jakarta.persistence.*;

@Entity
@Table(name = "news")
public class Content_item {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false, length = 2000)
    private String content;

    @ManyToOne
    @JoinColumn(name = "topic_id")
    private Topic topic;

    public Content_item() {
    }

    public Content_item(String title, String content, Topic topic) {
        this.title = title;
        this.content = content;
        this.topic = topic;
    }

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Topic getTopic() {
        return topic;
    }

    public void setTopic(Topic topic) {
        this.topic = topic;
    }
}