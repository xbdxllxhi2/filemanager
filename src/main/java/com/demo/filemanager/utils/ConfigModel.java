package com.demo.filemanager.utils;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@ConfigurationProperties(prefix = "this")
@Configuration
@Getter
@Setter
public class ConfigModel {
  RolesModel roles;

  @Getter
  @Setter
  public static class RolesModel {
    String moderatorRole;
  }
}

