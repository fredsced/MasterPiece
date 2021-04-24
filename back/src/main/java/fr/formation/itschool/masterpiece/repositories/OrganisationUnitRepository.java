package fr.formation.itschool.masterpiece.repositories;

import fr.formation.itschool.masterpiece.domain.OrganisationUnit;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

/**
 * {@code JpaRepository} to handle {@code OrganisationUnit} query.
 */
public interface OrganisationUnitRepository extends JpaRepository<OrganisationUnit, Long> {
  Optional<OrganisationUnit> findByCodeIgnoreCase(String code);
}
