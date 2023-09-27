package erp.backend.domain.board.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Date;

@Entity //jpa 사용할때!
@AllArgsConstructor // 파라미터있는생성자
@NoArgsConstructor // 기본생성자
@Data // setter, getter 자동생성

public class Board {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long seq;
    //@Column(name="username")
    private String writer; // 이녀석이 데이터베이스의 이름과 다르다면??? @Column(name="username") << 여기서의 name은 데이터베이스 컬럼 이름
    private String email;
    private String subject;
    private String content;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd hh:mm:ss", timezone = "Asia/Seoul")
    @CreationTimestamp // 추가. SYSDATE쓰지않고 생성해주는 것. SYSDATE는 오라클에서는 있지만 다른 데이터베이스엔 없을 수도있다. 이녀석은 각 데이터베이스에 맞는 것을 찾아준다.
    private Date rdate;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd hh:mm:ss", timezone = "Asia/Seoul")
    @CreationTimestamp
    private Date udate;

}
