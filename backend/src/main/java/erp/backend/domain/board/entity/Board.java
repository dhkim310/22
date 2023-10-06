package erp.backend.domain.board.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import erp.backend.domain.board.dto.BoardUpdate;
import erp.backend.domain.comment.entity.Comment;
import erp.backend.domain.emp.entity.Emp;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;


import java.time.LocalDateTime;
import java.util.List;

@Entity //jpa 사용할때!
@AllArgsConstructor // 파라미터있는생성자
@NoArgsConstructor // 기본생성자
@Getter
@Builder
//Binint = long , int = int
public class Board {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "BOARD_ID")
    private long boardId;

    //외래키
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "BOARD_EMP_ID", referencedColumnName = "EMP_ID")
    private Emp emp;
//    @Column(name = "BOARD_EMP_ID")
//    private long boardEmpId;

    @Column(name = "BOARD_SUBJECT")
    private String boardSubject;

    @Column(name = "BOARD_CONTENT")
    private String boardContent;

    @Column(name = "BOARD_VIEWS")
    private int boardViews;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd hh:mm:ss", timezone = "Asia/Seoul")
    @CreationTimestamp
    @Column(name = "BOARD_CREATEDDATE")
    private LocalDateTime boardCreatedDate;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd hh:mm:ss", timezone = "Asia/Seoul")
    @CreationTimestamp
    @Column(name = "BOARD_MODIFIEDDATE")
    private LocalDateTime boardModifiedDate;

    public Board updateViewCount(int boardViews){
        this.boardViews = getBoardViews()+1;
        return this;
    }
    public void update(BoardUpdate request) {
        this.boardSubject = request.getSubject();
        this.boardContent = request.getContent();
        this.boardModifiedDate = LocalDateTime.now();
    }
    @OneToMany(mappedBy = "board", fetch = FetchType.LAZY, orphanRemoval = true, cascade = CascadeType.REMOVE)
    @OrderBy("commentId desc") // 댓글 정렬
    private List<Comment> comment;
}
