package fr.formation.itschool.masterpiece.validators;

import fr.formation.itschool.masterpiece.services.AccountService;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class UniqueEmailValidator implements ConstraintValidator<UniqueEmail, String> {

  private final AccountService accountService;

  protected UniqueEmailValidator(AccountService accountService){
    this.accountService=accountService;
  }

  @Override
  public boolean isValid(String email, ConstraintValidatorContext context) {
    return !accountService.isEmailPresentsInDB(email);
  }
}
