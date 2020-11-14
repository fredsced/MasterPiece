package fr.formation.itschool.masterpiece.repositories;

import fr.formation.itschool.masterpiece.domain.Organisationunit;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface OrganisationunitRepository extends JpaRepository<Organisationunit, Long> {
  Optional<Organisationunit> findByCodeIgnoreCase(String code);
}
