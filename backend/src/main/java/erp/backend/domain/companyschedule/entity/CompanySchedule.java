package erp.backend.domain.companyschedule.entity;

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
public class CompanySchedule {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "COMPANYSCHEDULE_ID")
    private long companyScheduleId;
    //외래키
    @Column(name = "COMPANYSCHEDULE_EMP_ID")
    private long companyScheduleEmpId;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
    @CreationTimestamp
    @Column(name = "COMPANYSCHEDULE_DATE")
    private Date companyScheduleDate;

    @Column(name = "COMPANYSCHEDULE_CONTENT")
    private String companyScheduleContent;
}
