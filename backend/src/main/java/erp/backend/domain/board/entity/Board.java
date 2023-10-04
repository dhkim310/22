package erp.backend.domain.board.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Date;

@Entity //jpa 사용할때!
@AllArgsConstructor // 파라미터있는생성자
@NoArgsConstructor // 기본생성자
@Data // setter, getter 자동생성

//Binint = long , int = int
public class Board {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "BOARD_ID")
    private long boardId;
    //외래키
    @Column(name = "BOARD_EMP_ID")
    private long boardEmpId;

    @Column(name = "BOARD_SUBJECT")
    private String boardSubject;

    @Column(name = "BOARD_CONTENT")
    private String boardContent;

    @Column(name = "BOARD_VIEWS")
    private int boardViews;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd hh:mm:ss", timezone = "Asia/Seoul")
    @CreationTimestamp
    @Column(name = "BOARD_CREATEDDATE")
    private Date boardCreatedDate;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd hh:mm:ss", timezone = "Asia/Seoul")
    @CreationTimestamp
    @Column(name = "BOARD_MODIFIEDDATE")
    private Date boardModifiedDate;

}
