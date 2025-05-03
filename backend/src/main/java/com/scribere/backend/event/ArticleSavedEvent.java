package com.scribere.backend.event;

import com.scribere.backend.dto.ArticleDto;

/**
 * Event that is published when an article is saved.
 * This event can be used to trigger actions such as indexing the article in a
 * meilisearch or notifying other services. pub/sub pattern.
 */
public class ArticleSavedEvent {
    private final ArticleDto article;

    public ArticleSavedEvent(ArticleDto article) {
        this.article = article;
    }

    public ArticleDto getArticle() {
        return article;
    }
}