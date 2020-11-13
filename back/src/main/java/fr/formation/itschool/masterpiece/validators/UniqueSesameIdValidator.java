package fr.formation.itschool.masterpiece.validators;

import fr.formation.itschool.masterpiece.services.CollaboratorService;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class UniqueSesameIdValidator implements ConstraintValidator<UniqueSesameId, String> {

  private final CollaboratorService collaboratorService;

  protected UniqueSesameIdValidator(CollaboratorService collaboratorService) {
    this.collaboratorService = collaboratorService;
  }

  @Override
  public boolean isValid(String sesameId, ConstraintValidatorContext context) {
    return collaboratorService.isSesameIdPresentsInDB(sesameId);
  }
}

