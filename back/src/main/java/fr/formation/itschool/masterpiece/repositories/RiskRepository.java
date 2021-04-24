package fr.formation.itschool.masterpiece.repositories;

import fr.formation.itschool.masterpiece.domain.Risk;
import fr.formation.itschool.masterpiece.dtos.RiskViewDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * {@code JpaRepository} to handle {@code Risk} query.
 */
@Repository
public interface RiskRepository extends JpaRepository<Risk, Long> {
}
