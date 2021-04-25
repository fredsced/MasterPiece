package fr.formation.itschool.masterpiece.validators;

import fr.formation.itschool.masterpiece.services.ComplianceReferentService;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class UniqueEmailRefValidator implements ConstraintValidator<UniqueEmailRef, String> {

  private final ComplianceReferentService complianceReferentService;

  protected UniqueEmailRefValidator(ComplianceReferentService complianceReferentService) {
    this.complianceReferentService = complianceReferentService;
  }

  @Override
  public boolean isValid(String value, ConstraintValidatorContext context) {
    return !complianceReferentService.existsByEmail(value);
  }
}
