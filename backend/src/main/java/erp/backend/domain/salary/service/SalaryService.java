package erp.backend.domain.salary.service;

import erp.backend.domain.emp.entity.Emp;
import erp.backend.domain.emp.repository.EmpRepository;
import erp.backend.domain.salary.dto.SalaryInsert;
import erp.backend.domain.salary.entity.Salary;
import erp.backend.domain.salary.repository.SalaryRepository;
import erp.backend.global.config.security.SecurityHelper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class SalaryService {
    private final SalaryRepository salaryRepository;
    private final EmpRepository empRepository;

    @Transactional
    public Long salaryInsert(SalaryInsert request){
        Emp emp = SecurityHelper.getAccount();
        Salary entity = Salary.builder()
                .emp(empRepository.findByEmpId(emp.getEmpId()))
                .salaryAmount(request.getAmount())
                .salaryPayDate(LocalDateTime.now())
                .salaryPayMoney(request.getPaymoney())
                .salaryBank(request.getBank())
                .salaryAccountNumber(request.getAccountnumber())
                .salaryBonus(0)
                .build();
        return salaryRepository.save(entity).getSalaryId();
    }
}
