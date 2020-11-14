package fr.formation.itschool.masterpiece.repositories;

import fr.formation.itschool.masterpiece.domain.Collaborator;
import fr.formation.itschool.masterpiece.dtos.CollaboratorNameDto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CollaboratorRepository extends JpaRepository<Collaborator, Long> {

  boolean existsByAccountId(Long accountId);

  boolean existsBySesameIdIgnoreCase(String sesameId);

  CollaboratorNameDto findByAccountId(Long accountId);
}
