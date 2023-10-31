package erp.backend.domain.uploadfile.service;

import erp.backend.domain.approval.entity.ApprovalFile;
import erp.backend.domain.approval.repository.ApprovalFileRepository;
import erp.backend.domain.board.entity.BoardFile;
import erp.backend.domain.board.repository.BoardFileRepository;
import erp.backend.domain.notice.entity.NoticeFile;
import erp.backend.domain.notice.repository.NoticeFileRepository;
import erp.backend.domain.uploadfile.entity.UploadFile;
import erp.backend.domain.uploadfile.repository.UploadFileRepository;
import erp.backend.global.util.SchemaType;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import static erp.backend.global.util.FileUtils.generatorFilePath;
import static erp.backend.global.util.FileUtils.generatorPicturePath;

@Service
@RequiredArgsConstructor
public class UploadFileService {
    private final UploadFileRepository uploadFileRepository;
    private final NoticeFileRepository noticeFileRepository;
    private final BoardFileRepository boardFileRepository;
    private final ApprovalFileRepository approvalFileRepository;


    // 지원하지 않는 확장자
    private final List<String> DENIED_EXTENSION = Arrays.asList("exe", "zip");
    private final List<String> DENIED_CONTENT_TYPE = Arrays.asList("application/x-msdos-program", "application/zip");
    private final List<String> IMG_EXTENSION = Arrays.asList("jpg", "jpeg", "png");


    @Transactional
    public UploadFile createUploadFile(MultipartFile file, SchemaType schema) {
        UploadFile uploadFile = null;
        try {
            uploadFile = uploadFile(file, schema);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        return uploadFileRepository.save(uploadFile);
    }

    @Transactional
    public UploadFile empPicture(MultipartFile file, SchemaType schema) {
        UploadFile uploadFile = null;
        try {
            uploadFile = uploadEmpPicture(file, schema);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        return uploadFileRepository.save(uploadFile);
    }

    @Transactional
    public UploadFile uploadEmpPicture(MultipartFile uploadFile, SchemaType schema) throws IOException, NullPointerException {
        String uuid = UUID.randomUUID().toString();
        String fileName = uploadFile.getOriginalFilename();
        String extension = fileName.substring(fileName.lastIndexOf(".") + 1).toLowerCase();
        String saveId = uuid + "." + extension; // S3에 저장된 파일 이름

        if (! IMG_EXTENSION.contains(extension)) {
            throw new IOException("지원 하지 않는 확장자.");
        }

        String path = generatorPicturePath(saveId, schema.getName());
        File uploadPath = new File(path);
        String newPath = "img/emp_picture/" + saveId;

        uploadFile.transferTo(uploadPath);

        return UploadFile.builder()
                .fschema(schema)
                .uuid(saveId)
                .name(fileName)
                .extension(extension)
                .path(newPath)
                .size(uploadFile.getSize())
                .build();
    }

    @Transactional
    public UploadFile uploadFile(MultipartFile uploadFile, SchemaType schema) throws IOException, NullPointerException {
        String uuid = UUID.randomUUID().toString();
        String fileName = uploadFile.getOriginalFilename();
        String extension = fileName.substring(fileName.lastIndexOf(".") + 1);
        String saveId = uuid + "." + extension; // S3에 저장된 파일 이름
        String contentType = uploadFile.getContentType();

        if (DENIED_EXTENSION.contains(extension) || DENIED_CONTENT_TYPE.contains(contentType)) {
            throw new IOException("지원 하지 않는 확장자.");
        }

        String path = generatorFilePath(saveId, schema.getName());
        File uploadPath = new File(path);
        String newPath = "/backend/src/main/resources/media/" + schema + "_file/" + saveId;

        uploadFile.transferTo(uploadPath);

        return UploadFile.builder()
                .fschema(schema)
                .uuid(saveId)
                .name(fileName)
                .extension(extension)
                .path(newPath)
                .size(uploadFile.getSize())
                .build();
    }

    @Transactional(readOnly = true)
    public List<UploadFile> fileList(Long id, SchemaType schemaType) {
        return switch (schemaType) {
            case notice -> noticeFileRepository.findByNotice_NoticeId(id).stream()
                    .map(NoticeFile::getUploadFile)
                    .collect(Collectors.toList());
            case board -> boardFileRepository.findByBoard_BoardId(id).stream()
                    .map(BoardFile::getUploadFile)
                    .collect(Collectors.toList());
            case approval -> approvalFileRepository.findByApproval_ApprovalId(id).stream()
                    .map(ApprovalFile::getUploadFile)
                    .collect(Collectors.toList());
            default -> Collections.emptyList(); // 기본값 또는 처리되지 않은 'schemaType'에 대한 예외 처리
        };
    }

    public ResponseEntity<Resource> downloadFile(String uuid) {
        UploadFile uploadFile = uploadFileRepository.findUploadFileByUuid(uuid);
        String fileName = uploadFile.getName();
        String downloadPath = System.getProperty("user.dir") + uploadFile.getPath();

        File file = new File(downloadPath);
        if (!file.exists()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        try {
            Resource resource = new FileSystemResource(file);

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
            headers.setContentDispositionFormData("attachment", fileName);

            return ResponseEntity.ok()
                    .headers(headers)
                    .body(resource);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
}
