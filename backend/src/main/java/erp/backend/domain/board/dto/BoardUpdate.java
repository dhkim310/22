package erp.backend.domain.board.dto;

import erp.backend.domain.board.dto.BoardRequest;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class BoardUpdate extends BoardRequest {
    private List<Long> deleteUploadFileIds;
}
