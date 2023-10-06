package erp.backend.domain.companyschedule.entity;

import erp.backend.domain.emp.entity.Emp;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity //jpa 사용할때!
@Getter
@Builder
@AllArgsConstructor // 파라미터있는생성자
@NoArgsConstructor // 기본생성자
@Table(name = "companyschedule")
public class CompanySchedule {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "COMPANYSCHEDULE_ID")
    private long companyScheduleId;
    //외래키
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "COMPANYSCHEDULE_EMP_ID")
    private Emp emp;

    @Column(name = "COMPANYSCHEDULE_STARTDATE")
    private LocalDate companyScheduleStartDate;

    @Column(name = "COMPANYSCHEDULE_ENDDATE")
    private LocalDate companyScheduleEndDate;

    @Column(name = "COMPANYSCHEDULE_CONTENT")
    private String companyScheduleContent;
}
