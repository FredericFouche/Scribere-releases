package com.scribere.backend.repository;

import com.scribere.backend.model.Tag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.UUID;

@Repository
public interface TagRepository extends JpaRepository<Tag, UUID> {
    List<Tag> findByName(String name);

    List<Tag> findBySlug(String slug);

    @Query("SELECT t FROM Tag t WHERE LOWER(t.name) LIKE LOWER(CONCAT(:prefix, '%'))")
    List<Tag> findByNameStartingWithIgnoreCase(@Param("prefix") String prefix);
}
