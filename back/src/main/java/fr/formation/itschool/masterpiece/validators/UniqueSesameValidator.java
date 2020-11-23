package fr.formation.itschool.masterpiece.validators;

import fr.formation.itschool.masterpiece.services.CollaboratorService;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class UniqueSesameValidator implements ConstraintValidator<UniqueSesame, String> {

  private final CollaboratorService collaboratorService;

  protected UniqueSesameValidator(CollaboratorService collaboratorService) {
    this.collaboratorService = collaboratorService;
  }

  @Override
  public boolean isValid(String sesame, ConstraintValidatorContext context) {
    return collaboratorService.isSesamePresentsInDB(sesame);
  }
}

