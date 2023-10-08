package erp.backend.global.util;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum SchemaType {
    notice("공지사항"),
    board("게시판"),
    approval("결재");

    private final String name;

    public String getCode() {
        return this.name();
    }
}
