package com.scribere.backend.dto;

import lombok.Data;
import java.time.LocalDateTime;
import java.util.UUID;

@Data
public class ArticleDto {
    private UUID id;
    private String title;
    private String slug;
    private String coverImgUrl;
    private Integer readTime;
    private String content;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}