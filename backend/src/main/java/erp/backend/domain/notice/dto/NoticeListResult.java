package erp.backend.domain.notice.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.domain.Page;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class NoticeListResult {
    private Page<NoticeListResponse> list;
    private int page;
    private int size;
    private long totalCount;
    private long totalPageCount;
    private boolean hasPermission;
}