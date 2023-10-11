package erp.backend.domain.salary.service;

import erp.backend.domain.emp.entity.Emp;
import erp.backend.domain.salary.Vo.SalaryVO;
import erp.backend.domain.salary.dto.SalaryInsert;
import erp.backend.domain.salary.entity.Salary;
import erp.backend.domain.salary.repository.SalaryRepository;
import erp.backend.global.config.security.SecurityHelper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class SalaryService {
    private final SalaryRepository salaryRepository;
  
    @Transactional
    public Long salaryInsert(SalaryInsert request){
        Emp emp = SecurityHelper.getAccount();
        Salary entity = Salary.builder()
                .emp(emp)
                .salaryPayDate(LocalDateTime.now().withDayOfMonth(15).withHour(9).withMinute(0).withSecond(0))
//                .salaryPayMoney(new SalaryVO().position(emp.getEmpPosition()))
                .salaryBank("신한")
                .salaryAccountNumber(request.getAccountNumber())
                .salaryBonus(request.getBonus())
                .build();
        return salaryRepository.save(entity).getSalaryId();
    }
}
