package erp.backend.domain.emp.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Date;

@Entity //jpa 사용할때!
@AllArgsConstructor // 파라미터있는생성자
@NoArgsConstructor // 기본생성자
@Data // setter, getter 자동생성

public class Emp {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long emp_id;
    //@Column(name="username")
    private long emp_dept_id; // 이녀석이 데이터베이스의 이름과 다르다면??? @Column(name="username") << 여기서의 name은 데이터베이스 컬럼 이름
    private String emp_name;
    private String emp_email;
    private String emp_password;
    private String emp_phonenumber;
    private String emp_position;
    private String emp_roles;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
    @CreationTimestamp // 추가. SYSDATE쓰지않고 생성해주는 것. SYSDATE는 오라클에서는 있지만 다른 데이터베이스엔 없을 수도있다. 이녀석은 각 데이터베이스에 맞는 것을 찾아준다.
    private Date birthday;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
    @CreationTimestamp
    private Date startdate;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
    @CreationTimestamp
    private Date enddate;
    private String emp_status;
    private String emp_gender;
    private String emp_address;
    private String emp_detailaddress;
}