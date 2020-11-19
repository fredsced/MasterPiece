package fr.formation.itschool.masterpiece.validators;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.util.regex.Matcher;
import java.util.regex.Pattern;


public class PasswordComplexityValidator implements ConstraintValidator<PasswordComplexity, String> {

  @Override
  public boolean isValid(String password, ConstraintValidatorContext context) {
    /*
    Password must have at least one uppercase, one lowercase, one digit and 8 characters
     */
    Pattern pattern =
        Pattern.compile("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])\\S{8,}");
    Matcher matcher = pattern.matcher(password);
    return matcher.matches();

  }
}
