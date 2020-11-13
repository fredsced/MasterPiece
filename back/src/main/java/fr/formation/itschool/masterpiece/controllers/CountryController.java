package fr.formation.itschool.masterpiece.controllers;

import fr.formation.itschool.masterpiece.dtos.CountryViewDto;
import fr.formation.itschool.masterpiece.services.CountryService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping(value = "/private")
public class CountryController {
  private final CountryService countryService;

  protected CountryController(CountryService countryService){
    this.countryService = countryService;
  }
  @GetMapping("/countries")
  public List<CountryViewDto> getAllCountries(){
    return countryService.getAll();
  }
}
