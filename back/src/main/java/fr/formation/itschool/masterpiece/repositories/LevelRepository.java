package fr.formation.itschool.masterpiece.repositories;

import fr.formation.itschool.masterpiece.domain.Level;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * {@code JpaRepository} to handle {@code Level} query.
 */
@Repository
public interface LevelRepository  extends JpaRepository<Level, Long> {
}
