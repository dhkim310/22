package erp.backend.domain.upload.entity;

import erp.backend.global.util.FileUtils;
import erp.backend.global.util.SchemaType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.springframework.data.annotation.CreatedDate;

import java.time.LocalDateTime;

import static erp.backend.global.util.FileUtils.generatorFilePath;

@Getter
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "uploadfile")
public class UploadFile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "UPLOADFILE_ID")
    private Long id;

    @CreationTimestamp
    @Column(name = "UPLOADFILE_CREATEDDATE")
    private LocalDateTime createdDate;

    // EnumType.ORDINAL : enum 순서 값을 DB에 저장
    // EnumType.STRING : enum 이름을 DB에 저장
    @Enumerated(EnumType.STRING)
    private SchemaType fschema;

    private String uuid;

    private String name;

    private String extension;

    private String path;

    private long size;

    // Entity 삭제 전 수행
    @PreRemove
    public void deleteFile() {
        FileUtils.deleteFile(generatorFilePath(uuid, fschema.getName()));
    }

}