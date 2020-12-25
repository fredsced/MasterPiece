package fr.formation.itschool.masterpiece.services;

import fr.formation.itschool.masterpiece.dtos.account.AccountInfoDto;
import fr.formation.itschool.masterpiece.dtos.account.CreateAccountDto;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface AccountService extends UserDetailsService {
  void create(CreateAccountDto createAccountDto);

  AccountInfoDto getCurrentAccountInfo(Long id);

  boolean existsByEmail(String email);
}
