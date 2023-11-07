package erp.backend.domain.companyschedule.service;

import erp.backend.domain.companyschedule.dto.ScheduleInsert;
import erp.backend.domain.companyschedule.dto.ScheduleListResponse;
import erp.backend.domain.companyschedule.entity.CompanySchedule;
import erp.backend.domain.companyschedule.repository.CompanyScheduleRepository;
import erp.backend.domain.emp.entity.Emp;
import erp.backend.global.config.security.SecurityHelper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CompanyScheduleService {
    private final CompanyScheduleRepository companyScheduleRepository;

    @Transactional
    public Long scheduleInsert(ScheduleInsert request) {
        Emp emp = SecurityHelper.getAccount();
        CompanySchedule entity = CompanySchedule.builder()
                .emp(emp)
                .companyScheduleStartDate(request.getStart().plusDays(1))
                .companyScheduleEndDate(request.getEnd().plusDays(1))
                .companyScheduleContent(request.getTitle())
                .build();

        return companyScheduleRepository.save(entity).getCompanyScheduleId();
    }

    @Transactional(readOnly = true)
    public List<ScheduleListResponse> searchList() {
        List<CompanySchedule> list = companyScheduleRepository.findAll();

        return list.stream()
                .map(schedule -> ScheduleListResponse.builder()
                        .id(schedule.getCompanyScheduleId())
                        .start(schedule.getCompanyScheduleStartDate())
                        .end(schedule.getCompanyScheduleEndDate())
                        .title(schedule.getCompanyScheduleContent())
                        .build()
                )
                .toList();
    }
}
