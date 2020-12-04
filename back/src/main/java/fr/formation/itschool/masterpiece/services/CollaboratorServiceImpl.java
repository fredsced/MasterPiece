package fr.formation.itschool.masterpiece.services;

import fr.formation.itschool.masterpiece.config.SecurityHelper;
import fr.formation.itschool.masterpiece.domain.Account;
import fr.formation.itschool.masterpiece.domain.Collaborator;
import fr.formation.itschool.masterpiece.dtos.CollaboratorInfoDto;
import fr.formation.itschool.masterpiece.dtos.ComplianceReferentViewDto;
import fr.formation.itschool.masterpiece.dtos.CreateCollaboratorDto;
import fr.formation.itschool.masterpiece.repositories.AccountRepository;
import fr.formation.itschool.masterpiece.repositories.CollaboratorRepository;
import fr.formation.itschool.masterpiece.repositories.ComplianceReferentRepository;
import fr.formation.itschool.masterpiece.repositories.CountryRepository;
import fr.formation.itschool.masterpiece.repositories.OrganisationUnitRepository;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CollaboratorServiceImpl implements CollaboratorService {

  private final CollaboratorRepository collaboratorRepository;
  private final AccountRepository accountRepository;
  private final CountryRepository countryRepository;
  private final OrganisationUnitRepository organisationUnitRepository;
  private final ComplianceReferentRepository complianceReferentRepository;
  private final ModelMapper modelmapper;

  protected CollaboratorServiceImpl(
    CollaboratorRepository collaboratorRepository,
    AccountRepository accountRepository,
    CountryRepository countryRepository,
    OrganisationUnitRepository ouRepository,
    ComplianceReferentRepository complianceReferentRepository,
    ModelMapper modelMapper) {
    this.collaboratorRepository = collaboratorRepository;
    this.accountRepository = accountRepository;
    this.countryRepository = countryRepository;
    this.organisationUnitRepository = ouRepository;
    this.complianceReferentRepository = complianceReferentRepository;
    this.modelmapper = modelMapper;
  }

  @Override
  public boolean hasProfile(Long id) {
    return collaboratorRepository.existsByAccountId(id);
  }

  @Override
  public void createCollaborator(CreateCollaboratorDto createCollaboratorDto, Long accountId) {
    Collaborator collaboratorToCreate = modelmapper.map(createCollaboratorDto, Collaborator.class);
    Account account = accountRepository.getOne(accountId);
    collaboratorToCreate.setAccount(account);
    collaboratorRepository.save(collaboratorToCreate);
  }

  @Override
  public CollaboratorInfoDto getCollaboratorInfoByAccountId(Long accountId) {
    return collaboratorRepository.findByAccountId(accountId, CollaboratorInfoDto.class);
  }

  @Override
  public boolean isSesamePresentsInDB(String sesameId) {
    return !collaboratorRepository.existsBySesameIgnoreCase(sesameId);
  }

  @Override
  public List<ComplianceReferentViewDto> getLcoByRisk(String riskCode) {
    // this function  will make 5 requests...
    // Two to retrieve currentCollaborator
    // One for the country
    // One for the orgUnit
    // One for the select with filter risk, country, orgunit
    Collaborator currentCollaborator =
      collaboratorRepository.findByAccountId(SecurityHelper.getAccountId(), Collaborator.class);
    return complianceReferentRepository.findMyComplianceReferentByRisk(
      riskCode,
      currentCollaborator.getCountry().getId(),
      currentCollaborator.getOrganisationUnit().getId());
  }
}
