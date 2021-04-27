package fr.formation.itschool.masterpiece.services;

import fr.formation.itschool.masterpiece.dtos.compliancereferent.ComplianceReferentViewDto;
import fr.formation.itschool.masterpiece.dtos.compliancereferent.SaveComplianceReferentDto;

import java.util.List;

public interface ComplianceReferentService {

  List<ComplianceReferentViewDto> search(
          Long countryId, Long OrganisationUnitId, Long RiskId );

  void save(SaveComplianceReferentDto saveComplianceReferentDto);
  boolean existsByEmail(String email);
}
