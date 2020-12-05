package fr.formation.itschool.masterpiece.controllers;

import fr.formation.itschool.masterpiece.config.SecurityHelper;
import fr.formation.itschool.masterpiece.dtos.ComplianceReferentViewDto;
import fr.formation.itschool.masterpiece.dtos.CreateCollaboratorDto;
import fr.formation.itschool.masterpiece.services.CollaboratorService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.List;


@RestController
@RequestMapping(value = "/collaborators")
public class CollaboratorController {

  private final CollaboratorService collaboratorService;

  protected CollaboratorController(CollaboratorService collaboratorService) {
    this.collaboratorService = collaboratorService;
  }

  @PostMapping()
  public void createCollaborator(@RequestBody @Valid CreateCollaboratorDto createCollaboratorDto) {
    collaboratorService.createCollaborator(createCollaboratorDto, SecurityHelper.getAccountId());
  }

  // TODO : rename & rework this end point to make it more generic
  // and should be in the complianceReferents end point as it retrieves CR...
  // and a query because it filters the CR entities.
  // like this : api/complianceReferents?countryId=..&organisationUnitId=...&riskId=...
  //
  @GetMapping("/getmylco")
  public List<ComplianceReferentViewDto> getLcoByRisk(@RequestParam String riskCode) {
    return collaboratorService.getLcoByRisk(riskCode);
  }
}
