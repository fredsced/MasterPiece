package fr.formation.itschool.masterpiece.services;

import fr.formation.itschool.masterpiece.config.AccountDetails;
import fr.formation.itschool.masterpiece.domain.Account;
import fr.formation.itschool.masterpiece.domain.Role;
import fr.formation.itschool.masterpiece.dtos.AccountAuthDto;
import fr.formation.itschool.masterpiece.dtos.AccountInfoDto;
import fr.formation.itschool.masterpiece.dtos.CreateAccountDto;
import fr.formation.itschool.masterpiece.exceptions.ResourceNotFoundException;
import fr.formation.itschool.masterpiece.repositories.AccountRepository;
import fr.formation.itschool.masterpiece.repositories.RoleRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
public class AccountServiceImpl implements AccountService {
  private final AccountRepository accountRepository;
  private final RoleRepository roleRepository;
  private final PasswordEncoder encoder;

  protected AccountServiceImpl(
    AccountRepository accountRepository, RoleRepository roleRepository, PasswordEncoder encoder) {

    this.accountRepository = accountRepository;
    this.roleRepository = roleRepository;
    this.encoder = encoder;
  }

  @Override
  public void create(CreateAccountDto createAccountDto) {
    String passwordEncoded = encoder.encode(createAccountDto.getPassword());
    Role defaultRole = roleRepository.findByDefaultRoleTrue();
    Set<Role> roleToSave = new HashSet<>();
    roleToSave.add(defaultRole);
    Account accountToSave = new Account(createAccountDto.getEmail(), passwordEncoded, roleToSave);
    accountRepository.save(accountToSave);
  }

  @Override
  public AccountInfoDto getCurrentAccountInfo(Long id) {
    return accountRepository
      .getById(id)
      .orElseThrow(() -> new ResourceNotFoundException("No account found with this id:" + id));
  }

  @Override
  public boolean isEmailPresentInDB(String email) {
    return accountRepository.existsByEmailIgnoreCase(email);
  }

  @Override
  public UserDetails loadUserByUsername(String email) {
    AccountAuthDto userAccount =
      accountRepository
        .findByEmailIgnoreCase(email)
        .orElseThrow(
          () -> new UsernameNotFoundException("No account found with email:" + email));

    return new AccountDetails(userAccount);
  }
}
