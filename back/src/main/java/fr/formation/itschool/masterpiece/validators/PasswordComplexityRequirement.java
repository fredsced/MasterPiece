package fr.formation.itschool.masterpiece.validators;


import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/*
    Password must have at least one uppercase, one lowercase, one digit and 8 characters

 */

@Documented
@Retention(RetentionPolicy.RUNTIME)
@Target({ElementType.FIELD})
@Constraint(validatedBy = PasswordComplexityRequirementValidator.class)
public @interface PasswordComplexityRequirement {
  String message() default "PasswordComplexityRequirement";

  Class<?>[] groups() default {};

  Class<? extends Payload>[] payload() default {};
}
