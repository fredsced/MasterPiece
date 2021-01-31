package fr.formation.itschool.masterpiece.services;

import fr.formation.itschool.masterpiece.dtos.CountryViewDto;
import fr.formation.itschool.masterpiece.repositories.CountryRepository;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CountryServiceImpl implements CountryService {

  private final CountryRepository countryRepository;
  private final ModelMapper modelMapper;

  protected CountryServiceImpl(CountryRepository countryRepository, ModelMapper modelMapper) {
    this.countryRepository = countryRepository;
    this.modelMapper = modelMapper;
  }

  @Transactional(readOnly = true)
  @Override
  public List<CountryViewDto> getAll() {
    return countryRepository.findAll().stream()
      .map(country -> modelMapper.map(country, CountryViewDto.class)).collect(Collectors.toList());
  }
}
