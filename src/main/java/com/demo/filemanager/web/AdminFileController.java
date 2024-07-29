package com.demo.filemanager.web;

import com.demo.filemanager.model.AjaxResponse;
import com.demo.filemanager.service.FileServiceFactory;
import jakarta.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.Iterator;
import java.util.Optional;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

@RestController
@CrossOrigin
public class AdminFileController extends FileController {
  public AdminFileController(FileServiceFactory serviceFactory) {
    super(serviceFactory);
  }

  @GetMapping("/addFolder/{folderName}")
  public ResponseEntity<?> addFolder(@PathVariable String folderName,
                                     @RequestParam String folderPath) {
    return ResponseEntity.ok(serviceFactory.getInstance().addFolder(folderName, folderPath));

  }

  @GetMapping("/deleteFolder/{folderName}")
  @PreAuthorize("hasRole(@configModel.roles.moderatorRole)")
  public ResponseEntity<?> deleteFolder(@PathVariable String folderName,
                                        @RequestParam String folderPath) {
    return ResponseEntity.ok(serviceFactory.getInstance().deleteFolder(folderName, folderPath));
  }

  @PostMapping("/uploadFile")
  @PreAuthorize("hasRole(configModel.roles.moderatorRole)")
  public ResponseEntity<?> UploadFile(MultipartHttpServletRequest request,
                                      @RequestParam Optional<String> dir,
                                      @RequestParam Optional<String> type,
                                      @RequestParam Optional<Long> appId,
                                      HttpServletRequest servletRequest)
      throws IOException {
    Iterator<String> itr = request.getFileNames();
    MultipartFile file = request.getFile(itr.next());
    if (appId.isPresent() && !dir.isPresent()) {
      // todo code to fetch any application sub-directory should go here
    }
    AjaxResponse body = serviceFactory.getInstance().upload(file, dir, type);
    String url = servletRequest.getRequestURL()
        .substring(0, servletRequest.getRequestURL().lastIndexOf("/") + 1)
        .concat("getFile/").concat(file.getOriginalFilename()).concat("?filePath=");
    String urlAppend = "";
    if (dir.isPresent()) {
      if (type.isPresent()) {
        urlAppend = urlAppend.concat(
            dir.get().concat(serviceFactory.getFileSeparator()).concat(type.get()));
      } else {
        urlAppend = urlAppend.concat(dir.get());
      }
    } else if (type.isPresent()) {
      urlAppend = urlAppend.concat(type.get());
    }
    urlAppend =
        urlAppend.concat(serviceFactory.getFileSeparator().concat(file.getOriginalFilename()));
    body.setUrl(url.concat(urlAppend));
    return ResponseEntity.ok(body);

  }

  @GetMapping("/deleteFile")
  @PreAuthorize("hasRole('${this.roles.moderator-role}')")
  public ResponseEntity<?> deleteFile(@RequestParam String filePath) {
    return ResponseEntity.ok(serviceFactory.getInstance().delete(filePath));
  }
}
