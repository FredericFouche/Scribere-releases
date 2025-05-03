package com.scribere.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.UUID;
import java.util.Set;

/**
 * Entity representing an article in the system.
 * Articles are the main content type in the Scribere platform.
 * They contain HTML content, metadata, and can be tagged.
 */
@Entity
@Table(name = "articles")
@Data
@NoArgsConstructor
@AllArgsConstructor
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
}
