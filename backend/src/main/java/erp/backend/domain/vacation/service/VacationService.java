package erp.backend.domain.vacation.service;


import erp.backend.domain.emp.entity.Emp;
import erp.backend.domain.emp.repository.EmpRepository;
import erp.backend.domain.vacation.dto.VacationInsert;
import erp.backend.domain.vacation.dto.VacationListResponse;
import erp.backend.domain.vacation.dto.VacationUpdate;
import erp.backend.domain.vacation.entity.Vacation;
import erp.backend.domain.vacation.repository.VacationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.Collections;
import java.util.List;


@Service
@RequiredArgsConstructor
public class VacationService {
    private final VacationRepository vacationRepository;
    private final EmpRepository empRepository;
    @Transactional
    public Long vacationInsert(VacationInsert request) {
    Emp emp = empRepository.findByEmpId(request.getEmpId());
    Vacation entity = Vacation.builder()
            .emp(emp)
            .vacationTotalVacation(request.getTotalVacation())
            .vacationUsedVacation(request.getUsedVacation())
            .vacationTotalDayOff(request.getTotalDayOff())
            .vacationUsedDayOff(request.getUsedDayOff())
            .vacationStartDate(request.getStartDate())
            .vacationEndDate(request.getEndDate())
            .vacationWhy(request.getWhy())
            .build();
        return vacationRepository.save(entity).getVacationId();
}

    @Transactional
    public Long vacationUpdate(Long vacationId, VacationUpdate request){
        Vacation entity = vacationRepository.findByVacationId(vacationId);
        entity.update(request);
        return entity.getVacationId();
    }

    @Transactional(readOnly = true)
    public List<VacationListResponse> vacationList() {
        List<Vacation> list = vacationRepository.findAll();

        if (!list.isEmpty())
            return list.stream()
                    .map(vacation -> VacationListResponse.builder()
                            .vacationId(vacation.getVacationId())
                            .empId(vacation.getEmp().getEmpId())
                            .name(vacation.getEmp().getEmpName())
                            .totalVacation(vacation.getVacationTotalVacation())
                            .usedVacation(vacation.getVacationUsedVacation())
                            .totalDayOff(vacation.getVacationTotalDayOff())
                            .usedDayOff(vacation.getVacationUsedDayOff())
                            .startDate(vacation.getVacationStartDate())
                            .endDate(vacation.getVacationEndDate())
                            .why(vacation.getVacationWhy())
                            .build()
                    )

                    .toList();
        else {
            VacationListResponse vacationListResponse = VacationListResponse.builder()
                    .totalVacation(0)
                    .usedVacation(0)
                    .totalDayOff(0)
                    .usedDayOff(0)
                    .startDate(LocalDate.now())
                    .endDate(LocalDate.now())
                    .why("-")
                    .build();
            return Collections.singletonList(vacationListResponse);
        }
    }
}