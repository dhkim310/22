package erp.backend.domain.notice.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import java.sql.Date;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

@Entity //jpa 사용할때!
@AllArgsConstructor // 파라미터있는생성자
@NoArgsConstructor // 기본생성자
@Data // setter, getter 자동생성
public class Notice {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long notice_id;
    //외래키
    private long notice_emp_id;

    private String notice_subject;

    private String notice_content;

    private int notice_views;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd hh:mm:ss", timezone = "Asia/Seoul")
    @CreationTimestamp
    private Date notice_createddate;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd hh:mm:ss", timezone = "Asia/Seoul")
    @CreationTimestamp
    private Date notice_modifieddate;
}
