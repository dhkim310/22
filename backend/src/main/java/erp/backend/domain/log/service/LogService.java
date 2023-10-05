package erp.backend.domain.log.service;

import erp.backend.domain.emp.entity.Emp;
import erp.backend.domain.log.dto.CreateLog;
import erp.backend.domain.log.dto.UpdateLog;
import erp.backend.domain.log.entity.Log;
import erp.backend.domain.log.repository.LogRepository;
import erp.backend.domain.notice.dto.NoticeUpdate;
import erp.backend.domain.notice.entity.Notice;
import erp.backend.global.config.security.SecurityHelper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;

@Service
@RequiredArgsConstructor
public class LogService {
    private final LogRepository logRepository;

    @Transactional
    public Long createLog(CreateLog request) {
        Emp emp = SecurityHelper.getAccount();
        Log entity = Log.builder()
                .emp(emp)
                .logDate(LocalDate.now())
                .logCheckIn(LocalDateTime.now())
                .logStatus("출근 or 지각")
                .build();
        return logRepository.save(entity).getLogId();
    }
//    @Transactional
//    public Long updateLog(UpdateLog request) {
//        Emp emp  = SecurityHelper.getAccount();
//        Log entity = logRepository.findTopByOrderByLogIdDescAndFindByEmpEmpId(emp.getEmpId());
//        entity.update(emp,request);
//
//        return entity.getLogId();
//    }

    @Transactional
    public Long updateLog(Long id, UpdateLog request) {
        Emp emp = SecurityHelper.getAccount();
        Log entity = getLog(id);
        Long empId = entity.getEmp().getEmpId();
        if (emp.getEmpId() != empId) {
            return -1L;
        } else {
            entity.update(request);
        }
        return entity.getLogId();
    }

    private Log getLog(Long logId) {
        return logRepository.findById(logId)
                .orElseThrow(() -> new IllegalArgumentException("데이터가 존재하지 않습니다."));
    }

}
