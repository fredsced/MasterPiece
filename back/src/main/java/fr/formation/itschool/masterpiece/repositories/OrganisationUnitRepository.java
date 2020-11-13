package fr.formation.itschool.masterpiece.repositories;

import fr.formation.itschool.masterpiece.domain.OrganisationUnit;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrganisationUnitRepository extends JpaRepository<OrganisationUnit, Long> {
  OrganisationUnit findByCodeIgnoreCase(String code);
}
