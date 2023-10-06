package erp.backend.domain.log.entity;

import erp.backend.domain.emp.entity.Emp;
import erp.backend.domain.log.Vo.LogVo;
import erp.backend.domain.log.dto.LogUpdate;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity //jpa 사용할때!
@Getter
@Builder
@AllArgsConstructor // 파라미터있는생성자
@NoArgsConstructor // 기본생성자
public class Log {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "LOG_ID")
    private long logId;
    //외래키
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "LOG_EMP_ID")
    private Emp emp;

    @Column(name = "LOG_DATE")
    private LocalDate logDate;

    @Column(name = "LOG_CHECKIN")
    private LocalDateTime logCheckIn;

    @Column(name = "LOG_CHECKOUT")
    private LocalDateTime logCheckOut;

    @Column(name = "LOG_STATUS")
    private String logStatus;

    public void update(Emp emp, LogUpdate request){
        this.logCheckOut = LocalDateTime.now();
        this.logStatus = new LogVo().type2(LocalDateTime.now());
    }
}
