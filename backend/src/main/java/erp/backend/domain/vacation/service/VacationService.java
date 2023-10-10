package erp.backend.domain.vacation.service;

import erp.backend.domain.board.repository.BoardRepository;
import erp.backend.domain.emp.entity.Emp;
import erp.backend.domain.emp.repository.EmpRepository;
import erp.backend.domain.vacation.dto.VacationInsert;
import erp.backend.domain.vacation.entity.Vacation;
import erp.backend.domain.vacation.repository.VacationRepository;
import erp.backend.global.config.security.SecurityHelper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class VacationService {
    private final VacationRepository vacationRepository;
    private final EmpRepository empRepository;

    @Transactional
    public Long vacationInsert(VacationInsert request) {
        // 사원 id
        Long empId = request.getEmpId();
        Vacation entity = Vacation.builder()
                .emp(empRepository.findByEmpId(empId))
                .vacationTotalVacation(request.getVacationTotalVacation())
                .vacationUsedVacation(request.getVacationUsedVacation())
                .vacationTotalDayOff(request.getVacationTotalDayOff())
                .vacationUsedDayOff(request.getVacationUsedDayOff())
                .vacationDateDayOff(request.getVacationDateDayOff())
                .build();
        return vacationRepository.save(entity).getVacationId();
    }
}