package fr.formation.itschool.masterpiece.validators;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.util.regex.Matcher;
import java.util.regex.Pattern;


public class PasswordComplexityRequirementValidator implements ConstraintValidator<PasswordComplexityRequirement, String> {

  @Override
  public boolean isValid(String password, ConstraintValidatorContext context) {
    /*
    Password must have at least one uppercase, one lowercase, one digit and 8 characters min, 25 max
     */
    final String regex = "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])\\S{8,25}";
    final Pattern pattern =
      Pattern.compile(regex);
    Matcher matcher = pattern.matcher(password);
    return matcher.matches();

  }
}
