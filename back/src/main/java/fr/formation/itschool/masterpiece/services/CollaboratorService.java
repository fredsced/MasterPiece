package fr.formation.itschool.masterpiece.services;

import fr.formation.itschool.masterpiece.dtos.collaborator.CollaboratorInfoDto;
import fr.formation.itschool.masterpiece.dtos.collaborator.SaveCollaboratorDto;

public interface CollaboratorService {

  boolean hasProfile(Long id);

  void saveCollaborator(SaveCollaboratorDto saveCollaboratorDto, Long accountId);

  CollaboratorInfoDto getCollaboratorInfoByAccountId(Long accountId);

  boolean uniqueSesame(String sesameId);
}
