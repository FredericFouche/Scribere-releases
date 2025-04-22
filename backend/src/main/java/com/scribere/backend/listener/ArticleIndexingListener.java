package com.scribere.backend.listener;

import com.meilisearch.sdk.Client;
import com.meilisearch.sdk.Index;
import com.meilisearch.sdk.exceptions.MeilisearchApiException;
import com.scribere.backend.dto.ArticleDto;
import com.scribere.backend.event.ArticleSavedEvent;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.transaction.event.TransactionPhase;
import org.springframework.transaction.event.TransactionalEventListener;
import com.google.gson.Gson;

@Component
public class ArticleIndexingListener {

    private static final Logger logger = LoggerFactory.getLogger(ArticleIndexingListener.class);
    private static final String INDEX_NAME = "articles";
    private final Client meiliClient;
    private final Gson gson;

    public ArticleIndexingListener(Client meiliClient) {
        this.meiliClient = meiliClient;
        this.gson = new Gson();
        ensureIndexExists();
    }

    private void ensureIndexExists() {
        try {
            // Vérifier si l'index existe déjà
            meiliClient.getIndex(INDEX_NAME);
            logger.info("Index '{}' existe déjà", INDEX_NAME);
        } catch (MeilisearchApiException e) {
            if (e.getMessage().contains("not found")) {
                try {
                    // Créer l'index s'il n'existe pas
                    meiliClient.createIndex(INDEX_NAME, "id");
                    logger.info("Index '{}' créé avec succès", INDEX_NAME);
                } catch (Exception ex) {
                    logger.error("Erreur lors de la création de l'index '{}'", INDEX_NAME, ex);
                }
            } else {
                logger.error("Erreur lors de la vérification de l'index '{}'", INDEX_NAME, e);
            }
        } catch (Exception e) {
            logger.error("Erreur inattendue lors de la vérification de l'index '{}'", INDEX_NAME, e);
        }
    }

    @TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT)
    public void handleArticleSavedEvent(ArticleSavedEvent event) {
        try {
            ArticleDto article = event.getArticle();
            logger.info("Indexation de l'article: {}", article.getTitle());

            // S'assurer que l'index existe avant d'indexer
            ensureIndexExists();

            Index index = meiliClient.index(INDEX_NAME);

            // Convertir l'article en JSON
            String articleJson = gson.toJson(article);

            // Ajouter le document à l'index
            index.addDocuments(articleJson);

            logger.info("Article indexé avec succès dans Meilisearch");
        } catch (Exception e) {
            logger.error("Échec de l'indexation de l'article dans Meilisearch", e);
        }
    }
}