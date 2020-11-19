package fr.formation.itschool.masterpiece.services;

import fr.formation.itschool.masterpiece.dtos.OrganisationunitViewDto;
import fr.formation.itschool.masterpiece.repositories.OrganisationunitRepository;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrganisationunitServiceImpl implements OrganisationunitService {

  private final OrganisationunitRepository organisationUnitRepository;
  private final ModelMapper modelMapper;

  protected OrganisationunitServiceImpl(
      OrganisationunitRepository organisationUnitRepository, ModelMapper modelMapper) {
    this.organisationUnitRepository = organisationUnitRepository;
    this.modelMapper = modelMapper;
  }

  @Override
  public List<OrganisationunitViewDto> getAllOrganisationUnits() {
    return organisationUnitRepository.findAll().stream()
        .map(organisationUnit -> modelMapper.map(organisationUnit, OrganisationunitViewDto.class))
        .collect(Collectors.toList());
  }
}
