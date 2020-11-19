package fr.formation.itschool.masterpiece.dtos;

import fr.formation.itschool.masterpiece.validators.PasswordComplexity;
import fr.formation.itschool.masterpiece.validators.UniqueEmail;
import lombok.Getter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Getter
public class CreateAccountDto {

  @NotBlank
  @UniqueEmail
  @Email
  @Size(max = 255)
  private String email;

  @NotBlank
  @Size(min = 8, max = 255)
  @PasswordComplexity
  private String password;
}
