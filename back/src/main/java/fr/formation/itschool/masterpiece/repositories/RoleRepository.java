package fr.formation.itschool.masterpiece.repositories;

import fr.formation.itschool.masterpiece.domain.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * {@code JpaRepository} to handle {@code Risk} role .
 */
@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
  Role findByDefaultRoleTrue();
}
