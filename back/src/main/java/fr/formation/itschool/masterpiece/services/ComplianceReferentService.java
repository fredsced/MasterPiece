package fr.formation.itschool.masterpiece.services;

import fr.formation.itschool.masterpiece.dtos.compliancereferent.ComplianceReferentViewDto;
import fr.formation.itschool.masterpiece.dtos.compliancereferent.ComplianceReferentCriteriaDto;

import java.util.List;

public interface ComplianceReferentService {

  List<ComplianceReferentViewDto> search(
          ComplianceReferentCriteriaDto criteria);
}
