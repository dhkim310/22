package erp.backend.domain.emp.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import erp.backend.domain.board.entity.Board;
import erp.backend.domain.dept.entity.Dept;
import erp.backend.domain.salary.entity.Salary;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDate;
import java.util.*;

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

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "EMP_DEPT_ID")
    private Dept dept;

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

    @Column(name = "EMP_AMOUNT")
    private Long empAmount;

    @Column(name = "EMP_BIRTHDAY")
    private LocalDate empBirthday;

    @Column(name = "EMP_STARTDATE")
    private LocalDate empStartDate;

    @JsonIgnore
    @Column(name = "EMP_ENDDATE")
    private LocalDate empEndDate;

    @Column(name = "EMP_STATUS")
    private String empStatus;

    @Column(name = "EMP_GENDER")
    private String empGender;

    @Column(name = "EMP_ADDRESS")
    private String empAddress;

    @JsonIgnore
    @Column(name = "EMP_DETAILADDRESS")
    private String empDetailAddress;

//    @OneToMany(mappedBy = "emp", fetch = FetchType.LAZY, orphanRemoval = true, cascade = CascadeType.ALL)
//    private Set<Board> boardList = new HashSet<>();
  
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        String role = this.roles = roles + "_" + dept.getDeptName();
        return Arrays.stream(role.split(","))
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

    public void updatePassword(String newPassword) {
        this.password = newPassword;
    }

}
