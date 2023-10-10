package erp.backend.domain.emp.entity;

import erp.backend.domain.board.entity.Board;
import erp.backend.domain.dept.entity.Dept;
import erp.backend.domain.emp.dto.EmpPasswordUpdateRequest;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.Collection;
import java.util.HashSet;
import java.util.Set;

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

    @Column(name = "EMP_BIRTHDAY")
    private LocalDate empBirthday;

    @Column(name = "EMP_STARTDATE")
    private LocalDate empStartDate;

    @Column(name = "EMP_ENDDATE")
    private LocalDate empEndDate;

    @Column(name = "EMP_STATUS")
    private String empStatus;

    @Column(name = "EMP_GENDER")
    private String empGender;

    @Column(name = "EMP_ADDRESS")
    private String empAddress;

    @Column(name = "EMP_DETAILADDRESS")
    private String empDetailAddress;

    @OneToMany(mappedBy = "emp", fetch = FetchType.LAZY, orphanRemoval = true, cascade = CascadeType.ALL)
    private Set<Board> boardList = new HashSet<>();

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


//    @OneToMany(mappedBy = "emp", fetch = FetchType.LAZY, orphanRemoval = true, cascade = CascadeType.ALL)
//    private Set<Board> boardList = new HashSet<>();

    public void update(EmpPasswordUpdateRequest request,PasswordEncoder passwordEncoder){
        System.out.println("#1"+password);
        this.password = passwordEncoder.encode(request.getPassword());
        System.out.println("#2"+password);
    }

}
