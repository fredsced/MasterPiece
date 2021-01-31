package fr.formation.itschool.masterpiece.services;

import fr.formation.itschool.masterpiece.dtos.OrganisationUnitViewDto;
import fr.formation.itschool.masterpiece.repositories.OrganisationUnitRepository;
import org.modelmapper.ModelMapper;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrganisationUnitServiceImpl implements OrganisationUnitService {

  private final OrganisationUnitRepository organisationUnitRepository;
  private final ModelMapper modelMapper;

  protected OrganisationUnitServiceImpl(
    OrganisationUnitRepository organisationUnitRepository, ModelMapper modelMapper) {
    this.organisationUnitRepository = organisationUnitRepository;
    this.modelMapper = modelMapper;
  }

  @Cacheable("organisationUnits")
  @Transactional(readOnly = true)
  @Override
  public List<OrganisationUnitViewDto> getAllOrganisationUnits() {
    return organisationUnitRepository.findAll().stream()
      .map(organisationUnit -> modelMapper.map(organisationUnit, OrganisationUnitViewDto.class))
      .collect(Collectors.toList());
  }
}
