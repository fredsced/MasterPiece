package fr.formation.itschool.masterpiece.dtos.account;

import fr.formation.itschool.masterpiece.domain.Role;

import java.util.Set;

/**
 * A projection of {@code Account} when logged
 */

public interface AccountInfoDto {
  Long getId();

  String getEmail();

  Set<Role> getRoles();
}
