package erp.backend.domain.movie.vo;

import org.springframework.beans.factory.annotation.Value;

public class MovieVo {
    @Value("${movie.key}")
    String key;
}
