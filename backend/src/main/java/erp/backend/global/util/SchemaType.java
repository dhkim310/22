package erp.backend.global.util;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum SchemaType {
    NOTICE("notice"),
    BOARD("board")
    ;

    private final String name;

    public String getCode() {
        return this.name();
    }
}
