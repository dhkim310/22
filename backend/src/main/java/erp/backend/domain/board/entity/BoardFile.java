package erp.backend.domain.board.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import erp.backend.domain.uploadfile.entity.UploadFile;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity //jpa 사용할때!
@NoArgsConstructor
@Getter
@Table(name = "boardfile")
public class BoardFile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "BOARDFILE_ID")
    private long boardFileId;

    //외래키
    @ManyToOne
    @JoinColumn(name = "BOARDFILE_BOARD_ID")
    @JsonIgnore
    private Board board;

    @OneToOne(
            fetch = FetchType.LAZY,
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    @JoinColumn(name = "BOARDFILE_UPLOADFILE_ID")
    @JsonIgnore
    private UploadFile uploadFile;

    public BoardFile(Board board, UploadFile uploadFile) {
        this.board = board;
        this.uploadFile = uploadFile;
    }

}
