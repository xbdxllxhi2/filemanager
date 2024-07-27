package com.demo.filemanager;

import static org.junit.jupiter.api.Assertions.assertEquals;

import com.demo.filemanager.model.FileView;
import com.demo.filemanager.service.FileService;
import com.demo.filemanager.service.FileServiceFactory;
import java.util.List;
import java.util.Optional;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class FilemanagerApplicationTests {
  @Autowired
  FileServiceFactory serviceFactory;

  @Test
  public void testLoads() {
    FileService service = serviceFactory.getInstance();
    List<FileView> dirs = service.listDirectories(Optional.empty());
    assertEquals(dirs.size(), 2);
  }

}
