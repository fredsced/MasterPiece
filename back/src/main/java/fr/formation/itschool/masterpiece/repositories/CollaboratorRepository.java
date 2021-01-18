package fr.formation.itschool.masterpiece.repositories;

import fr.formation.itschool.masterpiece.domain.Collaborator;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CollaboratorRepository extends JpaRepository<Collaborator, Long> {

  boolean existsByAccountId(Long accountId);

  boolean existsBySesameIgnoreCase(String sesameId);


  <T> T findByAccountId(Long accountId, Class<T> destinationType);
}
