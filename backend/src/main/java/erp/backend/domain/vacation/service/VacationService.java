package erp.backend.domain.vacation.service;


import erp.backend.domain.emp.entity.Emp;
import erp.backend.domain.emp.repository.EmpRepository;
import erp.backend.domain.vacation.dto.*;
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
    public Long vacationInsert(VacationInsertRequest request) {
        Emp emp = empRepository.findByEmpId(request.getEmpId());
        Vacation entity = Vacation.builder()
                .emp(emp)
                .vacationTotalVacation(request.getVacationTotalVacation())
                .vacationUsedVacation(request.getVacationUsedVacation())
                .vacationTotalDayOff(request.getVacationTotalDayOff())
                .vacationUsedDayOff(request.getVacationUsedDayOff())
                .vacationStartDate(request.getVacationStartDate())
                .vacationEndDate(request.getVacationEndDate())
                .vacationWhy(request.getVacationWhy())
                .build();
        return vacationRepository.save(entity).getVacationId();
    }

    // 업데이트부분
    @Transactional
    public Long vacationUpdate(Long empId, VacationUpdate request){
        Vacation vacation = vacationRepository.findVacationByEmpEmpId(empId);
        vacation.update(request);
        vacationRepository.save(vacation);
        return vacation.getVacationId();
    }

    @Transactional
    public VacationDetail vacationDetail(Long empId){
        Vacation entity = vacationRepository.findVacationByEmpEmpId(empId);
        return VacationDetail.builder()
                .totalVacation(entity.getVacationTotalVacation())
                .usedVacation(entity.getVacationUsedVacation())
                .totalDayOff(entity.getVacationTotalDayOff())
                .usedDayOff(entity.getVacationUsedDayOff())
                .build();
    }
    @Transactional(readOnly = true)
    public List<VacationListResponse> vacationList() {
        List<Vacation> list = vacationRepository.findAll();

        if (!list.isEmpty())
            return list.stream()
                    .map(vacation -> VacationListResponse.builder()
                            .vacationId(vacation.getVacationId())
                            .empId(vacation.getEmp().getEmpId())
                            .vacationTotalVacation(vacation.getVacationTotalVacation())
                            .vacationUsedVacation(vacation.getVacationUsedVacation())
                            .vacationTotalDayOff(vacation.getVacationTotalDayOff())
                            .vacationUsedDayOff(vacation.getVacationUsedDayOff())
                            .vacationStartDate(vacation.getVacationStartDate())
                            .vacationEndDate(vacation.getVacationEndDate())
                            .vacationWhy(vacation.getVacationWhy())
                            .build()
                    )

                    .toList();
        else {
            VacationListResponse vacationListResponse = VacationListResponse.builder()
                    .vacationTotalVacation(0)
                    .vacationUsedVacation(0)
                    .vacationTotalDayOff(0)
                    .vacationUsedDayOff(0)
                    .vacationStartDate(LocalDate.now())
                    .vacationEndDate(LocalDate.now())
                    .vacationWhy("-")
                    .build();
            return Collections.singletonList(vacationListResponse);
        }
    }
}