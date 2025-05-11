package com.scribere.backend.model;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;
import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;

/**
 * Entity representing an article in the system.
 * Articles are the main content type in the Scribere platform.
 * They contain HTML content, metadata, and can be tagged.
 */
@Entity
@Table(name = "articles")
public class Article {

    /**
     * Unique identifier for the article.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(columnDefinition = "UUID")
    private UUID id;

    /**
     * Title of the article. Required.
     */
    @Column(nullable = false)
    private String title;

    /**
     * URL-friendly identifier for the article. Required and must be unique.
     * Used in URLs for SEO and readability.
     */
    @Column(nullable = false, unique = true)
    private String slug;

    /**
     * URL to the article's cover image. Optional.
     */
    @Column(name = "cover_img_url")
    private String coverImgUrl;

    /**
     * Estimated time in minutes to read the article.
     */
    @Column(name = "read_time")
    private Integer readTime;

    /**
     * The HTML content of the article stored as TEXT.
     */
    @Column(name = "html_body", columnDefinition = "TEXT")
    private String content;

    /**
     * Timestamp when the article was first created.
     * Automatically set when the entity is persisted.
     */
    @Column(name = "created_at")
    private LocalDateTime createdAt;

    /**
     * Timestamp of the last update to the article.
     * Automatically updated when the entity is modified.
     */
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    /**
     * Lifecycle callback to set initial timestamps when creating an article.
     */
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    /**
     * Lifecycle callback to update the updatedAt timestamp when modifying an
     * article.
     */
    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

    /**
     * The tags associated with this article.
     * Many-to-many relationship with Tag entity.
     */
    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "article_tags", joinColumns = @JoinColumn(name = "article_id"), inverseJoinColumns = @JoinColumn(name = "tag_id"))
    private Set<Tag> tags = new HashSet<>();
    
    // Constructors
    public Article() {
    }
    
    public Article(UUID id, String title, String slug, String coverImgUrl, Integer readTime, 
                  String content, LocalDateTime createdAt, LocalDateTime updatedAt, Set<Tag> tags) {
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
    
    public Set<Tag> getTags() {
        return tags;
    }
    
    public void setTags(Set<Tag> tags) {
        this.tags = tags;
    }
    
    // equals, hashCode and toString
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Article article = (Article) o;
        return Objects.equals(id, article.id);
    }
    
    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
    
    @Override
    public String toString() {
        return "Article{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", slug='" + slug + '\'' +
                '}';
    }
}
