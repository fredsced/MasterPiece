package fr.formation.itschool.masterpiece.repository;

import fr.formation.itschool.masterpiece.domain.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role, Long> {
  Role findByDefaultRoleTrue();
}
