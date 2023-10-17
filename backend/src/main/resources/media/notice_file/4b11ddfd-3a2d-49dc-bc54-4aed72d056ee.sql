-- 부서
DROP TABLE IF EXISTS `final`.DEPT;
CREATE TABLE `final`.DEPT
(
    `DEPT_ID`   BIGINT       NOT NULL COMMENT '부서코드', -- 부서코드
    `DEPT_NAME` VARCHAR(255) NOT NULL COMMENT '부서명',   -- 부서명
    PRIMARY KEY (`DEPT_ID`)
) ENGINE = InnoDB COMMENT '부서';

-- 사원
DROP TABLE IF EXISTS `final`.EMP;
CREATE TABLE `final`.EMP
(
    `EMP_ID`            BIGINT       NOT NULL AUTO_INCREMENT COMMENT '사원코드', -- 사원코드
    `EMP_DEPT_ID`       BIGINT       NOT NULL COMMENT '부서코드',                -- 부서코드
    `EMP_NAME`          VARCHAR(255) NOT NULL COMMENT '이름',                    -- 이름
    `EMP_EMAIL`         VARCHAR(255) NOT NULL COMMENT '이메일',                  -- 이메일
    `EMP_PASSWORD`      VARCHAR(255) NOT NULL COMMENT '비밀번호',                -- 비밀번호
    `EMP_PHONENUMBER`   VARCHAR(255) NOT NULL COMMENT '휴대폰번호',              -- 휴대폰번호
    `EMP_POSITION`      VARCHAR(255) NOT NULL COMMENT '직급',                    -- 직급
    `EMP_ROLES`         VARCHAR(255) NOT NULL COMMENT '권한',                    -- 권한
    `EMP_BIRTHDAY`      DATE         NOT NULL COMMENT '생년월일',                -- 생년월일
    `EMP_STARTDATE`     DATE         NOT NULL COMMENT '입사일',                  -- 입사일
    `EMP_ENDDATE`       DATE NULL COMMENT '퇴사일',                              -- 퇴사일
    `EMP_STATUS`        VARCHAR(255) NOT NULL COMMENT '재직상태',                -- 재직상태
    `EMP_GENDER`        VARCHAR(255) NOT NULL COMMENT '성별',                    -- 성별
    `EMP_ADDRESS`       VARCHAR(255) NOT NULL COMMENT '주소',                    -- 주소
    `EMP_DETAILADDRESS` VARCHAR(255) NULL COMMENT '상세주소',                    -- 상세주소
    PRIMARY KEY (`EMP_ID`)
) ENGINE = InnoDB COMMENT '사원' AUTO_INCREMENT = 101;

-- EMP_EMAIL 유니크 키 추가
ALTER TABLE `final`.EMP
    ADD CONSTRAINT `UK_EMP_EMAIL` UNIQUE (`EMP_EMAIL`);

ALTER TABLE `final`.EMP
    ADD CONSTRAINT `FK_EMP_DEPT` FOREIGN KEY (`EMP_DEPT_ID`) REFERENCES `final`.DEPT (`DEPT_ID`);

-- 사원일정
DROP TABLE IF EXISTS `final`.COMPANYSCHEDULE;
CREATE TABLE `final`.COMPANYSCHEDULE
(
    `COMPANYSCHEDULE_ID`      BIGINT       NOT NULL AUTO_INCREMENT COMMENT '사내일정코드', -- 사내일정코드
    `COMPANYSCHEDULE_EMP_ID`  BIGINT       NOT NULL COMMENT '사원코드',                    -- 사원코드
    `COMPANYSCHEDULE_CONTENT` DATE         NOT NULL COMMENT '사내일정날짜',                -- 사내일정날짜
    `COMPANYSCHEDULE_DATE`    VARCHAR(255) NOT NULL COMMENT '사내일정내용',                -- 사내일정내용
    PRIMARY KEY (`COMPANYSCHEDULE_ID`)
) ENGINE = InnoDB COMMENT '사내일정' AUTO_INCREMENT = 1;

ALTER TABLE `final`.COMPANYSCHEDULE
    ADD CONSTRAINT `FK_COMPANYSCHEDULE_EMP` FOREIGN KEY (`COMPANYSCHEDULE_EMP_ID`) REFERENCES `final`.EMP (`EMP_ID`);


-- 메모
DROP TABLE IF EXISTS `final`.MEMO;
CREATE TABLE `final`.MEMO
(
    `MEMO_ID`      BIGINT NOT NULL AUTO_INCREMENT COMMENT '메모코드', -- 메모코드
    `MEMO_EMP_ID`  BIGINT NOT NULL COMMENT '사원코드',                -- 사원코드
    `MEMO_CONTENT` VARCHAR(255) NULL COMMENT '메모내용',              -- 메모내용
    PRIMARY KEY (`MEMO_ID`)
) ENGINE = InnoDB COMMENT '메모' AUTO_INCREMENT = 1;

ALTER TABLE `final`.MEMO
    ADD CONSTRAINT `FK_MEMO_EMP` FOREIGN KEY (`MEMO_EMP_ID`) REFERENCES `final`.EMP (`EMP_ID`);


-- 공지사항
DROP TABLE IF EXISTS `final`.NOTICE;
CREATE TABLE `final`.NOTICE
(
    `NOTICE_ID`           BIGINT       NOT NULL AUTO_INCREMENT COMMENT '공지사항코드', -- 공지사항코드
    `NOTICE_EMP_ID`       BIGINT       NOT NULL COMMENT '사원코드',                    -- 사원코드
    `NOTICE_SUBJECT`      VARCHAR(255) NOT NULL COMMENT '공지사항제목',                -- 공지사항제목
    `NOTICE_CONTENT`      LONGTEXT     NOT NULL COMMENT '공지사항내용',                -- 공지사항내용
    `NOTICE_VIEWS`        INT          NOT NULL COMMENT '공지사항조회수',              -- 공지사항조회수
    `NOTICE_CREATEDDATE`  DATETIME     NOT NULL COMMENT '공지사항작성일',              -- 공지사항작성일
    `NOTICE_MODIFIEDDATE` DATETIME NULL COMMENT '공지사항수정일',                      -- 공지사항수정일
    PRIMARY KEY (`NOTICE_ID`)
) ENGINE = InnoDB COMMENT '공지사항' AUTO_INCREMENT = 1;

ALTER TABLE `final`.NOTICE
    ADD CONSTRAINT `FK_NOTICE_EMP` FOREIGN KEY (`NOTICE_EMP_ID`) REFERENCES `final`.EMP (`EMP_ID`);

-- 공지사항파일
DROP TABLE IF EXISTS `final`.NOTICEFILE;
CREATE TABLE `final`.NOTICEFILE
(
    `NOTICEFILE_ID`         BIGINT       NOT NULL AUTO_INCREMENT COMMENT '공지사항파일코드', -- 공지사항파일코드
    `NOTICEFILE_NOTICE_ID`  BIGINT       NOT NULL COMMENT '공지사항코드',                    -- 공지사항코드
    `NOTICEFILE_NAME`       VARCHAR(255) NOT NULL COMMENT '공지사항파일이름',                -- 공지사항파일이름
    `NOTICEFILE_ORIGINNAME` VARCHAR(255) NOT NULL COMMENT '공지사항파일원본이름',            -- 공지사항파일원본이름
    `NOTICEFILE_PATH`       VARCHAR(255) NOT NULL COMMENT '공지사항파일경로',                -- 공지사항파일경로
    PRIMARY KEY (`NOTICEFILE_ID`)
) ENGINE = InnoDB COMMENT '공지사항파일' AUTO_INCREMENT = 1;

ALTER TABLE `final`.NOTICEFILE
    ADD CONSTRAINT `FK_NOTICEFILE_NOTICE` FOREIGN KEY (`NOTICEFILE_NOTICE_ID`) REFERENCES `final`.NOTICE (`NOTICE_ID`);


-- 게시판
DROP TABLE IF EXISTS `final`.BOARD;
CREATE TABLE `final`.BOARD
(
    `BOARD_ID`           BIGINT       NOT NULL AUTO_INCREMENT COMMENT '게시판코드', -- 게시판코드
    `BOARD_EMP_ID`       BIGINT       NOT NULL COMMENT '사원코드',                  -- 사원코드
    `BOARD_SUBJECT`      VARCHAR(255) NOT NULL COMMENT '게시판제목',                -- 게시판제목
    `BOARD_CONTENT`      LONGTEXT     NOT NULL COMMENT '게시판내용',                -- 게시판내용
    `BOARD_VIEWS`        INT          NOT NULL COMMENT '게시판조회수',              -- 게시판조회수
    `BOARD_CREATEDDATE`  DATETIME     NOT NULL COMMENT '게시판작성일',              -- 게시판작성일
    `BOARD_MODIFIEDDATE` DATETIME NULL COMMENT '게시판수정일',                      -- 게시판수정일
    PRIMARY KEY (`BOARD_ID`)
) ENGINE = InnoDB COMMENT '게시판' AUTO_INCREMENT = 1;

ALTER TABLE `final`.BOARD
    ADD CONSTRAINT `FK_BOARD_EMP` FOREIGN KEY (`BOARD_EMP_ID`) REFERENCES `final`.EMP (`EMP_ID`);

-- 게시판파일
DROP TABLE IF EXISTS `final`.BOARDFILE;
CREATE TABLE `final`.BOARDFILE
(
    `BOARDFILE_ID`         BIGINT       NOT NULL AUTO_INCREMENT COMMENT '게시판파일코드', -- 게시판파일코드
    `BOARDFILE_BOARD_ID`   BIGINT       NOT NULL COMMENT '게시판코드',                    -- 게시판코드
    `BOARDFILE_NAME`       VARCHAR(255) NOT NULL COMMENT '게시판파일이름',                -- 게시판파일이름
    `BOARDFILE_ORIGINNAME` VARCHAR(255) NOT NULL COMMENT '게시판파일원본이름',            -- 게시판파일원본이름
    `BOARDFILE_PATH`       VARCHAR(255) NOT NULL COMMENT '게시판파일경로',                -- 게시판파일경로
    PRIMARY KEY (`BOARDFILE_ID`)
) ENGINE = InnoDB COMMENT '게시판파일' AUTO_INCREMENT = 1;

ALTER TABLE `final`.BOARDFILE
    ADD CONSTRAINT `FK_BOARDFILE_BOARD` FOREIGN KEY (`BOARDFILE_BOARD_ID`) REFERENCES `final`.BOARD (`BOARD_ID`);

-- 결재
DROP TABLE IF EXISTS `final`.APPROVAL;
CREATE TABLE `final`.APPROVAL
(
    `APPROVAL_ID`               BIGINT       NOT NULL AUTO_INCREMENT COMMENT '결재코드', -- 결재코드
    `APPROVAL_EMP_ID`           BIGINT       NOT NULL COMMENT '사원코드',                -- 사원코드
    `APPROVAL_SUBJECT`          VARCHAR(255) NOT NULL COMMENT '결재제목',                -- 결재제목
    `APPROVAL_CONTENT`          VARCHAR(255) NOT NULL COMMENT '결재내용',                -- 결재내용
    `APPROVAL_CHECK`            VARCHAR(255) NOT NULL COMMENT '결재상태',                -- 결재상태
    `APPROVAL_CHECKMAN`         VARCHAR(255) NOT NULL COMMENT '결재승인자',              -- 결재승인자
    `APPROVAL_CHECKMANPOSITION` VARCHAR(255) NOT NULL COMMENT '결재승인자직급',          -- 결재승인자직급
    `APPROVAL_UPLOADDATE`       DATETIME     NOT NULL COMMENT '결재올린날짜',            -- 결재올린날짜
    `APPROVAL_BACKDATE`         DATETIME NULL COMMENT '결재반려날짜',                    -- 결재반려날짜
    `APPROVAL_SUCCESSDATE`      DATETIME NULL COMMENT '결재승인날짜',                    -- 결재승인날짜
    PRIMARY KEY (`APPROVAL_ID`)
) ENGINE = InnoDB COMMENT '결재' AUTO_INCREMENT = 1;

ALTER TABLE `final`.APPROVAL
    ADD CONSTRAINT `FK_APPROVAL_EMP` FOREIGN KEY (`APPROVAL_EMP_ID`) REFERENCES `final`.EMP (`EMP_ID`);

-- 결재파일
DROP TABLE IF EXISTS `final`.APPROVALFILE;
CREATE TABLE `final`.APPROVALFILE
(
    `APPROVALFILE_ID`          BIGINT       NOT NULL AUTO_INCREMENT COMMENT '결재파일코드', -- 결재파일코드
    `APPROVALFILE_APPROVAL_ID` BIGINT       NOT NULL COMMENT '결재코드',                    -- 결재코드
    `APPROVALFILE_NAME`        VARCHAR(255) NOT NULL COMMENT '결재파일이름',                -- 결재파일이름
    `APPROVALFILE_ORIGINNAME`  VARCHAR(255) NOT NULL COMMENT '결재파일원본이름',            -- 결재파일원본이름
    `APPROVALFILE_PATH`        VARCHAR(255) NOT NULL COMMENT '결재파일경로',                -- 결재파일경로
    PRIMARY KEY (`APPROVALFILE_ID`)
) ENGINE = InnoDB COMMENT '결재파일' AUTO_INCREMENT = 1;

ALTER TABLE `final`.APPROVALFILE
    ADD CONSTRAINT `FK_APPROVALFILE_APPROVAL` FOREIGN KEY (`APPROVALFILE_APPROVAL_ID`) REFERENCES `final`.APPROVAL (`APPROVAL_ID`);

-- 사원급여
DROP TABLE IF EXISTS `final`.SALARY;
CREATE TABLE `final`.SALARY
(
    `SALARY_ID`            BIGINT       NOT NULL AUTO_INCREMENT COMMENT '급여코드', -- 급여코드
    `SALARY_EMP_ID`        BIGINT       NOT NULL COMMENT '사원코드',                -- 사원코드
    `SALARY_AMOUNT`        INT          NOT NULL COMMENT '연봉',                    -- 연봉
    `SALARY_PAYDATE`       DATETIME     NOT NULL COMMENT '지급일',                  -- 지급일
    `SALARY_PAYMONEY`      INT          NOT NULL COMMENT '지급금액',                -- 지급금액
    `SALARY_BANK`          VARCHAR(255) NOT NULL COMMENT '지급은행',                -- 지급은행
    `SALARY_ACCOUNTNUMBER` VARCHAR(255) NOT NULL COMMENT '지급계좌',                -- 지급계좌
    `SALARY_BONUS`         INT NULL COMMENT '보너스',                               -- 보너스
    PRIMARY KEY (`SALARY_ID`)
) ENGINE = InnoDB COMMENT '사원급여' AUTO_INCREMENT = 1;

ALTER TABLE `final`.SALARY
    ADD CONSTRAINT `FK_SALARY_EMP` FOREIGN KEY (`SALARY_EMP_ID`) REFERENCES `final`.EMP (`EMP_ID`);


-- 사원 프로필 사진
DROP TABLE IF EXISTS `final`.EMPPICTURE;
CREATE TABLE `final`.EMPPICTURE
(
    `EMPPICTURE_ID`         BIGINT       NOT NULL AUTO_INCREMENT COMMENT '사원프로필사진코드', -- 사원프로필사진코드
    `EMPPICTURE_EMP_ID`     BIGINT       NOT NULL COMMENT '사원코드',                          -- 사원코드
    `EMPPICTURE_NAME`       VARCHAR(255) NOT NULL COMMENT '사원프로필파일이름',                -- 사원프로필파일이름
    `EMPPICTURE_ORIGINNAME` VARCHAR(255) NOT NULL COMMENT '사원프로필원본파일이름',            -- 사원프로필원본파일이름
    `EMPPICTURE_PATH`       VARCHAR(255) NOT NULL COMMENT '사원프로필파일경로',                -- 사원프로필파일경로
    PRIMARY KEY (`EMPPICTURE_ID`)
) ENGINE = InnoDB COMMENT '사원 프로필 사진' AUTO_INCREMENT = 1;

ALTER TABLE `final`.EMPPICTURE
    ADD CONSTRAINT `FK_EMPPICTURE_EMP` FOREIGN KEY (`EMPPICTURE_EMP_ID`) REFERENCES `final`.EMP (`EMP_ID`);

-- 사원근태
DROP TABLE IF EXISTS `final`.LOG;
CREATE TABLE `final`.LOG
(
    `LOG_ID`            BIGINT       NOT NULL AUTO_INCREMENT COMMENT '근태코드', -- 근태코드
    `LOG_EMP_ID`        BIGINT       NOT NULL COMMENT '사원코드',                -- 사원코드
    `LOG_DATE`          DATE         NOT NULL COMMENT '날짜',                    -- 날짜
    `LOG_CHECKIN`       DATETIME NULL COMMENT '출근시간',                        -- 출근시간
    `LOG_CHECKOUT`      DATETIME NULL COMMENT '퇴근시간',                        -- 퇴근시간
    `LOG_STATUS`        VARCHAR(255) NOT NULL COMMENT '근태상태',                -- 근태상태
    `LOG_TOTALVACATION` INT          NOT NULL COMMENT '총 휴가',                 -- 총 휴가
    `LOG_USEDVACATION`  INT          NOT NULL COMMENT '사용 휴가',               -- 사용 휴가
    `LOG_TOTALDAYOFF`   INT          NOT NULL COMMENT '총 연차',                 -- 총 연차
    `LOG_USEDDAYOFF`    INT          NOT NULL COMMENT '사용 연차',               -- 사용 연차
    `LOG_DATEDAYOFF`    DATE NULL COMMENT '연차사용일',                          -- 연차사용일
    PRIMARY KEY (`LOG_ID`)
) ENGINE = InnoDB COMMENT '사원근태' AUTO_INCREMENT = 1;

ALTER TABLE `final`.LOG
    ADD CONSTRAINT `FK_LOG_EMP` FOREIGN KEY (`LOG_EMP_ID`) REFERENCES `final`.EMP (`EMP_ID`);


-- 댓글
DROP TABLE IF EXISTS `final`.COMMENT;
CREATE TABLE `final`.COMMENT
(
    `COMMENT_ID`            BIGINT       NOT NULL AUTO_INCREMENT COMMENT '댓글코드', -- 댓글코드
    `COMMENT_BOARD_ID`      BIGINT       NOT NULL COMMENT '게시판코드',              -- 게시판코드
    `COMMENT_EMP_ID`        BIGINT       NOT NULL COMMENT '사원코드',                -- 사원코드
    `COMMENT_COMMENT`       VARCHAR(255) NOT NULL COMMENT '댓글내용',                -- 댓글내용
    `COMMENT_CREATED_DATE`  DATE         NOT NULL COMMENT '댓글작성일',              -- 댓글작성일
    `COMMENT_MODIFIED_DATE` DATE NULL COMMENT '댓글수정일',                          -- 댓글수정일
    PRIMARY KEY (`COMMENT_ID`)
) ENGINE = InnoDB COMMENT '댓글' AUTO_INCREMENT = 1;

ALTER TABLE `final`.COMMENT
    ADD CONSTRAINT `FK_COMMENT_EMP` FOREIGN KEY (`COMMENT_EMP_ID`) REFERENCES `final`.EMP (`EMP_ID`);

ALTER TABLE `final`.COMMENT
    ADD CONSTRAINT `FK_COMMENT_BOARD` FOREIGN KEY (`COMMENT_BOARD_ID`) REFERENCES `final`.BOARD (`BOARD_ID`);

-- 영상
DROP TABLE IF EXISTS `final`.MOVIE;
CREATE TABLE `final`.MOVIE
(
    `MOVIE_ID`         VARCHAR(255) NOT NULL COMMENT '영상 코드', -- 영상 코드
    `MOVIE_KRNAME`     VARCHAR(255) NULL COMMENT '영화명(한글)',  -- 영화명(한글)
    `MOVIE_ENNAME`     VARCHAR(255) NULL COMMENT '영화명(영어)',  -- 영화명(영어)
    `MOVIE_MADEDATE`   DATE NULL COMMENT '제작연도',              -- 제작연도
    `MOVIE_OPENDATE`   DATE NULL COMMENT '개봉일',                -- 개봉일
    `MOVIE_STATUS`     VARCHAR(255) NULL COMMENT '제작상태',      -- 제작상태
    `MOVIE_COUNTRY`    VARCHAR(255) NULL COMMENT '제작국가',      -- 제작국가
    `MOVIE_GENRE`      VARCHAR(255) NULL COMMENT '영화장르',      -- 영화장르
    `MOVIE_PRODUCER`   VARCHAR(255) NULL COMMENT '제작사',        -- 제작사
    `MOVIE_PRODUCERID` VARCHAR(255) NULL COMMENT '제작사코드',    -- 제작사코드
    PRIMARY KEY (`MOVIE_ID`)
) ENGINE = InnoDB COMMENT '영상';

-- 서비스영상
DROP TABLE IF EXISTS `final`.SERVICEMOVIE;
CREATE TABLE `final`.SERVICEMOVIE
(
    `SERVICEMOVIE_ID`            BIGINT       NOT NULL AUTO_INCREMENT COMMENT '서비스영상코드', -- 서비스영상코드
    `SERVICEMOVIE_MOVIE_ID`      VARCHAR(255) NOT NULL COMMENT '영상 코드',                     -- 영상 코드
    `SERVICEMOVIE_AMOUNT`        INT          NOT NULL COMMENT '판권금액',                      -- 판권금액
    `SERVICEMOVIE_PAYMENTDATE`   DATETIME     NOT NULL COMMENT '판권결제일',                    -- 판권결제일
    `SERVICEMOVIE_PAYMENTBANK`   VARCHAR(255) NOT NULL COMMENT '결제은행',                      -- 결제은행
    `SERVICEMOVIE_ACCOUNTNUMBER` VARCHAR(255) NOT NULL COMMENT '결제계좌',                      -- 결제계좌
    PRIMARY KEY (`SERVICEMOVIE_ID`)
) ENGINE = InnoDB COMMENT '서비스영상' AUTO_INCREMENT = 1;

ALTER TABLE `final`.SERVICEMOVIE
    ADD CONSTRAINT `FK_SERVICEMOVIE_EMP` FOREIGN KEY (`SERVICEMOVIE_MOVIE_ID`) REFERENCES `final`.MOVIE (`MOVIE_ID`);

-- 회원
DROP TABLE IF EXISTS `final`.MEMBER;
CREATE TABLE `final`.MEMBER
(
    `MEMBER_ID`            BIGINT       NOT NULL AUTO_INCREMENT COMMENT '회원코드', -- 회원코드
    `MEMBER_NAME`          VARCHAR(255) NOT NULL COMMENT '이름',                    -- 이름
    `MEMBER_EMAIL`         VARCHAR(255) NOT NULL COMMENT '이메일',                  -- 이메일
    `MEMBER_PASSWORD`      VARCHAR(255) NOT NULL COMMENT '비밀번호',                -- 비밀번호
    `MEMBER_PHONENUMBER`   VARCHAR(255) NOT NULL COMMENT '휴대폰번호',              -- 휴대폰번호
    `MEMBER_BIRTHDAY`      DATE         NOT NULL COMMENT '생년월일',                -- 생년월일
    `MEMBER_RATEPLAN`      VARCHAR(255) NULL COMMENT '이용요금제',                  -- 이용요금제
    `MEMBER_PAYMENTPRICE`  INT NULL COMMENT '결제금액',                             -- 결제금액
    `MEMBER_PAYMENTDATE`   DATETIME NULL COMMENT '결제일',                          -- 결제일
    `MEMBER_PAYMENTBANK`   VARCHAR(255) NULL COMMENT '결제은행',                    -- 결제은행
    `MEMBER_ACCOUNTNUMBER` VARCHAR(255) NULL COMMENT '결제계좌',                    -- 결제계좌
    PRIMARY KEY (`MEMBER_ID`)
) ENGINE = InnoDB COMMENT '회원' AUTO_INCREMENT = 1;