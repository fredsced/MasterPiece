package fr.formation.itschool.masterpiece.services;

import fr.formation.itschool.masterpiece.dtos.compliancereferent.ComplianceReferentViewDto;
import fr.formation.itschool.masterpiece.dtos.compliancereferent.ComplianceReferentCriteria;
import fr.formation.itschool.masterpiece.repositories.ComplianceReferentRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ComplianceReferentServiceImpl implements ComplianceReferentService {

    private final ComplianceReferentRepository complianceReferentRepository;

    protected ComplianceReferentServiceImpl(ComplianceReferentRepository complianceReferentRepository) {
        this.complianceReferentRepository = complianceReferentRepository;
    }

    @Override
    public List<ComplianceReferentViewDto> search(ComplianceReferentCriteria criteria) {
        return complianceReferentRepository.findWithCriteria(criteria.getCountryId(),
                criteria.getOrganisationUnitId(),
                criteria.getRiskId());
    }
}
