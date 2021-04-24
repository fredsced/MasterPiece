package fr.formation.itschool.masterpiece.repositories;

import fr.formation.itschool.masterpiece.domain.OrganisationUnit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * {@code JpaRepository} to handle {@code OrganisationUnit} query.
 */
@Repository
public interface OrganisationUnitRepository extends JpaRepository<OrganisationUnit, Long> {
  Optional<OrganisationUnit> findByCodeIgnoreCase(String code);
}
