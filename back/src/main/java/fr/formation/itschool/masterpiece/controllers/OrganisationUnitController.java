package fr.formation.itschool.masterpiece.controllers;

import fr.formation.itschool.masterpiece.dtos.OrganisationUnitViewDto;
import fr.formation.itschool.masterpiece.services.OrganisationUnitService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RestController
@RequestMapping(value = "/organisation-units")
public class OrganisationUnitController {

  private final OrganisationUnitService organisationUnitService;

  protected OrganisationUnitController(OrganisationUnitService organisationUnitService) {
    this.organisationUnitService = organisationUnitService;
  }

  @GetMapping()
  public List<OrganisationUnitViewDto> getAllOrganisationUnits() {
    return organisationUnitService.getAllOrganisationUnits();
  }
}
