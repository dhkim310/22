package erp.backend.domain.approval.vo;

import org.springframework.stereotype.Component;
@Component
public class ApprovalVo {
    private final String waiting = "결재요청";
    private final String success = "결재승인";
    private final String reject = "결재반려";

    public String type1(String check) {
        return check.equals(waiting) ? waiting :
                check.equals(success) ? success : reject;
    }
}
