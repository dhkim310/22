package erp.backend.domain.vacation.service;


import erp.backend.domain.emp.entity.Emp;
import erp.backend.domain.emp.repository.EmpRepository;
import erp.backend.domain.vacation.dto.VacationDetail;
import erp.backend.domain.vacation.dto.VacationInsertRequest;
import erp.backend.domain.vacation.dto.VacationListResponse;
import erp.backend.domain.vacation.entity.Vacation;
import erp.backend.domain.vacation.repository.VacationRepository;
import erp.backend.global.config.security.SecurityHelper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


@Service
@RequiredArgsConstructor
public class VacationService {
    private final VacationRepository vacationRepository;
    private final EmpRepository empRepository;

    @Transactional
    public Long vacationInsert(VacationInsertRequest request) {
        Emp emp = empRepository.findByEmpId(request.getEmpId());
        Vacation entity = Vacation.builder()
                .emp(emp)
                .vacationTotalVacation(request.getVacationTotalVacation())
                .vacationTotalDayOff(request.getVacationTotalDayOff())
                .vacationUsedCount(request.getVacationUsedCount())
                .vacationStartDate(request.getVacationStartDate().plusDays(1))
                .vacationEndDate(request.getVacationEndDate().plusDays(1))
                .vacationWhy(request.getVacationWhy())
                .build();
        return vacationRepository.save(entity).getVacationId();
    }

    @Transactional
    public VacationDetail vacationDetail(Long empId) {
        Vacation lastVacation = vacationRepository.findTopByEmpEmpIdOrderByVacationIdDesc(empId);
        return VacationDetail.builder()
                .vacationTotalVacation(lastVacation.getVacationTotalVacation())
                .vacationTotalDayOff(lastVacation.getVacationTotalDayOff())
                .vacationUsedCount(lastVacation.getVacationUsedCount())
                .build();
    }

    @Transactional(readOnly = true)
    public List<VacationListResponse> vacationList() {
        Emp emp = SecurityHelper.getAccount();
        List<Vacation> list = vacationRepository.findVacationsByEmpEmpId(emp.getEmpId());

        return list.stream()
                .map(vacation -> VacationListResponse.builder()
                        .vacationId(vacation.getVacationId())
                        .vacationTotalVacation(vacation.getVacationTotalVacation())
                        .vacationTotalDayOff(vacation.getVacationTotalDayOff())
                        .vacationUsedCount(vacation.getVacationUsedCount())
                        .vacationStartDate(vacation.getVacationStartDate())
                        .vacationEndDate(vacation.getVacationEndDate())
                        .vacationWhy(vacation.getVacationWhy())
                        .build()
                )
                .toList();
    }
}