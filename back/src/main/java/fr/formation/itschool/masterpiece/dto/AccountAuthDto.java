package fr.formation.itschool.masterpiece.dto;
import fr.formation.itschool.masterpiece.domain.Role;

/**
  A projection of {@code Account} for authentication
 */

import java.util.Set;

public interface AccountAuthDto {

  Long getId();

  String getEmail();

  String getPassword();

  Set<Role> getRoles();

}
