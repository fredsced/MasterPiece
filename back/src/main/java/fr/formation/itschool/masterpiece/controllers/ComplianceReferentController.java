package fr.formation.itschool.masterpiece.controllers;

import fr.formation.itschool.masterpiece.dtos.ComplianceReferentViewDto;
import fr.formation.itschool.masterpiece.services.ComplianceReferentService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping(value = "/complianceReferents")
public class ComplianceReferentController {

  private final ComplianceReferentService complianceReferentService;

  protected ComplianceReferentController(ComplianceReferentService complianceReferentService) {
    this.complianceReferentService = complianceReferentService;
  }

  @GetMapping()
  public List<ComplianceReferentViewDto> findByCountryAndOrganisationUnitAndRisk(
      @RequestParam Long countryId,
      @RequestParam Long organisationUnitId,
      @RequestParam Long riskId) {
    return complianceReferentService.findByCountryAndOrganisationUnitAndRisk(
        countryId, organisationUnitId, riskId);
  }
}
