package fr.formation.itschool.masterpiece.repositories;

import fr.formation.itschool.masterpiece.domain.Country;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * {@code JpaRepository} to handle {@code Country} query.
 */
@Repository
public interface CountryRepository extends JpaRepository<Country, Long> {
  Optional<Country> findByIsoIgnoreCase(String iso);
}
