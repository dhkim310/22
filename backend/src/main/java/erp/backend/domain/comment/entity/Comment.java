package erp.backend.domain.comment.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import erp.backend.domain.board.entity.Board;
import erp.backend.domain.emp.entity.Emp;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.springframework.data.annotation.LastModifiedDate;

import java.time.LocalDateTime;

@Entity //jpa 사용할때!
@AllArgsConstructor // 파라미터있는생성자
@NoArgsConstructor // 기본생성자
@Builder
@Getter
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "COMMENT_ID")
    private long commentId;

    //외래키
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "COMMENT_BOARD_ID", referencedColumnName = "BOARD_ID")
    private Board board;

    //외래키
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "COMMENT_EMP_ID", referencedColumnName = "EMP_ID")
    @JsonIgnore
    private Emp emp;

    @Column(name = "COMMENT_COMMENT")
    private String commentComment;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd hh:mm:ss", timezone = "Asia/Seoul")
    @CreationTimestamp
    @Column(name = "COMMENT_CREATED_DATE")
    private LocalDateTime commentCreatedDate;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd hh:mm:ss", timezone = "Asia/Seoul")
    @LastModifiedDate
    @Column(name = "COMMENT_MODIFIED_DATE")
    private LocalDateTime commentModifiedDate;

}
