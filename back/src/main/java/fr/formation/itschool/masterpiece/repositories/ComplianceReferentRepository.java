package fr.formation.itschool.masterpiece.repositories;

import fr.formation.itschool.masterpiece.domain.ComplianceReferent;
import fr.formation.itschool.masterpiece.dtos.LcoViewDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ComplianceReferentRepository extends JpaRepository<ComplianceReferent, Long> {

  @Query(
      value =
          "select co.name, co.firstname, cn.iso country, ou.code, r.code risk from compliance_referents cr \n"
              + "join collaborators co on co.id = cr.collaborator_id \n"
              + "join organisation_units ou on ou.id = co.organisation_unit_id \n"
              + "join countries cn on cn.id = co.country_id \n"
              + "join risks r on r.id = cr.risk_id \n"
              + "where r.code=:input and ou.id like :buId and cn.id like :countryId",
      nativeQuery = true)
  List<LcoViewDto> findLcoByRisk(
      @Param("input") String riskCode, @Param("countryId") Long countryId, @Param("buId") Long buId);
}
