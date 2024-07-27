package com.demo.filemanager;

import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.oauth2.jwt.JwtDecoder;

@Configuration
public class BeansConfig {

  @Bean
  @ConditionalOnMissingBean
  JwtDecoder jwtDecoder() {
    return token -> null;
  }
}
