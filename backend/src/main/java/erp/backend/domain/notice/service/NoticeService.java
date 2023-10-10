package erp.backend.domain.notice.service;

import erp.backend.domain.emp.entity.Emp;
import erp.backend.domain.notice.dto.NoticeDetailResponse;
import erp.backend.domain.notice.dto.NoticeListResponse;
import erp.backend.domain.notice.dto.NoticeRequest;
import erp.backend.domain.notice.dto.UpdateNotice;
import erp.backend.domain.notice.entity.Notice;
import erp.backend.domain.notice.entity.NoticeFile;
import erp.backend.domain.notice.repository.NoticeFileRepository;
import erp.backend.domain.notice.repository.NoticeRepository;
import erp.backend.domain.upload.entity.UploadFile;
import erp.backend.domain.upload.service.UploadFileService;
import erp.backend.global.config.security.SecurityHelper;
import erp.backend.global.util.FileUtils;
import erp.backend.global.util.SchemaType;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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
    public List<NoticeListResponse> noticeList() {
        Emp emp = SecurityHelper.getAccount();
        List<Notice> list = noticeRepository.findAll();

        return list.stream()
                .map(notice -> NoticeListResponse.builder()
                        .id(notice.getNoticeId())
                        .writer(notice.getEmp().getEmpName())
                        .subject(notice.getNoticeSubject())
                        .noticeCreatedDate(notice.getNoticeCreatedDate())
                        .build()
                )
                .toList();
    }

    @Transactional
    public void noticeInsert(NoticeRequest request, List<MultipartFile> files) throws IOException {
        // 공지사항 entity 생성
        Emp emp = SecurityHelper.getAccount();
        Notice entity = Notice.builder()
                .emp(emp)
                .noticeSubject(request.getSubject())
                .noticeContent(request.getContent())
                .build();
        Notice save = noticeRepository.save(entity);

        createNoticeFileList(save, files);
    }

    @Transactional
    public void updateView(Long id) {
        Notice entity = getNotice(id);
        entity.updateViewCount();
    }

    @Transactional(readOnly = true)
    public NoticeDetailResponse getNoticeDetail(Long id) {
        Notice entity = getNotice(id);
        // 상세보기 클릭시 조회수 1 증가
        return NoticeDetailResponse.builder()
                .id(entity.getNoticeId())
                .writer(entity.getEmp().getEmpName())
                .subject(entity.getNoticeSubject())
                .content(entity.getNoticeContent())
                .views(entity.getNoticeViews())
                .noticeCreatedDate(entity.getNoticeCreatedDate())
                .noticeModifiedDate(entity.getNoticeModifiedDate())
                .build();
    }

    @Transactional
    public Long noticeUpdate(Long id, UpdateNotice request, List<MultipartFile> files) {
        Emp emp = SecurityHelper.getAccount();
        Notice entity = getNotice(id, emp);
        entity.update(request);

        List<Long> deleteUploadFileIds = request.getDeleteUploadFileIds();

        if (deleteUploadFileIds != null) {
            List<NoticeFile> noticeFileList = entity.getNoticeFileList();
            noticeFileList = noticeFileList.stream()
                    .filter(noticeFile -> !deleteUploadFileIds.contains(noticeFile.getNoticeFileId()))
                    .toList();

            noticeFileList.addAll(createNoticeFileList(entity, files));

            entity.addAllNoticeFileList(noticeFileList);
        } else {
            return null;
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

        if (isNullOrEmpty(files)) return noticeFileList;

        for (MultipartFile file : files) {
            UploadFile uploadFile = uploadFileService.createUploadFile(file, SchemaType.notice);
            NoticeFile noticeFile = new NoticeFile(notice, uploadFile);
            noticeFileList.add(noticeFile);
        }
        return noticeFileRepository.saveAll(noticeFileList);
    }

    // 게시글 존재 여부 확인
    private Notice getNotice(Long id) {
        return noticeRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException(id + "번 글은 존재하지 않는 데이터입니다."));
    }

    // 게시글 작성자와 사용자가 일치하는지 확인
    private Notice getNotice(Long id, Emp emp) {
        return noticeRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("잘못된 접근입니다."));
    }

}
