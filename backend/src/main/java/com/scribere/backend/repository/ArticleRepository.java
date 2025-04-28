package com.scribere.backend.repository;

import com.scribere.backend.model.Article;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface ArticleRepository extends JpaRepository<Article, UUID> {
    Page<Article> findAllByOrderByCreatedAtDesc(Pageable pageable);

    @Query("SELECT a FROM Article a JOIN a.tags t WHERE t.slug = :tagSlug ORDER BY a.createdAt DESC")
    Page<Article> findByTagSlugOrderByCreatedAtDesc(@Param("tagSlug") String tagSlug, Pageable pageable);
}
