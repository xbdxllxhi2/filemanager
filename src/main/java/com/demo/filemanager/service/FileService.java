package com.demo.filemanager.service;

import java.io.File;
import java.util.List;
import java.util.Optional;

import org.springframework.web.multipart.MultipartFile;

import com.demo.filemanager.model.AjaxResponse;
import com.demo.filemanager.model.FileView;

public interface FileService {
	String STORAGE_MODE_NATIVE = "native";
	String STORAGE_MODE_CLOUD = "cloud";

	public List<FileView> listDirectories(Optional<String> dir);

	List<FileView> listFiles(Optional<String> dir);

	File getFile(String filePath);

	AjaxResponse upload(MultipartFile file, Optional<String> dir, Optional<String> type);

	AjaxResponse delete(String filePath);
	
	AjaxResponse addFolder(String folderName, String folderPath);

	AjaxResponse deleteFolder(String folderName, String folderPath);
}
