package erp.backend.domain.board.dto;

import erp.backend.domain.board.entity.Board;
import erp.backend.domain.notice.entity.Notice;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BoardListResponse {
    private Long id; // 글 번호
    private String writer; //작성자
    private String subject; // 제목
    private int views; // 조회수
    private LocalDateTime boardCreatedDate; // 작성일
    private LocalDateTime boardModifiedDate; // 수정일

    public static BoardListResponse fromBoard(Board board) {
        return BoardListResponse.builder()
                .id(board.getBoardId())
                .writer(board.getEmp().getEmpName())
                .subject(board.getBoardSubject())
                .views(board.getBoardViews())
                .boardCreatedDate(board.getBoardCreatedDate())
                .boardModifiedDate(board.getBoardModifiedDate())
                .build();
    }
}
