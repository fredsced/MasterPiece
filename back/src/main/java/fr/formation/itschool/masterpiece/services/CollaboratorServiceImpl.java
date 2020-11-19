package fr.formation.itschool.masterpiece.services;

import fr.formation.itschool.masterpiece.config.SecurityHelper;
import fr.formation.itschool.masterpiece.domain.Account;
import fr.formation.itschool.masterpiece.domain.Collaborator;
import fr.formation.itschool.masterpiece.domain.Country;
import fr.formation.itschool.masterpiece.domain.OrganisationUnit;
import fr.formation.itschool.masterpiece.dtos.CollaboratorNameDto;
import fr.formation.itschool.masterpiece.dtos.CreateCollaboratorDto;
import fr.formation.itschool.masterpiece.dtos.LcoViewDto;
import fr.formation.itschool.masterpiece.exceptions.ResourceNotFoundException;
import fr.formation.itschool.masterpiece.repositories.AccountRepository;
import fr.formation.itschool.masterpiece.repositories.CollaboratorRepository;
import fr.formation.itschool.masterpiece.repositories.ComplianceReferentRepository;
import fr.formation.itschool.masterpiece.repositories.CountryRepository;
import fr.formation.itschool.masterpiece.repositories.OrganisationUnitRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CollaboratorServiceImpl implements CollaboratorService {

  private final CollaboratorRepository collaboratorRepository;
  private final AccountRepository accountRepository;
  private final CountryRepository countryRepository;
  private final OrganisationUnitRepository organisationUnitRepository;
  private final ComplianceReferentRepository complianceReferentRepository;

  protected CollaboratorServiceImpl(
      CollaboratorRepository collaboratorRepository,
      AccountRepository accountRepository,
      CountryRepository countryRepository,
      OrganisationUnitRepository ouRepository,
      ComplianceReferentRepository complianceReferentRepository) {
    this.collaboratorRepository = collaboratorRepository;
    this.accountRepository = accountRepository;
    this.countryRepository = countryRepository;
    this.organisationUnitRepository = ouRepository;
    this.complianceReferentRepository = complianceReferentRepository;
  }

  @Override
  public boolean hasProfile(Long id) {
    return collaboratorRepository.existsByAccountId(id);
  }

  @Override
  public void createCollaborator(CreateCollaboratorDto createCollaboratorDto, Long accountId) {
    Collaborator collaboratorToCreate = new Collaborator();
    Country country =
        countryRepository
            .findByIsoIgnoreCase(createCollaboratorDto.getCountryIso())
            .orElseThrow(
                () ->
                    new ResourceNotFoundException(
                        "No country with the code iso :" + createCollaboratorDto.getCountryIso()));
    OrganisationUnit organisationunit =
        organisationUnitRepository
            .findByCodeIgnoreCase(createCollaboratorDto.getOrganisationUnitCode())
            .orElseThrow(
                () ->
                    new ResourceNotFoundException(
                        "No organisation unit with the code :"
                            + createCollaboratorDto.getOrganisationUnitCode()));
    Account account = accountRepository.getOne(accountId);
    collaboratorToCreate.setAccount(account);
    collaboratorToCreate.setCountry(country);
    collaboratorToCreate.setOrganisationUnit(organisationunit);
    collaboratorToCreate.setFirstName(createCollaboratorDto.getFirstName());
    collaboratorToCreate.setName(createCollaboratorDto.getName());
    collaboratorToCreate.setSesameId(createCollaboratorDto.getSesameId());
    collaboratorRepository.save(collaboratorToCreate);
  }

  @Override
  public CollaboratorNameDto getNameByAccountId(Long accountId) {
    return collaboratorRepository.findByAccountId(accountId, CollaboratorNameDto.class);
  }

  @Override
  public boolean isSesameIdPresentsInDB(String sesameId) {
    return !collaboratorRepository.existsBySesameIdIgnoreCase(sesameId);
  }

  @Override
  public List<LcoViewDto> getLcoByRisk(String riskCode) {
    Collaborator currentCollaborator =
        collaboratorRepository.findByAccountId(SecurityHelper.getAccountId(), Collaborator.class);
    return complianceReferentRepository.findMyComplianceReferentByRisk(
        riskCode,
        currentCollaborator.getCountry().getId(),
        currentCollaborator.getOrganisationUnit().getId());
  }
}
