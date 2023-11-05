package erp.backend.domain.uploadfile.entity;

import erp.backend.global.util.FileUtils;
import erp.backend.global.util.SchemaType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

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
    @Column(name = "UPLOADFILE_FSCHEMA")
    private SchemaType fschema;

    @Column(name = "UPLOADFILE_UUID")
    private String uuid;

    @Column(name = "UPLOADFILE_NAME")
    private String name;

    @Column(name = "UPLOADFILE_EXTENSION")
    private String extension;

    @Column(name = "UPLOADFILE_PATH")
    private String path;

    @Column(name = "UPLOADFILE_SIZE")
    private long size;

    // Entity 삭제 전 수행
    @PreRemove
    public void deleteFile() {
        FileUtils.deleteFile(generatorFilePath(uuid, fschema.getName()));
    }

}