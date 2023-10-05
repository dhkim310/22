package erp.backend.domain.vacation.service;

import erp.backend.domain.vacation.repository.VacationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class VacationService {
    private final VacationRepository vacationRepository;
}
