package fr.formation.itschool.masterpiece.repositories;

import fr.formation.itschool.masterpiece.domain.Risk;
import fr.formation.itschool.masterpiece.dtos.RiskViewDto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RiskRepository extends JpaRepository<Risk, Long> {
}
