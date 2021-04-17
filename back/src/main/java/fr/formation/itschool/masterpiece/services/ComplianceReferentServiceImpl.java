package fr.formation.itschool.masterpiece.services;

import fr.formation.itschool.masterpiece.domain.Collaborator;
import fr.formation.itschool.masterpiece.domain.ComplianceReferent;
import fr.formation.itschool.masterpiece.dtos.compliancereferent.ComplianceReferentCriteriaDto;
import fr.formation.itschool.masterpiece.dtos.compliancereferent.ComplianceReferentViewDto;
import fr.formation.itschool.masterpiece.dtos.compliancereferent.SaveComplianceReferentDto;
import fr.formation.itschool.masterpiece.repositories.CollaboratorRepository;
import fr.formation.itschool.masterpiece.repositories.ComplianceReferentRepository;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@Service
public class ComplianceReferentServiceImpl implements ComplianceReferentService {

  private final ComplianceReferentRepository complianceReferentRepository;
  private final ModelMapper modelMapper;
  private final CollaboratorRepository collaboratorRepository;

  protected ComplianceReferentServiceImpl(ComplianceReferentRepository complianceReferentRepository, ModelMapper modelMapper, CollaboratorRepository collaboratorRepository) {
    this.complianceReferentRepository = complianceReferentRepository;
    this.modelMapper = modelMapper;
    this.collaboratorRepository = collaboratorRepository;
  }

  @Transactional(readOnly = true)
  @Override
  public List<ComplianceReferentViewDto> search(ComplianceReferentCriteriaDto criteria) {
    return complianceReferentRepository.findWithCriteria(
      criteria.getCountryId(),
      criteria.getOrganisationUnitId(),
      criteria.getRiskId()
    );
  }

  @Transactional(readOnly = false)
  @Override
  public void save(SaveComplianceReferentDto saveComplianceReferentDto) {
   Collaborator collaboratorToSave = modelMapper.map(saveComplianceReferentDto.getSaveCollaboratorDto(), Collaborator.class);
   Collaborator collaboratorSaved = collaboratorRepository.save(collaboratorToSave);
   ComplianceReferent complianceReferentToSave = modelMapper.map(saveComplianceReferentDto, ComplianceReferent.class);
   complianceReferentToSave.setCollaborator(collaboratorSaved);
   log.info(complianceReferentToSave.toString());
    complianceReferentRepository.save(complianceReferentToSave);
  }
}
