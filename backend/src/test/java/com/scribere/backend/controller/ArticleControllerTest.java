package com.scribere.backend.controller;

import com.scribere.backend.mapper.ArticleMapper;
import com.scribere.backend.model.Article;
import com.scribere.backend.repository.ArticleRepository;
import com.scribere.backend.dto.ArticleDto;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.UUID;

import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.Matchers.is;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(ArticleController.class)
public class ArticleControllerTest {

        @Autowired
        private MockMvc mockMvc;

        @MockBean
        private ArticleRepository articleRepository;

        @MockBean
        private ArticleMapper articleMapper;

        @Test
        public void testListArticles() throws Exception {
                // Création des articles de test avec UUID
                UUID uuid1 = UUID.fromString("f47ac10b-58cc-4372-a567-0e02b2c3d479");
                UUID uuid2 = UUID.fromString("f47ac10b-58cc-4372-a567-0e02b2c3d480");

                Article article1 = new Article();
                article1.setId(uuid1);
                article1.setTitle("Premier article");
                article1.setSlug("premier-article");
                article1.setCoverImgUrl("https://example.com/image1.jpg");
                article1.setReadTime(5);
                article1.setContent("Contenu du premier article");
                article1.setCreatedAt(LocalDateTime.now());
                article1.setUpdatedAt(LocalDateTime.now());

                Article article2 = new Article();
                article2.setId(uuid2);
                article2.setTitle("Deuxième article");
                article2.setSlug("deuxieme-article");
                article2.setCoverImgUrl("https://example.com/image2.jpg");
                article2.setReadTime(10);
                article2.setContent("Contenu du deuxième article");
                article2.setCreatedAt(LocalDateTime.now().minusDays(1));
                article2.setUpdatedAt(LocalDateTime.now().minusDays(1));

                // Mock du repository
                when(articleRepository.findAllByOrderByCreatedAtDesc(any(PageRequest.class)))
                                .thenReturn(new PageImpl<>(Arrays.asList(article1, article2)));

                // Mock du mapper
                ArticleDto dto1 = new ArticleDto();
                dto1.setId(article1.getId());
                dto1.setTitle(article1.getTitle());
                dto1.setSlug(article1.getSlug());
                dto1.setCoverImgUrl(article1.getCoverImgUrl());
                dto1.setReadTime(article1.getReadTime());
                dto1.setContent(article1.getContent());
                dto1.setCreatedAt(article1.getCreatedAt());
                dto1.setUpdatedAt(article1.getUpdatedAt());
                when(articleMapper.toDto(article1)).thenReturn(dto1);

                ArticleDto dto2 = new ArticleDto();
                dto2.setId(article2.getId());
                dto2.setTitle(article2.getTitle());
                dto2.setSlug(article2.getSlug());
                dto2.setCoverImgUrl(article2.getCoverImgUrl());
                dto2.setReadTime(article2.getReadTime());
                dto2.setContent(article2.getContent());
                dto2.setCreatedAt(article2.getCreatedAt());
                dto2.setUpdatedAt(article2.getUpdatedAt());
                when(articleMapper.toDto(article2)).thenReturn(dto2);

                // Exécution et assertions
                mockMvc.perform(get("/api/articles?page=0&size=10")
                                .contentType(MediaType.APPLICATION_JSON))
                                .andExpect(status().isOk())
                                .andExpect(jsonPath("$.content", hasSize(2)))
                                .andExpect(jsonPath("$.content[0].id", is(uuid1.toString())))
                                .andExpect(jsonPath("$.content[0].title", is("Premier article")))
                                .andExpect(jsonPath("$.content[0].slug", is("premier-article")))
                                .andExpect(jsonPath("$.content[0].coverImgUrl", is("https://example.com/image1.jpg")))
                                .andExpect(jsonPath("$.content[0].readTime", is(5)))
                                .andExpect(jsonPath("$.content[1].id", is(uuid2.toString())))
                                .andExpect(jsonPath("$.content[1].title", is("Deuxième article")))
                                .andExpect(jsonPath("$.content[1].slug", is("deuxieme-article")))
                                .andExpect(jsonPath("$.content[1].coverImgUrl", is("https://example.com/image2.jpg")))
                                .andExpect(jsonPath("$.content[1].readTime", is(10)));
        }
}
