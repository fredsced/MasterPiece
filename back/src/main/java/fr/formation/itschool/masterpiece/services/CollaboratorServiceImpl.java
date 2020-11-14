package fr.formation.itschool.masterpiece.services;

import fr.formation.itschool.masterpiece.domain.Account;
import fr.formation.itschool.masterpiece.domain.Collaborator;
import fr.formation.itschool.masterpiece.domain.Country;
import fr.formation.itschool.masterpiece.domain.Organisationunit;
import fr.formation.itschool.masterpiece.dtos.CollaboratorNameDto;
import fr.formation.itschool.masterpiece.dtos.CreateCollaboratorDto;
import fr.formation.itschool.masterpiece.exceptions.ResourceNotFoundException;
import fr.formation.itschool.masterpiece.repositories.AccountRepository;
import fr.formation.itschool.masterpiece.repositories.CollaboratorRepository;
import fr.formation.itschool.masterpiece.repositories.CountryRepository;
import fr.formation.itschool.masterpiece.repositories.OrganisationunitRepository;
import org.springframework.stereotype.Service;

@Service
public class CollaboratorServiceImpl implements CollaboratorService {

  private final CollaboratorRepository collaboratorRepository;
  private final AccountRepository accountRepository;
  private final CountryRepository countryRepository;
  private final OrganisationunitRepository ouRepository;

  protected CollaboratorServiceImpl(
      CollaboratorRepository collaboratorRepository,
      AccountRepository accountRepository,
      CountryRepository countryRepository,
      OrganisationunitRepository ouRepository) {
    this.collaboratorRepository = collaboratorRepository;
    this.accountRepository = accountRepository;
    this.countryRepository = countryRepository;
    this.ouRepository = ouRepository;
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
    Organisationunit ou =
        ouRepository
            .findByCodeIgnoreCase(createCollaboratorDto.getOuCode())
            .orElseThrow(
                () ->
                    new ResourceNotFoundException(
                        "No organisation unit with the code :"
                            + createCollaboratorDto.getOuCode()));
    Account account = accountRepository.getOne(accountId);
    collaboratorToCreate.setAccount(account);
    collaboratorToCreate.setCountry(country);
    collaboratorToCreate.setOrganisationUnit(ou);
    collaboratorToCreate.setFirstname(createCollaboratorDto.getFirstname());
    collaboratorToCreate.setName(createCollaboratorDto.getName());
    collaboratorToCreate.setSesameId(createCollaboratorDto.getSesameId());
    collaboratorRepository.save(collaboratorToCreate);
  }

  @Override
  public CollaboratorNameDto getNameByAccountId(Long accoundId) {
    return collaboratorRepository.findByAccountId(accoundId);
  }

  @Override
  public boolean isSesameIdPresentsInDB(String sesameId) {
    return !collaboratorRepository.existsBySesameIdIgnoreCase(sesameId);
  }
}
