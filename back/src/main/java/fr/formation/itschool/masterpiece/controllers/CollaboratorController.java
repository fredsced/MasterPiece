package fr.formation.itschool.masterpiece.controllers;

import fr.formation.itschool.masterpiece.config.SecurityHelper;
import fr.formation.itschool.masterpiece.dtos.CreateCollaboratorDto;
import fr.formation.itschool.masterpiece.dtos.LcoViewDto;
import fr.formation.itschool.masterpiece.services.CollaboratorService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping(value = "/private/collaborators")
public class CollaboratorController {

  private final CollaboratorService collaboratorService;

  protected CollaboratorController(CollaboratorService collaboratorService) {
    this.collaboratorService = collaboratorService;
  }

  @GetMapping("/hasprofile")
  public boolean hasProfile() {
    return collaboratorService.hasProfile(SecurityHelper.getAccountId());
  }

  @PostMapping()
  public void createCollaborator(@RequestBody @Valid CreateCollaboratorDto createCollaboratorDto) {
    collaboratorService.createCollaborator(createCollaboratorDto, SecurityHelper.getAccountId());
  }
  @GetMapping("/getmylco")
  public List<LcoViewDto> getLcoByRisk(@RequestParam String riskCode) {
    // TODO SANITIZE inputs riskCode to avoid SQL Injection ?
    return collaboratorService.getLcoByRisk(riskCode);
  }
}
