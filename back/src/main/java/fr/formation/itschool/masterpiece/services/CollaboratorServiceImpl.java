package fr.formation.itschool.masterpiece.services;

import fr.formation.itschool.masterpiece.domain.Account;
import fr.formation.itschool.masterpiece.domain.Collaborator;
import fr.formation.itschool.masterpiece.dtos.collaborator.CollaboratorInfoDto;
import fr.formation.itschool.masterpiece.dtos.collaborator.CreateCollaboratorDto;
import fr.formation.itschool.masterpiece.repositories.AccountRepository;
import fr.formation.itschool.masterpiece.repositories.CollaboratorRepository;
import fr.formation.itschool.masterpiece.repositories.ComplianceReferentRepository;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

@Service
public class CollaboratorServiceImpl implements CollaboratorService {

  private final CollaboratorRepository collaboratorRepository;
  private final AccountRepository accountRepository;
  private final ComplianceReferentRepository complianceReferentRepository;
  private final ModelMapper modelMapper;


  protected CollaboratorServiceImpl(
    CollaboratorRepository collaboratorRepository,
    AccountRepository accountRepository,
    ComplianceReferentRepository complianceReferentRepository,
    ModelMapper modelMapper) {
    this.collaboratorRepository = collaboratorRepository;
    this.accountRepository = accountRepository;
    this.complianceReferentRepository = complianceReferentRepository;
    this.modelMapper = modelMapper;
  }

  @Override
  public boolean hasProfile(Long id) {
    return collaboratorRepository.existsByAccountId(id);
  }

  @Override
  public void createCollaborator(CreateCollaboratorDto createCollaboratorDto, Long accountId) {
    Collaborator collaboratorToCreate = modelMapper.map(createCollaboratorDto, Collaborator.class);

    Account account = accountRepository.getOne(accountId);
    collaboratorToCreate.setAccount(account);
    collaboratorRepository.save(collaboratorToCreate);
  }

  @Override
  public CollaboratorInfoDto getCollaboratorInfoByAccountId(Long accountId) {
    return collaboratorRepository.findByAccountId(accountId, CollaboratorInfoDto.class);
  }

  @Override
  public boolean existsBySesame(String sesameId) {
    return !collaboratorRepository.existsBySesameIgnoreCase(sesameId);
  }

}
