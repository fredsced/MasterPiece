package fr.formation.itschool.masterpiece.validators;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class SesamePatternValidator implements ConstraintValidator<SesamePattern, String> {
  @Override
  public boolean isValid(String sesame, ConstraintValidatorContext context) {
    /*
    Sesame must begin with an A or X, follows and ending by 6 digits (case insensitive)
     */
    final String regex = "[a,x]\\d{6}";
    final Pattern pattern =
      Pattern.compile(regex, Pattern.CASE_INSENSITIVE);
    Matcher matcher = pattern.matcher(sesame);
    return matcher.matches();
  }
}
