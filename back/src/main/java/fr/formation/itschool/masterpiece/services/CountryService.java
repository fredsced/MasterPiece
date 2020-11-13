package fr.formation.itschool.masterpiece.services;

import fr.formation.itschool.masterpiece.domain.Country;
import fr.formation.itschool.masterpiece.dtos.CountryViewDto;

import java.util.List;

public interface CountryService {
  List<CountryViewDto> getAll();
}
