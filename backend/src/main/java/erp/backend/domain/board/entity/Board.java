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
    private long board_id;
    //외래키
    private long board_emp_id;

    private String board_subject;

    private String board_content;

    private int board_views;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd hh:mm:ss", timezone = "Asia/Seoul")
    @CreationTimestamp
    private Date board_createddate;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd hh:mm:ss", timezone = "Asia/Seoul")
    @CreationTimestamp
    private Date board_modifieddate;

}
