package com.demo.filemanager.web;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import xyz.clavis.security.endpointsconfiguration.ClavisSecureController;


@RestController
public class UserController extends ClavisSecureController {

  @GetMapping("/self")
  public String self() {
    return "self";
  }
}
