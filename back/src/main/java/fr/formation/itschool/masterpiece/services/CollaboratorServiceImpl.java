package fr.formation.itschool.masterpiece.services;

import fr.formation.itschool.masterpiece.config.SecurityHelper;
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
  private final ModelMapper modelMapper;


  protected CollaboratorServiceImpl(
    CollaboratorRepository collaboratorRepository,
    AccountRepository accountRepository,
    ModelMapper modelMapper) {
    this.collaboratorRepository = collaboratorRepository;
    this.accountRepository = accountRepository;
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
    Collaborator previousCollaborator = collaboratorRepository.findByAccountId(accountId, Collaborator.class);
    if (previousCollaborator != null){
      collaboratorToCreate.setId(previousCollaborator.getId());
    }
    collaboratorRepository.save(collaboratorToCreate);
  }

  @Override
  public CollaboratorInfoDto getCollaboratorInfoByAccountId(Long accountId) {
    return collaboratorRepository.findByAccountId(accountId, CollaboratorInfoDto.class);
  }

  @Override
  public boolean uniqueSesame(String sesame) {
    Collaborator currentCollaborator = collaboratorRepository.findByAccountId(SecurityHelper.getAccountId(), Collaborator.class);
    if (currentCollaborator != null) {
      return (sesame.equals(currentCollaborator.getSesame())) || !collaboratorRepository.existsBySesameIgnoreCase(sesame);
    } else {
      return !collaboratorRepository.existsBySesameIgnoreCase(sesame);
    }
  }
}
