package fr.formation.itschool.masterpiece.validators;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Documented
@Retention(RetentionPolicy.RUNTIME)
@Target({ElementType.FIELD})
@Constraint(validatedBy =SesamePatternValidator.class)
  public @interface SesamePattern {
  String message() default "sesameWrongPattern";

  Class<?>[] groups() default {};

  Class<? extends Payload>[] payload() default {};

}
