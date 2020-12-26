package fr.formation.itschool.masterpiece.dtos.compliancereferent;

/**
 * A DTO representation of a {@code ComplianceReferent}
 */

public class ComplianceReferentViewDto {

    private final Long id;
    private final String firstname;
    private final String lastname;
    private final String country;
    private final String buCode;
    private final String riskCode;

    public ComplianceReferentViewDto(
            Long id, String firstname, String lastname, String riskCode, String country, String buCode) {
        this.id = id;
        this.firstname = firstname;
        this.lastname = lastname;
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
        return "ComplianceReferentViewDto{" +
                "id=" + id +
                ", firstname='" + firstname + '\'' +
                ", lastname='" + lastname + '\'' +
                ", country='" + country + '\'' +
                ", buCode='" + buCode + '\'' +
                ", riskCode='" + riskCode + '\'' +
                '}';
    }
}
