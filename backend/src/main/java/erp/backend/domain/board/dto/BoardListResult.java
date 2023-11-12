package erp.backend.domain.board.dto;

import erp.backend.domain.board.entity.Board;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.domain.Page;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
public class BoardListResult {
    private Page<BoardListResponse> list;
    private int page;
    private int size;
    private long totalCount;
    private long totalPageCount;

    public static BoardListResult from(Page<Board> boardList) {
        return BoardListResult.builder()
                .page(boardList.getNumber() + 1)
                .size(boardList.getSize())
                .totalCount(boardList.getTotalElements())
                .totalPageCount(boardList.getTotalPages())
                .list(
                        boardList.map(BoardListResponse::fromBoard)
                )
                .build();
    }
}