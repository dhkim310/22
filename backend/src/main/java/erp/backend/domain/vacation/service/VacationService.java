package erp.backend.domain.vacation.service;


import erp.backend.domain.emp.repository.EmpRepository;
import erp.backend.domain.vacation.dto.VacationInsert;
import erp.backend.domain.vacation.dto.VacationUpdate;
import erp.backend.domain.vacation.entity.Vacation;
import erp.backend.domain.vacation.repository.VacationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


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
                .vacationDayOffDate(request.getVacationDayOffDate())
                .build();
        return vacationRepository.save(entity).getVacationId();
    }

    @Transactional
    public Long vacationUpdate(VacationUpdate request) {
        Vacation entity = vacationRepository.findByVacationId(request.getVacationId());
        entity.update(request);
        return entity.getVacationId();
    }
}