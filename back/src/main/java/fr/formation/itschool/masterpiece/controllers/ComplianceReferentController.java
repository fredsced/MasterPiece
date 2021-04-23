package fr.formation.itschool.masterpiece.controllers;

import fr.formation.itschool.masterpiece.dtos.compliancereferent.ComplianceReferentCriteriaDto;
import fr.formation.itschool.masterpiece.dtos.compliancereferent.ComplianceReferentViewDto;
import fr.formation.itschool.masterpiece.dtos.compliancereferent.SaveComplianceReferentDto;
import fr.formation.itschool.masterpiece.services.ComplianceReferentService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.List;

/**
 * A {@code RestController} to handle {@code ComplianceReferents}.
 */

@RestController
@RequestMapping(value = "/compliance-referents")
public class ComplianceReferentController {

  private final ComplianceReferentService complianceReferentService;

  /**
   * Protected constructor to autowire needed bean
   *
   * @param complianceReferentService interface
   */
  protected ComplianceReferentController(ComplianceReferentService complianceReferentService) {
    this.complianceReferentService = complianceReferentService;
  }

  /**
   * @param countryId
   * @param riskId
   * @param organisationUnitId
   * @return a {@code List} of {@code ComplianceReferentViewDto}
   */
  @PreAuthorize("hasRole('ROLE_USER')")
  @GetMapping()
  protected List<ComplianceReferentViewDto> search(
    @RequestParam Long countryId, @RequestParam Long riskId, @RequestParam Long organisationUnitId) {
    return complianceReferentService.search(countryId,riskId,organisationUnitId);
  }

  /**
   * Persists a {@code SaveComplianceReferentDto}
   *
   * @param saveComplianceReferentDto {@code SaveComplianceReferentDto} to persist
   */

  @PreAuthorize(("hasRole('ROLE_ADMIN')"))
  @PostMapping()
  protected void saveComplianceReferent(
    @Valid @RequestBody SaveComplianceReferentDto saveComplianceReferentDto) {
    complianceReferentService.save(saveComplianceReferentDto);
  }
}
