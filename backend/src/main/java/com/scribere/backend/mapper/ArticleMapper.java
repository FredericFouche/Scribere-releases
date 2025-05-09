package com.scribere.backend.mapper;

import com.scribere.backend.dto.ArticleDto;
import com.scribere.backend.model.Article;

import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

@Component
public class ArticleMapper {

    private final TagMapper tagMapper;

    public ArticleMapper(TagMapper tagMapper) {
        this.tagMapper = tagMapper;
    }

    public ArticleDto toDto(Article article) {
        ArticleDto dto = new ArticleDto();
        dto.setId(article.getId());
        dto.setTitle(article.getTitle());
        dto.setSlug(article.getSlug());
        dto.setCoverImgUrl(article.getCoverImgUrl());
        dto.setReadTime(article.getReadTime());
        dto.setContent(article.getContent());
        dto.setCreatedAt(article.getCreatedAt());
        dto.setUpdatedAt(article.getUpdatedAt());

        if (article.getTags() != null) {
            dto.setTags(article.getTags().stream()
                    .map(tagMapper::toDto)
                    .collect(Collectors.toSet()));
        }

        return dto;
    }

    public Article toEntity(ArticleDto dto) {
        Article article = new Article();
        article.setId(dto.getId());
        article.setTitle(dto.getTitle());
        article.setSlug(dto.getSlug());
        article.setCoverImgUrl(dto.getCoverImgUrl());
        article.setReadTime(dto.getReadTime());
        article.setContent(dto.getContent());
        return article;
    }
}