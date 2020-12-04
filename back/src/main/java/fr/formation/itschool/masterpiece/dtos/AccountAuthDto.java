package fr.formation.itschool.masterpiece.dtos;

import fr.formation.itschool.masterpiece.domain.Role;

import java.util.Set;

/**
 * A projection of {@code Account} for authentication
 */
public interface AccountAuthDto {

  Long getId();

  String getEmail();

  String getPassword();

  Set<Role> getRoles();
}
