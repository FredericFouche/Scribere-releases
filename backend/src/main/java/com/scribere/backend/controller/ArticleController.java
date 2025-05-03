package com.scribere.backend.controller;

import com.scribere.backend.dto.ArticleDto;
import com.scribere.backend.mapper.ArticleMapper;
import com.scribere.backend.repository.ArticleRepository;
import com.scribere.backend.service.ArticleService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class ArticleController {
    private final ArticleService articleService;

    /**
     * Lists articles, optionally filtered by tag.
     *
     * @param tag      Optional tag slug to filter articles
     * @param pageable Pagination information
     * @return A page of article DTOs
     */
    @GetMapping("/articles")
    public Page<ArticleDto> list(
            @RequestParam(required = false) String tag,
            Pageable pageable) {

        if (tag != null && !tag.isEmpty()) {
            return articleService.findByTagSlug(tag, pageable);
        } else {
            return articleService.findAll(pageable);
        }
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
