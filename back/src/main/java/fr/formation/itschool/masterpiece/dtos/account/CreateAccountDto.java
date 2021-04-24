package fr.formation.itschool.masterpiece.dtos.account;

import fr.formation.itschool.masterpiece.validators.ExtendedEmailValidator;
import fr.formation.itschool.masterpiece.validators.PasswordComplexityRequirement;
import fr.formation.itschool.masterpiece.validators.UniqueEmail;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;
import java.util.StringJoiner;

/**
 * DTO representing {@code Account} data to be persisted in database.
 */
 public class CreateAccountDto {

  @NotEmpty
  @ExtendedEmailValidator
  @UniqueEmail
  @Size(max = 254)
  private String email;

  @NotBlank
  @PasswordComplexityRequirement
  private String password;

  public String getEmail() {
    return email;
  }

  public String getPassword() {
    return password;
  }

  @Override
  public String toString() {
    return new StringJoiner(", ", CreateAccountDto.class.getSimpleName() + "[", "]")
      .add("email=" + email)
      .add("password=" + "[hide]")
      .toString();
  }
}
