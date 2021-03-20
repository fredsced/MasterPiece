package fr.formation.itschool.masterpiece.dtos.compliancereferent;

import java.util.StringJoiner;

/**
 * A DTO representation of a {@code ComplianceReferent}
 */

public class ComplianceReferentViewDto {

    private final Long id;
    private final String firstname;
    private final String lastname;
    private final String sesame;
    private final String country;
    private final String buCode;
    private final String riskCode;


    public ComplianceReferentViewDto(
            Long id, String firstname, String lastname, String sesame, String riskCode, String country, String buCode) {
        this.id = id;
        this.firstname = firstname;
        this.lastname = lastname;
        this.sesame = sesame;
        this.country = country;
        this.buCode = buCode;
        this.riskCode = riskCode;
    }

    public Long getId() { return id; }

    public String getFirstname() {
        return firstname;
    }

    public String getLastname() {
        return lastname;
    }

    public String getSesame() { return sesame;}

    public String getCountry() {
        return country;
    }

    public String getBuCode() {
        return buCode;
    }

    public String getRiskCode() {
        return riskCode;
    }

    @Override
    public String toString() {
        return new StringJoiner(", ", ComplianceReferentViewDto.class.getSimpleName() + "[", "]")
          .add("id=" + id)
          .add("firstname=" + firstname)
          .add("lastname=" + lastname)
          .add("sesame=" + sesame)
          .add("country=" + country)
          .add("buCode=" + buCode)
          .add("riskCode=" + riskCode)
          .toString();
    }
}
