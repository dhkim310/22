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
        Emp emp = SecurityHelper.getAccount();
        salaryVO.setBonus(request.getBonus());
        getEmpListHandler(emp.getEmpId());

        Salary entity = Salary.builder()
                .emp(emp)
                .salaryPayDate(LocalDate.now().withDayOfMonth(15))
                .salaryPayMoney(salaryVO.paymoney(emp.getEmpPosition()))
                .salaryBank(request.getBank())
                .salaryAccountNumber(request.getAccountNumber())
                .salaryTax(salaryVO.taxmoney(emp.getEmpPosition()))
                .salaryBonus(salaryVO.getBonus())
                .build();
        return salaryRepository.save(entity).getSalaryId();
    }

    @Transactional(readOnly = true)
    public List<SalaryResponse> getSalaryDetail(Long empId) {
        Emp emp = SecurityHelper.getAccount();
        getEmpListHandler(emp.getEmpId());
        List<Salary> list = salaryRepository.findSalaryByEmpEmpId(empId);
        return list.stream()
                .map(salary -> SalaryResponse.builder()
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
    public void salaryDelete(Long id) {
        Emp emp = SecurityHelper.getAccount();
        getEmpListHandler(emp.getEmpId());
        salaryRepository.deleteById(id);
    }

    private Emp getEmpListHandler(Long empId) {
        return empRepository.findById(empId)
                .filter(emp -> emp.getDept().getDeptName().equals("재무부"))
                .orElseThrow(() -> new IllegalArgumentException("권한 없음."));
    }

}