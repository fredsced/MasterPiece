package fr.formation.itschool.masterpiece.services;

import fr.formation.itschool.masterpiece.dtos.compliancereferent.ComplianceReferentViewDto;
import fr.formation.itschool.masterpiece.dtos.compliancereferent.ParametersDto;

import java.util.List;

public interface ComplianceReferentService {

  List<ComplianceReferentViewDto> findByParameters(
          ParametersDto parameters);
}
