package erp.backend.domain.log.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;

import java.sql.Date;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

@Entity //jpa 사용할때!
@AllArgsConstructor // 파라미터있는생성자
@NoArgsConstructor // 기본생성자
@Data // setter, getter 자동생성
public class Log {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "LOG_ID")
    private long logId;
    //외래키
    @Column(name = "LOG_EMP_ID")
    private long logEmpId;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
    @CreationTimestamp
    @Column(name = "LOG_DATE")
    private Date logDate;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd hh:mm:ss", timezone = "Asia/Seoul")
    @CreationTimestamp
    @Column(name = "LOG_CHECKIN")
    private Date logCheckIn;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd hh:mm:ss", timezone = "Asia/Seoul")
    @CreationTimestamp
    @Column(name = "LOG_CHECKOUT")
    private Date logCheckOut;

    @Column(name = "LOG_STATUS")
    private String logStatus;

    @Column(name = "LOG_TOTALVACATION")
    private int logTotalVacation;

    @Column(name = "LOG_USEDVACATION")
    private int logUsedVacation;

    @Column(name = "LOG_TOTALDAYOFF")
    private int logTotalDayOff;

    @Column(name = "LOG_USEDDAYOFF")
    private int logUsedDayOff;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
    @CreationTimestamp
    @Column(name = "LOG_DATEDAYOFF")
    private Date logDateDayOff;
}
