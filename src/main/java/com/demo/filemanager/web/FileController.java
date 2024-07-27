package com.demo.filemanager.web;

import com.demo.filemanager.model.ApplicationView;
import com.demo.filemanager.model.FileView;
import com.demo.filemanager.service.FileServiceFactory;
import jakarta.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.InputStream;
import java.nio.file.Files;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import org.apache.commons.io.FileUtils;
import org.apache.commons.io.IOUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import xyz.clavis.security.endpointsconfiguration.ClavisSecureController;



public class FileController extends ClavisSecureController {

  Logger log = LoggerFactory.getLogger(getClass());

  protected final FileServiceFactory serviceFactory;

  @Value("${file.root}")
  private String FILE_ROOT;

  public FileController(FileServiceFactory serviceFactory) {
    this.serviceFactory = serviceFactory;
  }

  @GetMapping("/listDirectories")
  public List<FileView> listDirectories(@RequestParam Optional<String> dir) {
    return serviceFactory.getInstance().listDirectories(dir);
  }

  @GetMapping("/listFiles")
  public List<FileView> listFiles(@RequestParam Optional<String> dir) {
    return serviceFactory.getInstance().listFiles(dir);
  }

  private final List<String> inlineFileTypes =
      Arrays.asList(".jpg", ".jpeg", ".png", ".gif", ".pdf");


  @GetMapping("/getFile/{fileName}")
  public void getFile(@PathVariable String fileName, @RequestParam String filePath,
                      HttpServletResponse response) {
    File file = serviceFactory.getInstance().getFile(filePath);
    try (InputStream in = FileUtils.openInputStream(file)) {
      response.setContentType(Files.probeContentType(file.toPath()));
      response.getOutputStream().write(IOUtils.toByteArray(in));
      response.flushBuffer();
    } catch (Exception e) {
      log.error("error occured getting the file. Exception is ---->", e);
    }
  }


  @GetMapping("/getApplication/{id}")
  public ApplicationView getApplication(@PathVariable Long id) {
    // todo code to fetch any application sub-directory should go here
    return null;
  }

  @GetMapping("/getFileRoot")
  public String getFileRoot() {
    return FILE_ROOT;
  }

}
