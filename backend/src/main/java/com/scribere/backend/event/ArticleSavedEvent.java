package com.scribere.backend.event;

import com.scribere.backend.dto.ArticleDto;

public class ArticleSavedEvent {
    private final ArticleDto article;

    public ArticleSavedEvent(ArticleDto article) {
        this.article = article;
    }

    public ArticleDto getArticle() {
        return article;
    }
}