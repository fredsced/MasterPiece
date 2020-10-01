package fr.formation.itschool.masterpiece.validators;

import fr.formation.itschool.masterpiece.repositories.AccountRepository;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class UniqueEmailValidator implements ConstraintValidator<UniqueEmail, String> {

  private final AccountRepository accountRepository;

  protected UniqueEmailValidator(AccountRepository accountRepository) {
    this.accountRepository = accountRepository;
  }

  @Override
  public boolean isValid(String email, ConstraintValidatorContext context) {
    return !accountRepository.existsByEmailIgnoreCase(email);
  }
}
