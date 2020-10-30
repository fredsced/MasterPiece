package fr.formation.itschool.masterpiece.services;

import fr.formation.itschool.masterpiece.dtos.CreateAccountDto;
import fr.formation.itschool.masterpiece.dtos.AccountInfoDto;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface AccountService extends UserDetailsService {
  void create(CreateAccountDto createAccountDto);
  AccountInfoDto getCurrentAccountInfo(Long id);
  boolean isEmailPresentInDB(String email);

}
