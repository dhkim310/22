package erp.backend.domain.vacation.entity;

import erp.backend.domain.emp.entity.Emp;
import erp.backend.domain.vacation.dto.VacationUpdate;
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

    @Column(name = "VACATION_STARTDATE")
    private LocalDate vacationStartDate;

    @Column(name = "VACATION_ENDDATE")
    private LocalDate vacationEndDate;

    @Column(name = "VACATION_WHY")
    private String vacationWhy;

    public void update(VacationUpdate request) {
        this.vacationTotalVacation = request.getTotalVacation();
        this.vacationUsedVacation = request.getUsedVacation();
        this.vacationTotalDayOff = request.getTotalDayOff();
        this.vacationUsedDayOff = request.getUsedDayOff();
        this.vacationStartDate = request.getStartDate();
        this.vacationEndDate = request.getEndDate();
        this.vacationWhy = request.getWhy();
    }
}