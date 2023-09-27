package erp.backend.domain.dept.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Dept {
    @Id
    @JoinColumn(name = "DEPT_ID")
    private Long deptId;

    @Column(name = "DEPT_NAME")
    private String deptName;
}
