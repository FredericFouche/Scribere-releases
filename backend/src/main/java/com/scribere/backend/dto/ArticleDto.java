package com.scribere.backend.dto;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;
import java.util.UUID;

public class ArticleDto {
    private UUID id;
    private String title;
    private String slug;
    private String coverImgUrl;
    private Integer readTime;
    private String content;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private Set<TagDto> tags;
    
    // Constructors
    public ArticleDto() {
        this.tags = new HashSet<>();
    }
    
    public ArticleDto(UUID id, String title, String slug, String coverImgUrl, Integer readTime,
                     String content, LocalDateTime createdAt, LocalDateTime updatedAt, Set<TagDto> tags) {
        this.id = id;
        this.title = title;
        this.slug = slug;
        this.coverImgUrl = coverImgUrl;
        this.readTime = readTime;
        this.content = content;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.tags = tags != null ? tags : new HashSet<>();
    }
    
    // Getters and Setters
    public UUID getId() {
        return id;
    }
    
    public void setId(UUID id) {
        this.id = id;
    }
    
    public String getTitle() {
        return title;
    }
    
    public void setTitle(String title) {
        this.title = title;
    }
    
    public String getSlug() {
        return slug;
    }
    
    public void setSlug(String slug) {
        this.slug = slug;
    }
    
    public String getCoverImgUrl() {
        return coverImgUrl;
    }
    
    public void setCoverImgUrl(String coverImgUrl) {
        this.coverImgUrl = coverImgUrl;
    }
    
    public Integer getReadTime() {
        return readTime;
    }
    
    public void setReadTime(Integer readTime) {
        this.readTime = readTime;
    }
    
    public String getContent() {
        return content;
    }
    
    public void setContent(String content) {
        this.content = content;
    }
    
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
    
    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
    
    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }
    
    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
    
    public Set<TagDto> getTags() {
        return tags;
    }
    
    public void setTags(Set<TagDto> tags) {
        this.tags = tags;
    }
    
    // equals, hashCode and toString
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ArticleDto that = (ArticleDto) o;
        return Objects.equals(id, that.id);
    }
    
    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
    
    @Override
    public String toString() {
        return "ArticleDto{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", slug='" + slug + '\'' +
                '}';
    }
}