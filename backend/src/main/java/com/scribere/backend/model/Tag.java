package com.scribere.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

/**
 * Entity representing a tag in the system.
 * Tags are used to categorize articles and enable filtering.
 */
@Entity
@Table(name = "tags")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Tag {

    /**
     * Unique identifier for the tag.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(columnDefinition = "UUID")
    private UUID id;

    /**
     * Name of the tag. Required.
     * This is the display text shown to users.
     */
    @Column(nullable = false)
    private String name;

    /**
     * URL-friendly identifier for the tag. Required and must be unique.
     * Used in URLs for filtering articles by tag.
     */
    @Column(nullable = false, unique = true)
    private String slug;

    /**
     * Timestamp when the tag was first created.
     */
    @Column(name = "created_at")
    private LocalDateTime createdAt;

    /**
     * Timestamp of the last update to the tag.
     */
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    /**
     * The articles associated with this tag.
     * Many-to-many relationship with Article entity.
     */
    @ManyToMany(mappedBy = "tags", fetch = FetchType.LAZY)
    private Set<Article> articles = new HashSet<>();

    /**
     * Lifecycle callback to set initial timestamps when creating a tag.
     */
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    /**
     * Lifecycle callback to update the updatedAt timestamp when modifying a tag.
     */
    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
