package erp.backend.domain.vacation.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import erp.backend.domain.emp.entity.Emp;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Builder
public class Vacation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "VACATION_ID")
    private long vacationId;

    //외래키
    @ManyToOne(fetch = FetchType.LAZY) // 필요할때만 호출
    @JoinColumn(name = "VACATION_EMP_ID", referencedColumnName = "EMP_ID")
    private Emp emp;

    @Column(name = "VACATION_TOTALVACATION")
    private int vacationTotalVacation;

    @Column(name = "VACATION_USEDVACATION")
    private int vacationUsedVacation;

    @Column(name = "VACATION_TOTALDAYOFF")
    private int vacationTotalDayOff;

    @Column(name = "VACATION_USEDDAYOFF")
    private int vacationUsedDayOff;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd hh:mm:ss", timezone = "Asia/Seoul")
    @CreationTimestamp
    @Column(name = "VACATION_DATEDAYOFF")
    private LocalDateTime vacationDateDayOff;
}