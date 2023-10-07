package erp.backend.domain.upload.entity;

import erp.backend.global.util.FileUtils;
import erp.backend.global.util.SchemaType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;

import java.time.LocalDateTime;

import static erp.backend.global.util.FileUtils.generatorFilePath;

@Getter
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "upload_file")
public class UploadFile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @CreatedDate
    private LocalDateTime createdDate;

    @Enumerated(EnumType.STRING)
    private SchemaType schema;

    private String uuid;

    private String name;

    private String extension;

    private String path;

    private long size;

    // Entity 삭제 전 수행
    @PreRemove
    public void deleteFile() {
        FileUtils.deleteFile(generatorFilePath(uuid, schema.getName()));
    }

}