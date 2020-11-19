package fr.formation.itschool.masterpiece.dtos;

public class LcoViewDto {

  private String name;
  private String firstName;
  private String country;
  private String buCode;
  private String riskCode;

  public LcoViewDto(String name, String firstName, String country, String buCode, String riskCode) {
    this.name = name;
    this.firstName = firstName;
    this.country = country;
    this.buCode = buCode;
    this.riskCode = riskCode;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getFirstName() {
    return firstName;
  }

  public void setFirstName(String firstName) {
    this.firstName = firstName;
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
