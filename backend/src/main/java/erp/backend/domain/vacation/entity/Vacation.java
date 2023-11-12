package erp.backend.domain.vacation.entity;

import erp.backend.domain.emp.entity.Emp;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

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

    @ManyToOne(fetch = FetchType.LAZY) // 필요할때만 호출
    @JoinColumn(name = "VACATION_EMP_ID", referencedColumnName = "EMP_ID")
    private Emp emp;

    @Column(name = "VACATION_TOTALVACATION")
    private int vacationTotalVacation;

    @Column(name = "VACATION_TOTALDAYOFF")
    private int vacationTotalDayOff;

    @Column(name = "VACATION_USEDCOUNT")
    private int vacationUsedCount;

    @Column(name = "VACATION_STARTDATE")
    private LocalDate vacationStartDate;

    @Column(name = "VACATION_ENDDATE")
    private LocalDate vacationEndDate;

    @Column(name = "VACATION_WHY")
    private String vacationWhy;
}