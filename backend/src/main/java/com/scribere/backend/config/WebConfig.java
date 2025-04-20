package com.scribere.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.data.web.config.PageableHandlerMethodArgumentResolverCustomizer;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Bean
    public PageableHandlerMethodArgumentResolverCustomizer pageableResolverCustomizer() {
        return pageableResolver -> {
            pageableResolver.setFallbackPageable(org.springframework.data.domain.PageRequest.of(0, 10));
            pageableResolver.setOneIndexedParameters(false);
        };
    }
}
