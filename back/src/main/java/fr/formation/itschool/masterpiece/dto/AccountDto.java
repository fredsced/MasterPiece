package fr.formation.itschool.masterpiece.dto;

import lombok.Getter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

@Getter
public class AccountDto {

    @NotBlank
    @Email
    private String email;

    @NotBlank
    private String password;
}
