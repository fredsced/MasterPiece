package fr.formation.itschool.masterpiece.dtos;

public class ComplianceReferentViewDto {

  private String firstname;
  private String lastname;
  private String country;
  private String buCode;
  private String riskCode;

  public ComplianceReferentViewDto(String firstname, String lastname, String riskCode, String country, String buCode) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.country = country;
    this.buCode = buCode;
    this.riskCode = riskCode;
  }

  public String getFirstname() {
    return firstname;
  }

  public void setFirstname(String firstname) {
    this.firstname = firstname;
  }

  public String getLastname() {
    return lastname;
  }

  public void setLastname(String lastname) {
    this.lastname = lastname;
  }

  public String getCountry() {
    return country;
  }

  public void setCountry(String country) {
    this.country = country;
  }

  public String getBuCode() {
    return buCode;
  }

  public void setBuCode(String buCode) {
    this.buCode = buCode;
  }

  public String getRiskCode() {
    return riskCode;
  }

  public void setRiskCode(String riskCode) {
    this.riskCode = riskCode;
  }
}
