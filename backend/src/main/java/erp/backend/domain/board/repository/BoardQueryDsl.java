package erp.backend.domain.board.repository;

import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import erp.backend.domain.board.entity.Board;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Repository;

import java.util.List;

import static erp.backend.domain.board.entity.QBoard.board;

@Repository
@RequiredArgsConstructor
public class BoardQueryDsl {
    private final JPAQueryFactory jpaQueryFactory;

    public Page<Board> searchBoardList(String subject,
                                       PageRequest pageRequest) {
        List<Board> content = jpaQueryFactory
                .selectFrom(board)
                .where(conditionSubject(subject))
                .orderBy(board.boardId.desc())
                .offset(pageRequest.getOffset())
                .limit(pageRequest.getPageSize())
                .fetch();

        Long count = jpaQueryFactory
                .select(board.count())
                .from(board)
                .where(conditionSubject(subject))
                .fetchOne();

        return new PageImpl<>(content, pageRequest, count);
    }

    public BooleanExpression conditionSubject(String subject) {
        return subject != null ? board.boardSubject.contains(subject) : null;
    }
}