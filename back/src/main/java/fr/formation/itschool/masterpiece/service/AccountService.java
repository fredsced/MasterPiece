package fr.formation.itschool.masterpiece.service;

import fr.formation.itschool.masterpiece.dto.AccountDto;
import fr.formation.itschool.masterpiece.dto.AccountInfoDto;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface AccountService extends UserDetailsService {
  void create(AccountDto accountDto);
  AccountInfoDto getCurrentAccountInfo(Long id);

}
