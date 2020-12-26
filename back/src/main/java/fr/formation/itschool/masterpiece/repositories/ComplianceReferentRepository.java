package fr.formation.itschool.masterpiece.repositories;

import fr.formation.itschool.masterpiece.domain.ComplianceReferent;
import fr.formation.itschool.masterpiece.dtos.compliancereferent.ComplianceReferentViewDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;


public interface ComplianceReferentRepository extends JpaRepository<ComplianceReferent, Long> {

    @Query(
            "SELECT new fr.formation.itschool.masterpiece.dtos.compliancereferent.ComplianceReferentViewDto(cr.id, c.lastname, c.firstname, r.code, co.iso, ou.code)"
                    + "FROM ComplianceReferent cr "
                    + "JOIN cr.collaborator c "
                    + "JOIN cr.risk r  "
                    + "JOIN c.country co "
                    + "JOIN c.organisationUnit ou "
                    + "WHERE (:countryId is null or co.id = :countryId) "
                    + "AND (:organisationUnitId is null or ou.id = :organisationUnitId) "
                    + "AND (:riskId is null or r.id = :riskId) "
    )
    List<ComplianceReferentViewDto> findWithCriteria(@Param("countryId") Long countryId,
                                                     @Param("organisationUnitId") Long organisationUnitId,
                                                     @Param("riskId") Long riskId);
}
