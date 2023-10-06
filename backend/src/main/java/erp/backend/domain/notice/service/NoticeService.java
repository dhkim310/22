package erp.backend.domain.notice.service;

import erp.backend.domain.emp.entity.Emp;
import erp.backend.domain.notice.dto.NoticeDetailResponse;
import erp.backend.domain.notice.dto.NoticeRequest;
import erp.backend.domain.notice.entity.Notice;
import erp.backend.domain.notice.repository.NoticeRepository;
import erp.backend.domain.noticefile.entity.NoticeFile;
import erp.backend.domain.noticefile.repository.NoticeFileRepository;
import erp.backend.global.config.security.SecurityHelper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class NoticeService {
    private final NoticeRepository noticeRepository;
    private final NoticeFileRepository noticeFileRepository;

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
        noticeRepository.save(entity);

        /*지원하지 않는 확장자 파일 제거*/
        List<MultipartFile> validatedFiles = filesValidation(files);

        /*걸러진 파일들 업로드*/
        filesUpload(validatedFiles, entity.getNoticeId());

        /*유효성 검증을 끝낸 파일들을 하나씩 꺼냄.*/
        for (MultipartFile validatedFile : validatedFiles) {

            /*File Entity 생성 후 저장*/
            NoticeFile file = new NoticeFile(validatedFile, entity);
            noticeFileRepository.save(file);

        }
    }

    @Transactional
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
    public Long noticeUpdate(Long id, NoticeRequest request) {
        Emp emp = SecurityHelper.getAccount();
        Notice entity = getNotice(id);
        Long empId = entity.getEmp().getEmpId();
        if (emp.getEmpId() != empId) {
            return -1L;
        } else {
            entity.update(request);
        }
        return entity.getNoticeId();
    }

    @Transactional
    public Boolean noticeDelete(Long id) {
        // 현재 로그인 된 사용자와 게시글의 작성자가 일치하면 글 삭제
        Emp emp = SecurityHelper.getAccount(); // 현재 로그인 된 사용자 확인
        Notice entity = getNotice(id); // 게시글 정보 확인
        Long empId = entity.getEmp().getEmpId(); // 게시글의 작성자 확인
        if (emp.getEmpId() != empId) {
            return false;
        } else {
            noticeRepository.deleteById(id);
            return true;
        }
    }

    private Notice getNotice(Long id) {
        return noticeRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException(id + "번 글은 존재하지 않는 데이터입니다."));
    }

    /*파일의 유효성 검증*/
    private List<MultipartFile> filesValidation(List<MultipartFile> files) throws IOException {
        /*접근 거부 파일 확장자명*/
        String[] accessDeniedFileExtension = {"exe", "zip"};
        /*접근 거부 파일 컨텐츠 타입*/
        String[] accessDeniedFileContentType = {"application/x-msdos-program", "application/zip"};


        ArrayList<MultipartFile> validatedFiles = new ArrayList<>();


        for (MultipartFile file : files) {
            /*원본 파일 이름*/
            String originalFileName = file.getOriginalFilename();
            /*파일의 확장자명*/
            String fileExtension = originalFileName.substring(originalFileName.lastIndexOf(".") + 1);
            /*파일의 컨텐츠타입*/
            String fileContentType = file.getContentType();

            /*accessDeniedFileExtension, accessDeniedFileContentType -> 업로드 불가*/
            if (Arrays.asList(accessDeniedFileExtension).contains(fileExtension) ||
                    Arrays.asList(accessDeniedFileContentType).contains(fileContentType)) {
                System.err.println("지원 하지 않는 파일 확장자 입니다.");
            } else {/*업로드 가능*/
                validatedFiles.add(file);
            }


        }
        return validatedFiles;
    }

    /*파일 업로드 메소드*/
    private void filesUpload(List<MultipartFile> files, Long noticeId) throws IOException {

        /*프로젝트 루트 경로*/
        String rootDir = System.getProperty("user.dir");

        for (MultipartFile file : files) {
            /*업로드 경로*/
            java.io.File uploadPath = new java.io.File(rootDir + "/backend/media/" + noticeId + "_" + file.getOriginalFilename());
            /*업로드*/
            file.transferTo(uploadPath);
        }
    }
}
