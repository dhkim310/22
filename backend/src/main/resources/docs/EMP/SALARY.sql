-- 사원급여
DROP TABLE IF EXISTS `final`.salary;
CREATE TABLE `final`.salary
(
    `SALARY_ID`            BIGINT       NOT NULL AUTO_INCREMENT COMMENT '급여코드',
    `SALARY_EMP_ID`        BIGINT       NOT NULL COMMENT '사원코드',
    `SALARY_PAYDATE`       DATE         NOT NULL COMMENT '지급일',
    `SALARY_BANK`          VARCHAR(255) NOT NULL COMMENT '지급은행',
    `SALARY_ACCOUNTNUMBER` VARCHAR(255) NOT NULL COMMENT '지급계좌',
    `SALARY_PAYMONEY`      INT          NOT NULL COMMENT '지급금액',
    `SALARY_TAX`           INT          NOT NULL COMMENT '제세공과금',
    `SALARY_BONUS`         INT          NULL COMMENT '보너스',
    PRIMARY KEY (`SALARY_ID`)
) ENGINE = InnoDB COMMENT '사원급여'
  AUTO_INCREMENT = 1;

ALTER TABLE `final`.salary
    ADD CONSTRAINT `FK_SALARY_EMP` FOREIGN KEY (`SALARY_EMP_ID`) REFERENCES `final`.emp (`EMP_ID`);