package fr.formation.itschool.masterpiece.services;

import fr.formation.itschool.masterpiece.dtos.ComplianceReferentViewDto;

import java.util.List;

public interface ComplianceReferentService {

  List<ComplianceReferentViewDto> findByCountryAndOrganisationUnitAndRisk(
      Long countryId, Long organisationUnitId, Long riskId);
}
