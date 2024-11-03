import {environment} from "../environments/environment";

export const API_ENDPOINTS = {
  FILES: {
    GET_FILE_ROOT: environment.serviceUrl + 'getFileRoot',
    GET_DIRS: (dir = '') => environment.serviceUrl + `listDirectories?dir=${dir}`,
    GET_FILES: (file = '') => environment.serviceUrl + `listFiles?dir=${file}`,
    GET_FILE: (encodedFileName = '', urlPath = '') => environment.serviceUrl + `getFile/${encodedFileName}?filePath=${urlPath}`,
    UPLOAD_FILE: (dir: string) => environment.serviceUrl + `uploadFile?dir=${dir}`,
    DELETE_FILE: (filePath: string) => environment.serviceUrl + `deleteFile?filePath=${filePath}`,

  },
  FOLDER: {
    ADD_FOLDER: (folderName: string, folderPath: string) => environment.serviceUrl + `addFolder/ + ${folderName}?folderPath=${folderPath}`,
    DELETE_FOLDER: (folderName: string, folderPath: string) => environment.serviceUrl + `deleteFolder/${folderName}?folderPath=${folderPath}`,

  }
}

