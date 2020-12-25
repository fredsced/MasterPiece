package fr.formation.itschool.masterpiece.services;

import fr.formation.itschool.masterpiece.dtos.collaborator.CollaboratorInfoDto;
import fr.formation.itschool.masterpiece.dtos.collaborator.CreateCollaboratorDto;

public interface CollaboratorService {

  boolean hasProfile(Long id);

  void createCollaborator(CreateCollaboratorDto createCollaboratorDto, Long accountId);

  CollaboratorInfoDto getCollaboratorInfoByAccountId(Long accountId);

  boolean existsBySesame(String sesameId);
}
