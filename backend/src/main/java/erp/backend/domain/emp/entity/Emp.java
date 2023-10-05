package erp.backend.domain.emp.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import erp.backend.domain.dept.entity.Dept;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.sql.Date;
import java.util.Arrays;
import java.util.Collection;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Emp implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "EMP_ID")
    private Long empId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "EMP_DEPT_ID")
    private Dept empDeptId;

    @Column(name = "EMP_NAME")
    private String empName;

    @Column(name = "EMP_EMAIL")
    private String empEmail;

    @Column(name = "EMP_PASSWORD")
    private String password;

    @Column(name = "EMP_PHONENUMBER")
    private String empPhoneNumber;

    @Column(name = "EMP_POSITION")
    private String empPosition;

    @Column(name = "EMP_ROLES")
    private String roles;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
    @CreationTimestamp
    @Column(name = "EMP_BIRTHDAY")
    private Date empBirthday;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
    @CreationTimestamp
    @Column(name = "EMP_STARTDATE")
    private Date empStartDate;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
    @CreationTimestamp
    @Column(name = "EMP_ENDDATE")
    private Date empEndDate;

    @Column(name = "EMP_STATUS")
    private String empStatus;

    @Column(name = "EMP_GENDER")
    private String empGender;

    @Column(name = "EMP_ADDRESS")
    private String empAddress;

    @Column(name = "EMP_DETAILADDRESS")
    private String empDetailAddress;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Arrays.stream(this.roles.split(","))
                .map(SimpleGrantedAuthority::new)
                .toList();
    }

    @Override
    public String getUsername() {
        return this.empEmail;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
