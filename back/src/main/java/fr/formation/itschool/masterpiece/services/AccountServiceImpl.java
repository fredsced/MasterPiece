package fr.formation.itschool.masterpiece.services;

import fr.formation.itschool.masterpiece.config.AccountDetails;
import fr.formation.itschool.masterpiece.config.ResourceNotFoundException;
import fr.formation.itschool.masterpiece.domain.Account;
import fr.formation.itschool.masterpiece.domain.Role;
import fr.formation.itschool.masterpiece.dtos.AccountAuthDto;
import fr.formation.itschool.masterpiece.dtos.AccountInfoDto;
import fr.formation.itschool.masterpiece.dtos.CreateAccountDto;
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
  private final AccountRepository accounts;
  private final RoleRepository roles;
  private final PasswordEncoder encoder;

  protected AccountServiceImpl(
      AccountRepository accounts, RoleRepository roles, PasswordEncoder encoder) {

    this.accounts = accounts;
    this.roles = roles;
    this.encoder = encoder;
  }

  @Override
  public void create(CreateAccountDto createAccountDto) {
    Account accountToSave = new Account();
    accountToSave.setEmail(createAccountDto.getEmail());
    String rawPassword = createAccountDto.getPassword();
    String passwordEncoded = encoder.encode(rawPassword);
    accountToSave.setPassword(passwordEncoded);
    Role defaultRole = roles.findByDefaultRoleTrue();
    Set<Role> roleToSave = new HashSet<>();
    roleToSave.add(defaultRole);
    accountToSave.setRoles(roleToSave);
    accounts.save(accountToSave);
  }

  @Override
  public AccountInfoDto getCurrentAccountInfo(Long id) {
    return accounts
        .getById(id)
        .orElseThrow(() -> new ResourceNotFoundException("No account found with this id:" + id));
  }

  @Override
  public boolean isEmailPresentsInDB(String email) {
    return accounts.findByEmailIgnoreCase(email).isPresent();
  }

  @Override
  public UserDetails loadUserByUsername(String email) {
    AccountAuthDto userAccount =
        accounts
            .findByEmailIgnoreCase(email)
            .orElseThrow(
                () -> new UsernameNotFoundException("No account found with email:" + email));

    return new AccountDetails(userAccount);
  }
}
