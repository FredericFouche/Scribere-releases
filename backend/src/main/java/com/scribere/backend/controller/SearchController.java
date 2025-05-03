package com.scribere.backend.controller;

import com.scribere.backend.dto.ArticleDto;
import com.scribere.backend.service.SearchService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class SearchController {

    private final SearchService searchService;

    /**
     * Constructor for SearchController.
     *
     * @param searchService The service used to perform article searches.
     */
    public SearchController(SearchService searchService) {
        this.searchService = searchService;
    }

    /**
     * Handles a GET request to search for articles.
     *
     * @param query The search query string.
     * @param limit The maximum number of results to return.
     * @return A ResponseEntity containing a list of ArticleDto objects.
     */
    @GetMapping("/search")
    public ResponseEntity<List<ArticleDto>> search(
            @RequestParam("q") String query,
            @RequestParam(value = "limit", defaultValue = "10") int limit) {
        List<ArticleDto> results = searchService.search(query, limit);
        return ResponseEntity.ok(results);
    }
}