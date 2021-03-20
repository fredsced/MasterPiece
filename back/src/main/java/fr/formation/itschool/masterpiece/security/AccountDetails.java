package fr.formation.itschool.masterpiece.security;

import fr.formation.itschool.masterpiece.domain.Role;
import fr.formation.itschool.masterpiece.dtos.account.AccountAuthDto;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;

import java.util.Set;
import java.util.stream.Collectors;

public class AccountDetails extends User {

  private static final long serialVersionUID = 5803283930339051994L;

  private Long id;

  public AccountDetails(AccountAuthDto user) {
    super(user.getEmail(), user.getPassword(),
      buildAuthorities(user.getRoles()));
    id = user.getId();
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

