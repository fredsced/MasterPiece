package fr.formation.itschool.masterpiece.controllers;

import fr.formation.itschool.masterpiece.dtos.OrganisationunitViewDto;
import fr.formation.itschool.masterpiece.services.OrganisationunitService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping(value = "/private/organisation-units")
public class OrganisationUnitController {

  private final OrganisationunitService organisationunitService;

  protected OrganisationUnitController(OrganisationunitService organisationunitService){
    this.organisationunitService = organisationunitService;
  }

  @GetMapping()
  public List<OrganisationunitViewDto> getAllOrganisationUnits(){
    return organisationunitService.getAllOrganisationUnits();
  }

}
