package fr.formation.itschool.masterpiece.services;

import fr.formation.itschool.masterpiece.dtos.CollaboratorInfoDto;
import fr.formation.itschool.masterpiece.dtos.ComplianceReferentViewDto;
import fr.formation.itschool.masterpiece.dtos.CreateCollaboratorDto;

import java.util.List;

public interface CollaboratorService {

  boolean hasProfile(Long id);

  void createCollaborator(CreateCollaboratorDto createCollaboratorDto, Long accountId);

  CollaboratorInfoDto getCollaboratorInfoByAccountId(Long accountId);

  boolean isSesamePresentsInDB(String sesameId);

  List<ComplianceReferentViewDto> getLcoByRisk(String riskCode);
}
