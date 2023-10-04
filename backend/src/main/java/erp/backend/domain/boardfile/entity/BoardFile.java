package erp.backend.domain.boardfile.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity //jpa 사용할때!
@AllArgsConstructor // 파라미터있는생성자
@NoArgsConstructor // 기본생성자
@Data // setter, getter 자동생성
public class BoardFile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "BOARDFILE_ID")
    private long boardFileId;

    //외래키
    @Column(name = "BOARDFILE_BOARD_ID")
    private long boardFileBoardId;

    @Column(name = "BOARDFILE_NAME")
    private String boardFileName;

    @Column(name = "BOARDFILE_ORIGINNAME")
    private String boardFileOriginName;

    @Column(name = "BOARDFILE_PATH")
    private String boardFilePath;

}
