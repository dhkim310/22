package erp.backend.domain.salary.service;

import erp.backend.domain.emp.dto.EmpSalaryListResponse;
import erp.backend.domain.emp.entity.Emp;
import erp.backend.domain.emp.repository.EmpRepository;
import erp.backend.domain.salary.Vo.SalaryVO;
import erp.backend.domain.salary.dto.SalaryInsert;
import erp.backend.domain.salary.dto.SalaryResponse;
import erp.backend.domain.salary.entity.Salary;
import erp.backend.domain.salary.repository.SalaryRepository;
import erp.backend.global.config.security.SecurityHelper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SalaryService {
    private final SalaryRepository salaryRepository;
    private final EmpRepository empRepository;
    private final SalaryVO salaryVO;

    @Transactional
    public Long salaryInsert(SalaryInsert request) {
        Emp emp = empRepository.findByEmpId(request.getEmpId());
        salaryVO.setBonus(request.getSalaryBonus());
        System.err.println(request.getEmpId());

        Salary entity = Salary.builder()
                .emp(emp)
                .salaryPayDate(LocalDate.now().withDayOfMonth(15))
                .salaryPayMoney(salaryVO.paymoney(emp.getEmpPosition()))
                .salaryBank(request.getSalaryBank())
                .salaryAccountNumber(request.getSalaryAccountNumber())
                .salaryTax(salaryVO.taxmoney(emp.getEmpPosition()))
                .salaryBonus(salaryVO.getBonus())
                .build();
        return salaryRepository.save(entity).getSalaryId();
    }

    @Transactional(readOnly = true)
    public List<SalaryResponse> getSalaryDetail(Long empId) {
        Emp emp = SecurityHelper.getAccount();
        List<Salary> list = salaryRepository.findSalaryByEmpEmpId(empId);
        return list.stream()
                .map(salary -> SalaryResponse.builder()
                        .salaryId(salary.getSalaryId())
                        .salaryTax(salary.getSalaryTax())
                        .salaryBonus(salary.getSalaryBonus())
                        .salaryPayMoney(salary.getSalaryPayMoney())
                        .salaryPayDate(salary.getSalaryPayDate())
                        .salaryBank(salary.getSalaryBank())
                        .salaryAccountNumber(salary.getSalaryAccountNumber())
                        .build())
                .toList();
    }

    @Transactional
    public void salaryDelete(Long salaryId) {
        Salary salary = salaryRepository.findBySalaryId(salaryId);
        salaryRepository.delete(salary);
    }
}