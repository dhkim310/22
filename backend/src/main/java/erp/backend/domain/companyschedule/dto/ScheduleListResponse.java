package erp.backend.domain.companyschedule.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ScheduleListResponse {
    private Long id;
    private LocalDate start;
    private LocalDate end;
    private String title;
}
