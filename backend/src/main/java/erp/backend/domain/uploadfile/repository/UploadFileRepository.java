package erp.backend.domain.uploadfile.repository;

import erp.backend.domain.uploadfile.entity.UploadFile;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UploadFileRepository extends JpaRepository<UploadFile, Long> {
}