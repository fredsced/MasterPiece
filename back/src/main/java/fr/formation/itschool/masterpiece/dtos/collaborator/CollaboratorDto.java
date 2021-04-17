package fr.formation.itschool.masterpiece.dtos.collaborator;

import fr.formation.itschool.masterpiece.domain.Country;
import fr.formation.itschool.masterpiece.domain.OrganisationUnit;
import fr.formation.itschool.masterpiece.validators.SesamePattern;
import fr.formation.itschool.masterpiece.validators.UniqueSesame;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.StringJoiner;

public class CollaboratorDto {
  @NotNull
  Country country;
  @NotNull
  OrganisationUnit organisationUnit;
  @NotNull
  @Size(min = 2, max = 255, message = "Field length between 2 and 255 char")
  private String lastname;
  @NotNull
  @Size(min = 2, max = 255, message = "Field length between 2 and 255 char")
  private String firstname;
  @NotNull
  @SesamePattern
  @UniqueSesame
  @Size(min = 7, max = 7, message = "Field length must be 7 char")
  private String sesame;

  public String getLastname() {
    return lastname;
  }

  public String getFirstname() {
    return firstname;
  }

  public String getSesame() {
    return sesame;
  }

  public Country getCountry() {
    return country;
  }

  public OrganisationUnit getOrganisationUnit() {
    return organisationUnit;
  }

  public void setCountry(Country country) {
    this.country = country;
  }

  public void setOrganisationUnit(OrganisationUnit organisationUnit) {
    this.organisationUnit = organisationUnit;
  }

  public void setLastname(String lastname) {
    this.lastname = lastname;
  }

  public void setFirstname(String firstname) {
    this.firstname = firstname;
  }

  public void setSesame(String sesame) {
    this.sesame = sesame;
  }

  @Override
  public String toString() {
    return new StringJoiner(", ", CollaboratorDto.class.getSimpleName() + "[", "]")
      .add("country=" + country)
      .add("organisationUnit=" + organisationUnit)
      .add("lastname=" + lastname)
      .add("firstname=" + firstname)
      .add("sesame=" + sesame)
      .toString();
  }
}
