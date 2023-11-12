package erp.backend.global.util;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum SchemaType {
    notice("notice_file"),
    board("board_file"),
    approval("approval_file"),
    emppicture("emp_picture");

    private final String name;

    public String getCode() {
        return this.name();
    }
}