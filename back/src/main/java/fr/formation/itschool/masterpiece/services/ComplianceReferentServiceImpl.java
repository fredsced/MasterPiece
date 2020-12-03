package fr.formation.itschool.masterpiece.services;

import fr.formation.itschool.masterpiece.dtos.ComplianceReferentViewDto;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ComplianceReferentServiceImpl implements ComplianceReferentService{
  @Override
  public List<ComplianceReferentViewDto> findByCountryAndOrganisationUnitAndRisk(Long countryId, Long organisationUnitId, Long riskId) {
    return null;
  }
}
