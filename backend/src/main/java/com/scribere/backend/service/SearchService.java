package com.scribere.backend.service;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonDeserializationContext;
import com.google.gson.JsonDeserializer;
import com.google.gson.JsonElement;
import com.google.gson.JsonParseException;
import com.google.gson.JsonPrimitive;
import com.google.gson.JsonSerializationContext;
import com.google.gson.JsonSerializer;
import com.meilisearch.sdk.Client;
import com.meilisearch.sdk.Index;
import com.meilisearch.sdk.SearchRequest;
import com.meilisearch.sdk.exceptions.MeilisearchApiException;
import com.meilisearch.sdk.model.Searchable;
import com.scribere.backend.dto.ArticleDto;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.lang.reflect.Type;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class SearchService {

    private static final Logger logger = LoggerFactory.getLogger(SearchService.class);
    private static final String INDEX_NAME = "articles";
    private final Client meiliClient;
    private final Gson gson;

    public SearchService(Client meiliClient) {
        this.meiliClient = meiliClient;

        // Création d'un Gson avec un adaptateur personnalisé pour LocalDateTime
        this.gson = new GsonBuilder()
                .registerTypeAdapter(LocalDateTime.class, new LocalDateTimeAdapter())
                .create();
    }

    // Adaptateur pour sérialiser/désérialiser LocalDateTime
    private static class LocalDateTimeAdapter
            implements JsonSerializer<LocalDateTime>, JsonDeserializer<LocalDateTime> {
        private static final DateTimeFormatter formatter = DateTimeFormatter.ISO_LOCAL_DATE_TIME;

        @Override
        public JsonElement serialize(LocalDateTime src, Type typeOfSrc, JsonSerializationContext context) {
            return src == null ? null : new JsonPrimitive(formatter.format(src));
        }

        @Override
        public LocalDateTime deserialize(JsonElement json, Type typeOfT, JsonDeserializationContext context)
                throws JsonParseException {
            if (json == null || json.isJsonNull()) {
                return null;
            }
            try {
                return LocalDateTime.parse(json.getAsString(), formatter);
            } catch (Exception e) {
                logger.warn("Erreur lors de la désérialisation de LocalDateTime: {}", e.getMessage());
                // Retourner la date actuelle en cas d'erreur pour éviter l'échec complet de
                // désérialisation
                return LocalDateTime.now();
            }
        }
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

    public List<ArticleDto> search(String query, int limit) {
        try {
            logger.info("Recherche de '{}' avec limite {}", query, limit);

            // S'assurer que l'index existe avant de chercher
            ensureIndexExists();

            Index index = meiliClient.index(INDEX_NAME);

            // Créer la requête de recherche
            SearchRequest searchRequest = new SearchRequest(query)
                    .setLimit(limit);

            // Exécuter la recherche
            Searchable searchResult = index.search(searchRequest);

            // Récupérer les hits - c'est une ArrayList<HashMap> et non un String
            @SuppressWarnings("unchecked")
            ArrayList<HashMap<String, Object>> hits = (ArrayList<HashMap<String, Object>>) searchResult.getHits();

            // Si aucun résultat, retourner une liste vide
            if (hits == null || hits.isEmpty()) {
                logger.info("Aucun résultat trouvé pour '{}'", query);
                return Collections.emptyList();
            }

            // Convertir les résultats en liste d'ArticleDto
            List<ArticleDto> articles = hits.stream()
                    .map(hit -> {
                        try {
                            // Convertir le HashMap en JSON puis en ArticleDto
                            String json = gson.toJson(hit);
                            ArticleDto article = gson.fromJson(json, ArticleDto.class);

                            // Si les dates sont nulles, initialiser avec la date actuelle
                            if (article.getCreatedAt() == null) {
                                article.setCreatedAt(LocalDateTime.now());
                            }
                            if (article.getUpdatedAt() == null) {
                                article.setUpdatedAt(LocalDateTime.now());
                            }

                            return article;
                        } catch (Exception e) {
                            logger.error("Erreur lors de la conversion du résultat en ArticleDto: {}", e.getMessage());
                            return null;
                        }
                    })
                    .filter(article -> article != null)
                    .collect(Collectors.toList());

            logger.info("Trouvé {} articles correspondant à '{}'", articles.size(), query);
            return articles;
        } catch (Exception e) {
            logger.error("Erreur pendant l'opération de recherche", e);
            return Collections.emptyList();
        }
    }
}