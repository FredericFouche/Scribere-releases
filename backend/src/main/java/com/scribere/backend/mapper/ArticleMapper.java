package com.scribere.backend.mapper;

import com.scribere.backend.dto.ArticleDto;
import com.scribere.backend.model.Article;
import org.springframework.stereotype.Component;

@Component
public class ArticleMapper {

    public ArticleDto toDto(Article article) {
        ArticleDto dto = new ArticleDto();
        dto.setId(article.getId());
        dto.setTitle(article.getTitle());
        dto.setSlug(article.getSlug());
        dto.setCoverImgUrl(article.getCoverImgUrl());
        dto.setReadTime(article.getReadTime());
        dto.setCreatedAt(article.getCreatedAt());
        return dto;
    }
}
