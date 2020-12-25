package fr.formation.itschool.masterpiece.controllers;

import fr.formation.itschool.masterpiece.dtos.compliancereferent.ComplianceReferentViewDto;
import fr.formation.itschool.masterpiece.dtos.compliancereferent.ParametersDto;
import fr.formation.itschool.masterpiece.services.ComplianceReferentService;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping(value = "/compliance-referents")
public class ComplianceReferentController {

    private final ComplianceReferentService complianceReferentService;

    protected ComplianceReferentController(ComplianceReferentService complianceReferentService) {
        this.complianceReferentService = complianceReferentService;
    }

    @GetMapping()
    public List<ComplianceReferentViewDto> findByParameters(
            @Valid ParametersDto parameters) {
        return complianceReferentService.findByParameters(parameters);
    }
}
