package erp.backend.global.util;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum SchemaType {
    notice("notice_file"),
    board("board_file"),
    approval("approval_file"),
    emppicture("emppicture_file");

    private final String name;

    public String getCode() {
        return this.name();
    }
}
