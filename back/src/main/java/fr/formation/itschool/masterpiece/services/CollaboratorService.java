package fr.formation.itschool.masterpiece.services;

import fr.formation.itschool.masterpiece.dtos.CreateCollaboratorDto;

public interface CollaboratorService {

  boolean hasProfile(Long id);

  void createCollaborator(CreateCollaboratorDto createCollaboratorDto, Long accountId);

  boolean isSesameIdPresentsInDB(String sesameId);
}
