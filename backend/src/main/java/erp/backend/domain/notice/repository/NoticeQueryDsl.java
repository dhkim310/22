package erp.backend.domain.notice.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import erp.backend.domain.notice.entity.Notice;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Repository;

import java.util.List;

import static erp.backend.domain.notice.entity.QNotice.notice;

@Repository
@RequiredArgsConstructor
public class NoticeQueryDsl {
    private final JPAQueryFactory jpaQueryFactory;

    public Page<Notice> noticeList(PageRequest pageRequest) {
        List<Notice> content = jpaQueryFactory
                .selectFrom(notice)
                .where()
                .orderBy(notice.noticeId.desc())
                .offset(pageRequest.getOffset())
                .limit(pageRequest.getPageSize())
                .fetch();

        Long count = jpaQueryFactory
                .select(notice.count())
                .from(notice)
                .where()
                .fetchOne();

        return new PageImpl<>(content, pageRequest, count);
    }
}