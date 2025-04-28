package com.scribere.backend.service;

import com.scribere.backend.dto.ArticleDto;
import com.scribere.backend.event.ArticleSavedEvent;
import com.scribere.backend.mapper.ArticleMapper;
import com.scribere.backend.model.Article;
import com.scribere.backend.repository.ArticleRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

@Service
public class ArticleService {

    private static final Logger logger = LoggerFactory.getLogger(ArticleService.class);
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

    @Transactional(readOnly = true)
    public Page<ArticleDto> findByTagSlug(String tagSlug, Pageable pageable) {
        logger.info("Recherche d'articles avec le tag: {}", tagSlug);
        return articleRepository.findByTagSlugOrderByCreatedAtDesc(tagSlug, pageable)
                .map(articleMapper::toDto);
    }

    @Transactional
    public ArticleDto save(ArticleDto articleDto) {
        logger.info("Saving article: {}", articleDto.getTitle());

        // Implémenter la méthode toEntity dans ArticleMapper
        Article article = articleMapper.toEntity(articleDto);

        // Sauvegarder l'article
        article = articleRepository.save(article);

        // Convertir en DTO
        ArticleDto savedArticleDto = articleMapper.toDto(article);

        // Publier l'événement pour l'indexation
        logger.info("Publishing ArticleSavedEvent for article: {}", savedArticleDto.getTitle());
        eventPublisher.publishEvent(new ArticleSavedEvent(savedArticleDto));

        return savedArticleDto;
    }
}