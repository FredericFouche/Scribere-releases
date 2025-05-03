package com.scribere.backend.listener;

import com.meilisearch.sdk.Client;
import com.meilisearch.sdk.Index;
import com.scribere.backend.dto.ArticleDto;
import com.scribere.backend.event.ArticleSavedEvent;
import com.scribere.backend.service.SearchService;
import org.springframework.stereotype.Component;
import org.springframework.transaction.event.TransactionPhase;
import org.springframework.transaction.event.TransactionalEventListener;
import com.google.gson.Gson;

@Component
public class ArticleIndexingListener {
    private static final String INDEX_NAME = "articles";
    private final Client meiliClient;
    private final Gson gson;
    private final SearchService searchService;

    public ArticleIndexingListener(Client meiliClient, SearchService searchService) {
        this.meiliClient = meiliClient;
        this.searchService = searchService;
        this.gson = new Gson();
    }

    /**
     * Listener for the ArticleSavedEvent. This method is called after the
     * transaction is committed.
     * It ensures that the index exists and then indexes the article in Meilisearch.
     *
     * @param event The ArticleSavedEvent containing the article to be indexed.
     */
    @TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT)
    public void handleArticleSavedEvent(ArticleSavedEvent event) {
        try {
            searchService.ensureIndexExists();
            ArticleDto article = event.getArticle();
            Index index = meiliClient.index(INDEX_NAME);
            String articleJson = gson.toJson(article);
            index.addDocuments(articleJson);
        } catch (Exception e) {
            throw new RuntimeException("Failed to index article", e);
        }
    }
}