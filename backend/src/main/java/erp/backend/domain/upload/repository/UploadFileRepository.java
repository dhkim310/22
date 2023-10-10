package erp.backend.domain.upload.repository;

import erp.backend.domain.upload.entity.UploadFile;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UploadFileRepository extends JpaRepository<UploadFile, Long> {
}