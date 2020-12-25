package fr.formation.itschool.masterpiece.dtos.compliancereferent;

import java.util.StringJoiner;

/**
 * A DTO representation of a {@code ComplianceReferent}
 */

public class ComplianceReferentViewDto {

  private final String firstname;
  private final String lastname;
  private final String country;
  private final String buCode;
  private final String riskCode;

  public ComplianceReferentViewDto(
    String firstname, String lastname, String riskCode, String country, String buCode) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.country = country;
    this.buCode = buCode;
    this.riskCode = riskCode;
  }

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
    return new StringJoiner(", ", ComplianceReferentViewDto.class.getSimpleName() + "[", "]")
      .add("firstname=" + firstname)
      .add("lastname=" + lastname)
      .add("country=" + country)
      .add("buCode=" + buCode)
      .add("riskCode=" + riskCode)
      .toString();
  }
}
