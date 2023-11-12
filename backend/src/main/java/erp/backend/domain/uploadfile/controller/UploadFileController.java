package erp.backend.domain.uploadfile.controller;

import erp.backend.domain.uploadfile.service.UploadFileService;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class UploadFileController {
    private final UploadFileService uploadFileService;

    @GetMapping("/file/{uuid}")
    private ResponseEntity<Resource> fileDownload(@PathVariable("uuid") String uuid) {
        return uploadFileService.downloadFile(uuid);
    }

}