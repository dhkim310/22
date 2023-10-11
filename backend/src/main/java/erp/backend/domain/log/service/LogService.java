package erp.backend.domain.log.service;

import erp.backend.domain.emp.entity.Emp;
import erp.backend.domain.log.Vo.LogVo;
import erp.backend.domain.log.dto.LogInsert;
import erp.backend.domain.log.dto.LogResponse;
import erp.backend.domain.log.dto.LogUpdate;
import erp.backend.domain.log.entity.Log;
import erp.backend.domain.log.repository.LogRepository;
import erp.backend.global.config.security.SecurityHelper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class LogService {
    private final LogRepository logRepository;
    private final LogVo logVo;
    @Transactional
    public Long logInsert(LogInsert request) {
        Emp emp = SecurityHelper.getAccount();
        Log entity = Log.builder()
                .emp(emp)
                .logDate(LocalDate.now())
                .logCheckIn(LocalDateTime.now())
                .logStatus(logVo.type1(LocalDateTime.now()))
                .build();

        return logRepository.save(entity).getLogId();
    }
    @Transactional
    public Long logUpdate(LogUpdate request) {
        Emp emp  = SecurityHelper.getAccount();
        Log entity = logRepository.findTopByEmpEmpIdOrderByLogIdDesc(emp.getEmpId());
        entity.update(emp,request);

        return entity.getLogId();
    }
    @Transactional
    public LogResponse logResponse() {
        Emp emp = SecurityHelper.getAccount();
        Log entity = logRepository.findTopByEmpEmpIdOrderByLogIdDesc(emp.getEmpId());

        if (entity == null) {
            return LogResponse.builder()
                    .logCheckIn(logVo.type3(null))  // 또는 다른 기본값 설정
                    .logCheckOut(logVo.type3(null))  // 또는 다른 기본값 설정
                    .build();
        }
        return LogResponse.builder()
                .logCheckIn(logVo.type3(entity.getLogCheckIn()))
                .logCheckOut(logVo.type3(entity.getLogCheckOut()))
                .build();
    }

    private Log getLog(Long logId) {
        return logRepository.findById(logId)
                .orElseThrow(() -> new IllegalArgumentException("데이터가 존재하지 않습니다."));
    }

}
