package com.scribere.backend.config;

import com.meilisearch.sdk.Client;
import com.meilisearch.sdk.Config;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class MeilisearchConfig {

    @Value("${meilisearch.url}")
    private String meilisearchUrl;

    @Value("${meilisearch.key}")
    private String meilisearchKey;

    @Bean
    public Client meiliClient() {
        Config config = new Config(meilisearchUrl, meilisearchKey);
        return new Client(config);
    }
}