package fr.formation.itschool.masterpiece.repositories;

import fr.formation.itschool.masterpiece.domain.Risk;
import fr.formation.itschool.masterpiece.dtos.RiskViewDto;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * {@code JpaRepository} to handle {@code Risk} query.
 */
public interface RiskRepository extends JpaRepository<Risk, Long> {
}
