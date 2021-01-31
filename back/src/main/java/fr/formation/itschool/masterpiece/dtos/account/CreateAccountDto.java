package fr.formation.itschool.masterpiece.dtos.account;

import fr.formation.itschool.masterpiece.validators.PasswordComplexityRequirement;
import fr.formation.itschool.masterpiece.validators.UniqueEmail;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.StringJoiner;

public class CreateAccountDto {

  @Email
  @UniqueEmail
  @Size(max = 255)
  private String email;

  @NotBlank
  @Size(min = 8, max = 30)
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
