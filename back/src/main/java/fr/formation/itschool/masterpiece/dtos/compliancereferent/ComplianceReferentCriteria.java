package fr.formation.itschool.masterpiece.dtos.compliancereferent;

import javax.validation.constraints.Positive;
import java.util.StringJoiner;

public class ComplianceReferentCriteria {


    @Positive
    Long countryId;

    @Positive
    Long organisationUnitId;

    @Positive
    Long riskId;

    public Long getCountryId() {
        return countryId;
    }

    public void setCountryId(Long countryId) {
        this.countryId = countryId;
    }

    public Long getOrganisationUnitId() {
        return organisationUnitId;
    }

    public void setOrganisationUnitId(Long organisationUnitId) {
        this.organisationUnitId = organisationUnitId;
    }

    public Long getRiskId() {
        return riskId;
    }

    public void setRiskId(Long riskId) {
        this.riskId = riskId;
    }

    @Override
    public String toString() {
        return new StringJoiner(", ", ComplianceReferentCriteria.class.getSimpleName() + "[", "]")
          .add("countryId=" + countryId)
          .add("organisationUnitId=" + organisationUnitId)
          .add("riskId=" + riskId)
          .toString();
    }
}
