package erp.backend.domain.notice.service;

import erp.backend.domain.emp.entity.Emp;
import erp.backend.domain.notice.dto.NoticeDetailResponse;
import erp.backend.domain.notice.dto.NoticeRequest;
import erp.backend.domain.notice.dto.UpdateNotice;
import erp.backend.domain.notice.entity.Notice;
import erp.backend.domain.notice.entity.NoticeFile;
import erp.backend.domain.notice.repository.NoticeFileRepository;
import erp.backend.domain.notice.repository.NoticeRepository;
import erp.backend.domain.upload.entity.UploadFile;
import erp.backend.domain.upload.service.UploadFileService;
import erp.backend.global.config.security.SecurityHelper;
import erp.backend.global.util.SchemaType;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import static erp.backend.global.util.ArrayUtils.isNullOrEmpty;

@Service
@RequiredArgsConstructor
@Slf4j
public class NoticeService {
    private final NoticeRepository noticeRepository;
    private final NoticeFileRepository noticeFileRepository;

    private final UploadFileService uploadFileService;

    @Transactional
    public void noticeInsert(NoticeRequest request, List<MultipartFile> files) throws IOException {
        // 공지사항 entity 생성
        Emp emp = SecurityHelper.getAccount();
        Notice entity = Notice.builder()
                .emp(emp)
                .noticeSubject(request.getSubject())
                .noticeContent(request.getContent())
                .noticeViews(0)
                .noticeCreatedDate(LocalDateTime.now())
                .build();
        Notice save = noticeRepository.save(entity);

        createNoticeFileList(save, files);
    }


    @Transactional(readOnly = true)
    public NoticeDetailResponse getNoticeDetail(Long id) {
        Notice entity = getNotice(id);
        // 상세보기 클릭시 조회수 1 증가
        int view = entity.updateViewCount(entity.getNoticeViews()).getNoticeViews();
        return NoticeDetailResponse.builder()
                .id(entity.getNoticeId())
                .writer(entity.getEmp().getEmpName())
                .subject(entity.getNoticeSubject())
                .content(entity.getNoticeContent())
                .views(view)
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

        List<NoticeFile> noticeFileList = entity.getNoticeFileList();
        noticeFileList = noticeFileList.stream()
                .filter(noticeFile -> !deleteUploadFileIds.contains(noticeFile.getId()))
                .toList();

        noticeFileList.addAll(createNoticeFileList(entity, files));

        entity.addAllNoticeFileList(noticeFileList);
        return entity.getNoticeId();
    }

    @Transactional
    public void noticeDelete(Long id) {
        // 현재 로그인 된 사용자와 게시글의 작성자가 일치하면 글 삭제
        Emp emp = SecurityHelper.getAccount(); // 현재 로그인 된 사용자 확인
        Notice entity = getNotice(id, emp); // 게시글 정보 확인
        noticeRepository.delete(entity);
    }

    private List<NoticeFile> createNoticeFileList(Notice notice, List<MultipartFile> files) {
        List<NoticeFile> noticeFileList = new ArrayList<>();

        if (isNullOrEmpty(files)) return noticeFileList;

        for (MultipartFile file : files) {
            UploadFile uploadFile = uploadFileService.createUploadFile(file, SchemaType.NOTICE);
            NoticeFile noticeFile = new NoticeFile(notice, uploadFile);
            noticeFileList.add(noticeFile);
        }
        return noticeFileRepository.saveAll(noticeFileList);
    }

    private Notice getNotice(Long id) {
        return noticeRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException(id + "번 글은 존재하지 않는 데이터입니다."));
    }

    private Notice getNotice(Long id, Emp emp) {
        return noticeRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("잘못된 접근입니다."));
    }

}
