package com.scribere.backend.service;

import com.scribere.backend.dto.ArticleDto;
import com.scribere.backend.event.ArticleSavedEvent;
import com.scribere.backend.mapper.ArticleMapper;
import com.scribere.backend.model.Article;
import com.scribere.backend.model.Tag;
import com.scribere.backend.repository.ArticleRepository;

import java.util.Optional;
import java.util.UUID;

import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

@Service
public class ArticleService {
    private final ArticleRepository articleRepository;
    private final ArticleMapper articleMapper;
    private final ApplicationEventPublisher eventPublisher;

    public ArticleService(
            ArticleRepository articleRepository,
            ArticleMapper articleMapper,
            ApplicationEventPublisher eventPublisher) {
        this.articleRepository = articleRepository;
        this.articleMapper = articleMapper;
        this.eventPublisher = eventPublisher;
    }

    /**
     * Find an article by its slug.
     *
     * @param slug The slug of the article to find.
     * @return The article with the given slug.
     */
    @Transactional(readOnly = true)
    public Page<ArticleDto> findByTagSlug(String tagSlug, Pageable pageable) {
        return articleRepository.findByTagSlugOrderByCreatedAtDesc(tagSlug, pageable)
                .map(articleMapper::toDto);
    }

    /**
     * Find all articles ordered by creation date (newest first)
     *
     * @param pageable Pagination information
     * @return A page of articles DTOs
     */
    @Transactional(readOnly = true)
    public Page<ArticleDto> findAll(Pageable pageable) {
        return articleRepository.findAllByOrderByCreatedAtDesc(pageable)
                .map(articleMapper::toDto);
    }

    /**
     * Save an article in db and publish an event after saving for indexing in
     * Meilisearch.
     *
     * @param articleDto The article to save.
     * @return The saved article.
     */
    @Transactional
    public ArticleDto save(ArticleDto articleDto) {
        Article article = articleMapper.toEntity(articleDto);
        article = articleRepository.save(article);
        ArticleDto savedArticleDto = articleMapper.toDto(article);
        eventPublisher.publishEvent(new ArticleSavedEvent(savedArticleDto));
        return savedArticleDto;
    }

    /**
     * Find an article by its id.
     *
     * @param id The id of the article to find.
     * @return The article with the given id.
     */
    @Transactional(readOnly = true)
    public Optional<ArticleDto> findById(UUID id) {
        return articleRepository.findById(id)
                .map(articleMapper::toDto);
    }

    /**
     * Find all article by tag.
     * 
     * @param tag      The tag name.
     * @param pageable Pagination information
     * @return A page of articles DTO
     */
    @Transactional(readOnly = true)
    public Page<ArticleDto> findByTag(Pageable pageable, String tag) {
        return articleRepository.findByTag(tag, pageable)
                .map(articleMapper::toDto);
    }
}