package fr.formation.itschool.masterpiece.service;

import fr.formation.itschool.masterpiece.config.CustomUserDetails;
import fr.formation.itschool.masterpiece.domain.Account;
import fr.formation.itschool.masterpiece.domain.Role;
import fr.formation.itschool.masterpiece.dto.AccountDto;
import fr.formation.itschool.masterpiece.dto.AccountAuthDto;
import fr.formation.itschool.masterpiece.dto.AccountInfoDto;
import fr.formation.itschool.masterpiece.repository.AccountRepository;
import fr.formation.itschool.masterpiece.repository.RoleRepository;
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
  public void create(AccountDto accountDto) {
    Account accountToSave = new Account();
    if (isEmailPresentsInDB(accountToSave)) {
      return;
    }
    accountToSave.setEmail(accountDto.getEmail());
    String rawPassword = accountDto.getPassword();
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
    return null;
  }

  private boolean isEmailPresentsInDB(Account accountToSave) {
    return accounts.findByEmail(accountToSave.getEmail()).isPresent();
  }

  @Override
  public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
    AccountAuthDto userAccount =
        accounts
            .findByEmail(email)
            .orElseThrow(
                () -> new UsernameNotFoundException("No account found with email:" + email));

    return new CustomUserDetails(userAccount);
  }
}
