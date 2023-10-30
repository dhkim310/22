package erp.backend.domain.uploadfile.repository;

import erp.backend.domain.uploadfile.entity.UploadFile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UploadFileRepository extends JpaRepository<UploadFile, Long> {
    Optional<UploadFile> findById(Long id);
    UploadFile findUploadFileByUuid(String uuid);
}