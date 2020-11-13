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
@RequestMapping(value = "/private")
public class OrganisationunitController {

  private final OrganisationunitService organisationunitService;

  protected OrganisationunitController(OrganisationunitService organisationunitService){
    this.organisationunitService = organisationunitService;
  }

  @GetMapping("/ou")
  public List<OrganisationunitViewDto> getAllOrgUnit(){
    return organisationunitService.getAllOrgUnit();
  }

}
