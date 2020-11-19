package fr.formation.itschool.masterpiece.repositories;

import fr.formation.itschool.masterpiece.domain.ComplianceReferent;
import fr.formation.itschool.masterpiece.dtos.LcoViewDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ComplianceReferentRepository extends JpaRepository<ComplianceReferent, Long> {

  @Query(
      "SELECT new fr.formation.itschool.masterpiece.dtos.LcoViewDto(c.lastname, c.firstname, co.iso, ou.code, r.code) FROM ComplianceReferent cr join cr.collaborator c join c.country co join c.organisationUnit ou join cr.risk r WHERE r.code=:input AND ou.id=:buId AND co.id=:countryId")
  List<LcoViewDto> findMyComplianceReferentByRisk(
      @Param("input") String riskCode,
      @Param("countryId") Long countryId,
      @Param("buId") Long buId);
}
