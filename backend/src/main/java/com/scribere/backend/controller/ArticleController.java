package com.scribere.backend.controller;

import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.scribere.backend.dto.ArticleDto;
import com.scribere.backend.service.ArticleService;

@RestController
@RequestMapping("/api")
public class ArticleController {
    private final ArticleService articleService;

    public ArticleController(ArticleService articleService) {
        this.articleService = articleService;
    }

    /**
     * Lists articles, optionally filtered by tag.
     *
     * @param pageable Pagination information
     * @return A page of article DTOs
     */
    @GetMapping("/articles")
    public Page<ArticleDto> list(@RequestParam(required = false) Pageable pageable) {
        return articleService.findAll(pageable);
    }

    /**
     * Lists articles filtered by a specific tag.
     *
     * @param tag      The tag to filter by
     * @param pageable Pagination information
     * @return A page of article DTOs
     */
    @GetMapping("/articles/tag/{tag}")
    public Page<ArticleDto> listByTag(@PathVariable String tag, Pageable pageable) {
        return articleService.findByTag(pageable, tag);
    }

    /**
     * Retrieves a single article by its id.
     * 
     * @param id The id of the article
     * @return The article DTO
     */
    @GetMapping("/articles/{id}")
    public ResponseEntity<ArticleDto> get(@PathVariable UUID id) {
        return articleService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    /**
     * Creates a new article.
     *
     * @param articleDto The article data transfer object
     * @return The created article
     */
    @PostMapping("/articles")
    public ResponseEntity<ArticleDto> create(@RequestBody ArticleDto articleDto) {
        ArticleDto savedArticle = articleService.save(articleDto);
        return ResponseEntity.ok(savedArticle);
    }
}
