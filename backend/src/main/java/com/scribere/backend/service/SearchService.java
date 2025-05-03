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

    private static final String INDEX_NAME = "articles";
    private final Client meiliClient;
    private final Gson gson;

    /**
     * Constructor for SearchService.
     *
     * @param meiliClient The Meilisearch client used to interact with the
     *                    Meilisearch server.
     */
    public SearchService(Client meiliClient) {
        this.meiliClient = meiliClient;
        this.gson = new GsonBuilder()
                .registerTypeAdapter(LocalDateTime.class, new LocalDateTimeAdapter())
                .create();
    }

    /**
     * Adapter for LocalDateTime serialization and deserialization.
     * This adapter is used to convert LocalDateTime objects to and from JSON
     * format.
     * example: LocalDateTime.now() -> "2023-10-01T12:00:00"
     */
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
                return LocalDateTime.now();
            }
        }
    }

    /**
     * Ensures that the Meilisearch index exists. If it does not exist, it creates
     * the index.
     */
    public void ensureIndexExists() {
        try {
            meiliClient.getIndex(INDEX_NAME);
        } catch (MeilisearchApiException e) {
            if (e.getMessage().contains("not found")) {
                try {
                    meiliClient.createIndex(INDEX_NAME, "id");
                } catch (Exception ex) {
                    throw new RuntimeException("Failed to create index: " + INDEX_NAME, ex);
                }
            } else {
                throw new RuntimeException("Failed to check index: " + INDEX_NAME, e);
            }
        } catch (Exception e) {
            throw new RuntimeException("Failed to check index: " + INDEX_NAME, e);
        }
    }

    /**
     * Converts a list of HashMap objects into a list of ArticleDto objects.
     *
     * @param hits The list of HashMap objects representing the search results.
     * @return A list of ArticleDto objects.
     */
    private List<ArticleDto> transformHits(List<HashMap<String, Object>> hits) {
        return hits.stream()
                .map(hit -> {
                    try {
                        String json = gson.toJson(hit);
                        ArticleDto article = gson.fromJson(json, ArticleDto.class);
                        if (article.getCreatedAt() == null) {
                            article.setCreatedAt(LocalDateTime.now());
                        }
                        if (article.getUpdatedAt() == null) {
                            article.setUpdatedAt(LocalDateTime.now());
                        }
                        return article;
                    } catch (Exception e) {
                        return null;
                    }
                })
                .filter(article -> article != null)
                .collect(Collectors.toList());
    }

    /**
     * Fetches hits from the Meilisearch index.
     *
     * @param query The search query.
     * @param limit The maximum number of results to return.
     * @return A list of HashMap objects representing the search results.
     * @throws Exception If an error occurs during the search.
     */
    private List<HashMap<String, Object>> fetchHits(String query, int limit) throws Exception {
        Index index = meiliClient.index(INDEX_NAME);
        SearchRequest searchRequest = new SearchRequest(query)
                .setLimit(limit);
        Searchable searchResult = index.search(searchRequest);
        return (ArrayList<HashMap<String, Object>>) searchResult.getHits();
    }

    /**
     * Searches for articles in the Meilisearch index.
     *
     * @param query The search query.
     * @param limit The maximum number of results to return.
     * @return A list of ArticleDto objects matching the search query.
     */
    public List<ArticleDto> search(String query, int limit) {
        try {
            ensureIndexExists();

            List<HashMap<String, Object>> hits = fetchHits(query, limit);

            if (hits == null || hits.isEmpty()) {
                return Collections.emptyList();
            }

            List<ArticleDto> articlesDto = transformHits(hits);

            return articlesDto;
        } catch (Exception e) {
            return Collections.emptyList();
        }
    }
}