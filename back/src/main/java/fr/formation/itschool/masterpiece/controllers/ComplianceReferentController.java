package fr.formation.itschool.masterpiece.controllers;

import fr.formation.itschool.masterpiece.dtos.compliancereferent.ComplianceReferentViewDto;
import fr.formation.itschool.masterpiece.dtos.compliancereferent.ComplianceReferentCriteriaDto;
import fr.formation.itschool.masterpiece.services.ComplianceReferentService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

/**
 * A {@code RestController} to handle {@code ComplianceReferents}.
 *
 */

@RestController
@RequestMapping(value = "/compliance-referents")
public class ComplianceReferentController {

    private final ComplianceReferentService complianceReferentService;

    protected ComplianceReferentController(ComplianceReferentService complianceReferentService) {
        this.complianceReferentService = complianceReferentService;
    }

    /**
     *
     * @param criteria
     * @return
     */
    @PreAuthorize("hasRole('ROLE_USER')")
    @GetMapping()
    protected List<ComplianceReferentViewDto> search(
            @Valid ComplianceReferentCriteriaDto criteria) {
        return complianceReferentService.search(criteria);
    }
}
