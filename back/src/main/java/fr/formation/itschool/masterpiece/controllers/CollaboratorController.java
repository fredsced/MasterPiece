package fr.formation.itschool.masterpiece.controllers;

import fr.formation.itschool.masterpiece.security.SecurityHelper;
import fr.formation.itschool.masterpiece.dtos.collaborator.SaveCollaboratorDto;
import fr.formation.itschool.masterpiece.services.CollaboratorService;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

/**
 * A {@code RestController} to handle {@code Collaborators}.
 *
 */

@RestController
@RequestMapping(value = "/collaborators")
public class CollaboratorController {

  private final CollaboratorService collaboratorService;

  protected CollaboratorController(CollaboratorService collaboratorService) {
    this.collaboratorService = collaboratorService;
  }

  /**
   * Creates or update a collaborator profile given lastname, firstname, sesame, countryId and organisationUnitId
   *
   * @param saveCollaboratorDto
   */
  @PutMapping()
  protected void saveCollaborator(@RequestBody @Valid SaveCollaboratorDto saveCollaboratorDto) {
    collaboratorService.saveCollaborator(saveCollaboratorDto, SecurityHelper.getAccountId());
  }
}

