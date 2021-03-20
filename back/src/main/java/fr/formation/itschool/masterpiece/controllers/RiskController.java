package fr.formation.itschool.masterpiece.controllers;

import fr.formation.itschool.masterpiece.dtos.RiskViewDto;
import fr.formation.itschool.masterpiece.services.RiskService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * A {@code RestController} to handle {@code Risks}.
 *
 */

@RestController
@RequestMapping(value = "/risks")
public class RiskController {
    private final RiskService riskService;

    protected RiskController(RiskService riskService) {
        this.riskService = riskService;
    }

    @GetMapping()
    protected List<RiskViewDto> getAllRisks() {
        return riskService.getAll();
    }
}
