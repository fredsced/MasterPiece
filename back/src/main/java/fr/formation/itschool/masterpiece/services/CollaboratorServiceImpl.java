package fr.formation.itschool.masterpiece.services;

import fr.formation.itschool.masterpiece.domain.Account;
import fr.formation.itschool.masterpiece.domain.Collaborator;
import fr.formation.itschool.masterpiece.dtos.collaborator.CollaboratorInfoDto;
import fr.formation.itschool.masterpiece.dtos.collaborator.SaveCollaboratorDto;
import fr.formation.itschool.masterpiece.exceptions.ResourceNotFoundException;
import fr.formation.itschool.masterpiece.repositories.AccountRepository;
import fr.formation.itschool.masterpiece.repositories.CollaboratorRepository;
import fr.formation.itschool.masterpiece.security.SecurityHelper;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

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

  @Transactional(readOnly = true)
  @Override
  public boolean hasProfile(Long id) {
    return collaboratorRepository.existsByAccountId(id);
  }

  @Transactional(readOnly = false)
  @Override
  public void saveCollaborator(SaveCollaboratorDto saveCollaboratorDto, Long accountId) {
    Collaborator collaboratorToCreate = modelMapper.map(saveCollaboratorDto, Collaborator.class);
    Account account = accountRepository.getOne(accountId);
    collaboratorToCreate.setAccount(account);
    Optional<Collaborator> previousCollaborator = collaboratorRepository.findByAccountId(accountId, Collaborator.class);
    previousCollaborator.ifPresent(collaborator -> collaboratorToCreate.setId(collaborator.getId()));
    collaboratorRepository.save(collaboratorToCreate);
  }

  @Transactional(readOnly = true)
  @Override
  public CollaboratorInfoDto getCollaboratorInfoByAccountId(Long accountId) {
    return collaboratorRepository.findByAccountId(accountId, CollaboratorInfoDto.class).orElseThrow(() -> new ResourceNotFoundException("No account find with this id"));
  }

  @Transactional(readOnly = true)
  @Override
  public boolean uniqueSesame(String sesame) {
    if (collaboratorRepository.existsBySesameIgnoreCase(sesame)) {
      Optional<Collaborator> currentCollaborator = collaboratorRepository.findByAccountId(SecurityHelper.getAccountId(), Collaborator.class);
      return currentCollaborator.map(collaborator -> (sesame.equalsIgnoreCase(collaborator.getSesame()))).orElse(false);
    } else {
      return true;
    }
  }
}
