package fr.formation.itschool.masterpiece.repositories;

import fr.formation.itschool.masterpiece.domain.Collaborator;
import fr.formation.itschool.masterpiece.dtos.CollaboratorNameDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface CollaboratorRepository extends JpaRepository<Collaborator, Long> {

  boolean existsByAccountId(Long accountId);

  boolean existsBySesameIdIgnoreCase(String sesameId);

  Collaborator findByAccountId(Long accountId);

  @Query(value = "select c.name, c.firstname from collaborators c where c.account_id =:accountId", nativeQuery = true)
  CollaboratorNameDto findNameByAccountId(@Param("accountId") Long accountId);
}
