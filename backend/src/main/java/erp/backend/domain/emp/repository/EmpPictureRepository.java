package erp.backend.domain.emp.repository;

import erp.backend.domain.emp.entity.EmpPicture;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmpPictureRepository extends JpaRepository<EmpPicture, Long> {
    EmpPicture findByEmp_EmpId(Long id);
}