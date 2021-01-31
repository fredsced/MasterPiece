package fr.formation.itschool.masterpiece.controllers;

import fr.formation.itschool.masterpiece.config.SecurityHelper;
import fr.formation.itschool.masterpiece.dtos.collaborator.SaveCollaboratorDto;
import fr.formation.itschool.masterpiece.services.CollaboratorService;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;


@RestController
@RequestMapping(value = "/collaborators")
public class CollaboratorController {

  private final CollaboratorService collaboratorService;

  protected CollaboratorController(CollaboratorService collaboratorService) {
    this.collaboratorService = collaboratorService;
  }

  @PutMapping()
  public void saveCollaborator(@RequestBody @Valid SaveCollaboratorDto createCollaboratorDto) {
    collaboratorService.saveCollaborator(createCollaboratorDto, SecurityHelper.getAccountId());
  }
}

