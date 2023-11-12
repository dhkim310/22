package erp.backend.domain.emp.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import erp.backend.domain.dept.entity.Dept;
import erp.backend.domain.emp.dto.EmpAddressRequest;
import erp.backend.domain.emp.dto.EmpReshuffleRequest;
import erp.backend.domain.emp.vo.EmpVo;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDate;
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
        updateRoles();
    }

    public void updateReshuffle(EmpReshuffleRequest request) {
        this.dept = request.getEmpDeptId();
        this.empPosition = request.getEmpPosition();
        this.empEndDate = request.getEmpEndDate();
        this.empStatus = request.getEmpStatus();
        this.roles = new EmpVo().type1(request.getEmpPosition());
    }

    public void updateAddress(EmpAddressRequest request) {
        this.empAddress = request.getEmpAddress();
        updateRoles();
    }

    public void updateAddressDetail(EmpAddressRequest request) {
        this.empDetailAddress = request.getEmpDetailAddress();
        updateRoles();
    }

    private void updateRoles() {
        roles = roles.startsWith("ROLE_ADMIN_") ? "ROLE_ADMIN" :
                roles.startsWith("ROLE_USER_") ? "ROLE_USER" :
                        roles;
    }
}