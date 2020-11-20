package fr.formation.itschool.masterpiece.repositories;

import fr.formation.itschool.masterpiece.domain.ComplianceReferent;
import fr.formation.itschool.masterpiece.dtos.LcoViewDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ComplianceReferentRepository extends JpaRepository<ComplianceReferent, Long> {

  @Query(
      "SELECT new fr.formation.itschool.masterpiece.dtos.LcoViewDto(c.lastname, c.firstname, r.code, co.iso, ou.code) "
          + "FROM ComplianceReferent cr "
          + "JOIN cr.collaborator c "
          + "JOIN cr.risk r  "
          + "JOIN c.country co "
          + "JOIN c.organisationUnit ou "
          + "WHERE co.id = :countryId AND r.code = :riskCode AND ou.id = :buId")
  List<LcoViewDto> findMyComplianceReferentByRisk(
      @Param("riskCode") String riskCode,
      @Param("countryId") Long countryId,
      @Param("buId") Long buId);
}
