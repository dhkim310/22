package erp.backend.domain.notice.service;

import erp.backend.domain.emp.entity.Emp;
import erp.backend.domain.notice.dto.*;
import erp.backend.domain.notice.entity.Notice;
import erp.backend.domain.notice.entity.NoticeFile;
import erp.backend.domain.notice.repository.NoticeFileRepository;
import erp.backend.domain.notice.repository.NoticeRepository;
import erp.backend.domain.uploadfile.entity.UploadFile;
import erp.backend.domain.uploadfile.service.UploadFileService;
import erp.backend.global.config.security.SecurityHelper;
import erp.backend.global.util.FileUtils;
import erp.backend.global.util.SchemaType;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import static erp.backend.global.util.ArrayUtils.isNullOrEmpty;
import static erp.backend.global.util.FileUtils.generatorFilePath;

@Service
@RequiredArgsConstructor
@Slf4j
public class NoticeService {
    private final NoticeRepository noticeRepository;
    private final NoticeFileRepository noticeFileRepository;

    private final UploadFileService uploadFileService;

    @Transactional(readOnly = true)
    public NoticeListResult boardListResult(Pageable pageable) {
        List<NoticeListResponse> noticeListResponses = new ArrayList<>();
        List<Notice> list = noticeRepository.findAll();

        for (Notice notice : list) {
            NoticeListResponse response = NoticeListResponse.fromNotice(notice);
            noticeListResponses.add(response);
        }

        int start = (int) pageable.getOffset();
        int end = Math.min((start + pageable.getPageSize()), noticeListResponses.size());
        List<NoticeListResponse> sublist = noticeListResponses.subList(start, end);

        Page<NoticeListResponse> page = new PageImpl<>(sublist, pageable, noticeListResponses.size());

        return new NoticeListResult(pageable.getPageNumber(), noticeListResponses.size(), pageable.getPageSize(), page);
    }

    @Transactional(readOnly = true)
    public List<NoticeMainListResponse> noticeMainListResponses() {
        List<Notice> list = noticeRepository.findTop4ByOrderByNoticeIdDesc();

        return list.stream()
                .map(notice -> NoticeMainListResponse.builder()
                        .id(notice.getNoticeId())
                        .subject(notice.getNoticeSubject())
                        .build()
                )
                .toList();

    }


    @Transactional
    public Long noticeInsert(NoticeRequest request, List<MultipartFile> files) throws IOException {
        // 공지사항 entity 생성
        Emp emp = SecurityHelper.getAccount();
        Notice entity = Notice.builder()
                .emp(emp)
                .noticeSubject(request.getSubject())
                .noticeContent(request.getContent())
                .build();
        noticeRepository.save(entity);

        createNoticeFileList(entity, files);

        return entity.getNoticeId();
    }

    @Transactional(readOnly = true) // 읽기 전용
    public NoticeDetailResponse noticeDetail(Long id) {
        Notice entity = getNotice(id);
        List<NoticeFile> noticeFiles = entity.getNoticeFileList();

        return NoticeDetailResponse.builder()
                .id(entity.getNoticeId())
                .writer(entity.getEmp().getEmpName())
                .subject(entity.getNoticeSubject())
                .content(entity.getNoticeContent())
                .views(entity.getNoticeViews())
                .noticeCreatedDate(entity.getNoticeCreatedDate())
                .noticeModifiedDate(entity.getNoticeModifiedDate())
                .noticeFileList(noticeFiles)
                .build();
    }

    @Transactional
    public Long noticeUpdate(Long id, NoticeUpdate request, List<MultipartFile> files) {
        Emp emp = SecurityHelper.getAccount();
        Notice entity = getNotice(id, emp);
        entity.update(request);

        List<Long> deleteUploadFileIds = request.getDeleteUploadFileIds();

        if (deleteUploadFileIds != null || !entity.getNoticeFileList().isEmpty()) {
            List<NoticeFile> noticeFileList = entity.getNoticeFileList();
            noticeFileList.removeIf(noticeFile -> deleteUploadFileIds != null && deleteUploadFileIds.contains(noticeFile.getNoticeFileId()));
        }

        if (files != null && !files.isEmpty()) {
            List<NoticeFile> newFiles = createNoticeFileList(entity, files);
            entity.getNoticeFileList().clear(); // 현재 파일 목록을 모두 지우고
            entity.getNoticeFileList().addAll(newFiles); // 새로운 파일 목록으로 교체
        } else {
            // files가 null이면 해당 공지사항 원래 있던 파일 삭제
            entity.getNoticeFileList().clear();
        }

        return entity.getNoticeId();
    }

    @Transactional
    public void noticeDelete(Long id) {
        Emp emp = SecurityHelper.getAccount(); // 현재 로그인 된 사용자 확인
        Notice entity = getNotice(id, emp);

        // 연결된 파일 정보를 삭제
        List<NoticeFile> noticeFiles = entity.getNoticeFileList();
        for (NoticeFile noticeFile : noticeFiles) {
            // 파일 시스템에서 삭제
            UploadFile uploadFile = noticeFile.getUploadFile();
            FileUtils.deleteFile(generatorFilePath(uploadFile.getUuid(), uploadFile.getFschema().getName()));
            // 파일 데이터베이스 테이블에서 삭제
            noticeFileRepository.delete(noticeFile);
        }

        // 공지사항 삭제
        noticeRepository.delete(entity);
    }

    private List<NoticeFile> createNoticeFileList(Notice notice, List<MultipartFile> files) {
        List<NoticeFile> noticeFileList = new ArrayList<>();

        if (isNullOrEmpty(files)) {
            return noticeFileList;
        } else {
            for (MultipartFile file : files) {
                UploadFile uploadFile = uploadFileService.createUploadFile(file, SchemaType.notice);
                NoticeFile noticeFile = new NoticeFile(notice, uploadFile);
                noticeFileList.add(noticeFile);
            }
        }
        return noticeFileRepository.saveAll(noticeFileList);
    }

    @Transactional
    public void updateView(Long id) {
        Notice entity = getNotice(id);
        entity.updateViewCount();
    }

    // 게시글 존재 여부 확인
    private Notice getNotice(Long id) {
        return noticeRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 글은 존재하지 않는 데이터입니다."));
    }

    // 게시글 작성자와 사용자가 일치하는지 확인
    private Notice getNotice(Long id, Emp emp) {
        return noticeRepository.findById(id)
                .filter(notice -> notice.getEmp().getEmpId().equals(emp.getEmpId()))
                .orElseThrow(() -> new IllegalArgumentException("현재 로그인 된 사용자와 게시글 작성자가 일치하지 않습니다."));
    }
}

