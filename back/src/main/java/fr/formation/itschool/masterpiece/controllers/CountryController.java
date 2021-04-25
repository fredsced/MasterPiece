package fr.formation.itschool.masterpiece.controllers;

import fr.formation.itschool.masterpiece.dtos.CountryViewDto;
import fr.formation.itschool.masterpiece.services.CountryService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.SpringVersion;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * A {@code RestController} to handle {@code Countries}.
 *
 */
@Slf4j
@RestController
@RequestMapping(value = "/countries")
public class CountryController {
    private final CountryService countryService;

    protected CountryController(CountryService countryService) {
        this.countryService = countryService;
    }

    @PreAuthorize("hasRole('ROLE_USER')")
    @GetMapping()
    protected List<CountryViewDto> getAllCountries() {

        return countryService.getAll();
    }
}
