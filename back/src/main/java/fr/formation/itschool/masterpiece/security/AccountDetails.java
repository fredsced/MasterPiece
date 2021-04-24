package fr.formation.itschool.masterpiece.security;

import fr.formation.itschool.masterpiece.domain.Role;
import fr.formation.itschool.masterpiece.dtos.account.AccountAuthDto;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;

import java.util.Set;
import java.util.stream.Collectors;

/**
 * A custom {@code AccountDetails} for Spring authentication contract and custom
 * properties we want in the token (such as the id).
 */
public class AccountDetails extends User {

  private static final long serialVersionUID = 5803283930339051994L;

  private Long id;

  /**
   * The minimal constructor to
   * @param accountAuthDto
   */
  public AccountDetails(AccountAuthDto accountAuthDto) {
    super(accountAuthDto.getEmail(), accountAuthDto.getPassword(),
      buildAuthorities(accountAuthDto.getRoles()));
    id = accountAuthDto.getId();
  }

  public AccountDetails(AccountAuthDto accountAuthDto, boolean enabled, boolean accountNonExpired,
                        boolean credentialsNonExpired, boolean accountNonLocked) {
    super(accountAuthDto.getEmail(), accountAuthDto.getPassword(), true, true, true, true, buildAuthorities(accountAuthDto.getRoles()));
  }

  private static Set<GrantedAuthority> buildAuthorities(Set<Role> roles) {
    return roles.stream().map(role -> new SimpleGrantedAuthority(role.getCode()))
      .collect(Collectors.toUnmodifiableSet());
  }


  public Long getId() {
    return id;
  }

  @Override
  public String toString() {
    return "{id=" + id + ", authorities=" + getAuthorities()
      + ", password=[PROTECTED], username=" + getUsername()
      + ", enabled=" + isEnabled() + ", accountNonExpired="
      + isAccountNonExpired() + ", accountNonLocked="
      + isAccountNonLocked() + ", credentialsNonExpired="
      + isCredentialsNonExpired() + "}";
  }
}

