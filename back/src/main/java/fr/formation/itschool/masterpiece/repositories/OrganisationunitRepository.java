package fr.formation.itschool.masterpiece.repositories;

import fr.formation.itschool.masterpiece.domain.Organisationunit;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrganisationunitRepository extends JpaRepository<Organisationunit, Long> {
  Organisationunit findByCodeIgnoreCase(String code);
}
