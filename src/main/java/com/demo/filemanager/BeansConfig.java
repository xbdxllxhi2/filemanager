package com.demo.filemanager;

import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.web.SecurityFilterChain;
import xyz.clavis.security.SecurityConfig;

@Configuration
public class BeansConfig {
  private final SecurityConfig securityConfig;

  public BeansConfig(SecurityConfig securityConfig) {
    this.securityConfig = securityConfig;
  }


  @Bean
  @ConditionalOnMissingBean
  JwtDecoder jwtDecoder() {
    return token -> null;
  }

  @Bean
  @ConditionalOnMissingBean
  SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
    return securityConfig.securityFilterChain(httpSecurity);
  }
}
