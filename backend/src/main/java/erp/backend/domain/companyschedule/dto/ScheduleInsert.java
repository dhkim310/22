package erp.backend.domain.companyschedule.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class ScheduleInsert {
    private LocalDate start;
    private LocalDate end;
    @NotBlank(message = "공백은 허용되지 않습니다.")
    private String title;

}
