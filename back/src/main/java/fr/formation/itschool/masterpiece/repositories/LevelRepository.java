package fr.formation.itschool.masterpiece.repositories;

import fr.formation.itschool.masterpiece.domain.Level;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * {@code JpaRepository} to handle {@code Level} query.
 */
public interface LevelRepository  extends JpaRepository<Level, Long> {
}
