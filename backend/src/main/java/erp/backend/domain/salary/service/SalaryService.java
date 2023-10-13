package erp.backend.domain.salary.service;

import erp.backend.domain.emp.entity.Emp;
import erp.backend.domain.salary.vo.SalaryVO;
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
    private final SalaryVO salaryVO;

    @Transactional
    public Long salaryInsert(SalaryInsert request) {
        Emp emp = SecurityHelper.getAccount();
        salaryVO.setBonus(request.getBonus());

        if (emp.getDept().getDeptId() == 20) {
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
        } else {
            return null;
        }
    }

    @Transactional(readOnly = true)
    public SalaryResponse getEmpSalary(Long empId) {
        Emp emp = SecurityHelper.getAccount();
        if (emp.getDept().getDeptId() == 20) {
            List<Salary> entities = salaryRepository.findSalaryByEmpEmpId(empId);
            if (entities != null && !entities.isEmpty()) {
                Salary entity = entities.get(0);
                return SalaryResponse.builder()
                        .salaryPayDate(entity.getSalaryPayDate())
                        .salaryBank(entity.getSalaryBank())
                        .salaryAccountNumber(entity.getSalaryAccountNumber())
                        .salaryPayMoney(entity.getSalaryPayMoney())
                        .salaryTax(entity.getSalaryTax())
                        .salaryBonus(entity.getSalaryBonus())
                        .build();
            }
        }
        return null;
    }

    @Transactional
    public void salaryDelete(Long id) {
        Emp emp = SecurityHelper.getAccount();
        if (emp.getDept().getDeptId() == 20) {
            salaryRepository.deleteById(id);
        }
    }

}