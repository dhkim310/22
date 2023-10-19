package erp.backend.domain.uploadfile.controller;

import erp.backend.global.util.FileUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.File;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class UploadFileController {

    @GetMapping(value = "/file/{uuid}")
    public ResponseEntity<Resource> fileDownload(@PathVariable("uuid") String uuid) {
        String download = "download";
        String filePath = FileUtils.generatorFilePath(uuid, download);

        File file = new File(filePath);
        if (!file.exists()) {
            // 파일이 존재하지 않는 경우 404 응답을 반환
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        Resource fileResource = new FileSystemResource(file);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + fileResource.getFilename() + "\"")
                .body(fileResource);
    }
}


