package erp.backend.domain.servicemovie.entity;

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
public class ServiceMovie {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long servicemovie_id;
    //외래키
    private String servicemovie_movie_id;

    private int servicemovie_amount;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd hh:mm:ss", timezone = "Asia/Seoul")
    @CreationTimestamp
    private Date servicemovie_paymentdate;

    private String servicemovie_paymentbank;

    private String servicemovie_accountnumber;
}
