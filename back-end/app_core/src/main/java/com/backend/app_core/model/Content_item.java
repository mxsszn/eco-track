package com.backend.app_core.model;
import org.springframework.data.annotation.CreatedDate;
import java.util.Date;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.persistence.FetchType;



@Entity
@Table(name="Content_items")
public class Content_item {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long content_id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="topic_id")
    private Topic topic;

    @NotBlank
    String title;

    @NotBlank
    String context_body;

    @NotBlank
    String context_type;

    String image_url;

    String source_url;

    @NotNull
    boolean is_published;

    Date published_at;

    @CreatedDate
    private Date created_at;


    public Content_item() {
        super();
    }


    public Content_item(Topic topic, String title, String context_body,
            String context_type, String image_url, String source_url, boolean is_published,
            Date published_at) {
        this.topic = topic;
        this.title = title;
        this.context_body = context_body;
        this.context_type = context_type;
        this.image_url = image_url;
        this.source_url = source_url;
        this.is_published = is_published;
        this.published_at = published_at;
    }


    public Long getContent_id() {
        return content_id;
    }


    public void setContent_id(Long content_id) {
        this.content_id = content_id;
    }


    public Topic getTopic() {
        return topic;
    }


    public void setTopic(Topic topic) {
        this.topic = topic;
    }


    public String getTitle() {
        return title;
    }


    public void setTitle(String title) {
        this.title = title;
    }


    public String getContext_body() {
        return context_body;
    }


    public void setContext_body(String context_body) {
        this.context_body = context_body;
    }


    public String getContext_type() {
        return context_type;
    }


    public void setContext_type(String context_type) {
        this.context_type = context_type;
    }


    public String getImage_url() {
        return image_url;
    }


    public void setImage_url(String image_url) {
        this.image_url = image_url;
    }


    public String getSource_url() {
        return source_url;
    }


    public void setSource_url(String source_url) {
        this.source_url = source_url;
    }


    public boolean isIs_published() {
        return is_published;
    }


    public void setIs_published(boolean is_published) {
        this.is_published = is_published;
    }


    public Date getPublished_at() {
        return published_at;
    }


    public void setPublished_at(Date published_at) {
        this.published_at = published_at;
    }


    public Date getCreated_at() {
        return created_at;
    }


    public void setCreated_at(Date created_at) {
        this.created_at = created_at;
    }


    








    
}
