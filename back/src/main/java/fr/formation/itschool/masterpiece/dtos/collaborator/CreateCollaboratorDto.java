package fr.formation.itschool.masterpiece.dtos.collaborator;

import fr.formation.itschool.masterpiece.domain.Country;
import fr.formation.itschool.masterpiece.domain.OrganisationUnit;
import fr.formation.itschool.masterpiece.validators.UniqueSesame;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.StringJoiner;

public class CreateCollaboratorDto {
  @NotNull
  @Size(min = 2, max = 255)
  private String lastname;

  @NotNull
  @Size(min = 2, max = 255)
  private String firstname;

  @NotNull
  @UniqueSesame
  @Size(min = 7, max = 7)
  private String sesame;

  @NotNull
  private Country country;

  @NotNull
  private OrganisationUnit organisationUnit;

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

  @Override
  public String toString() {
    return new StringJoiner(", ", CreateCollaboratorDto.class.getSimpleName() + "[", "]")
      .add("lastname=" + lastname)
      .add("firstname=" + firstname)
      .add("sesame=" + sesame)
      .add("country=" + country)
      .add("organisationUnit=" + organisationUnit)
      .toString();
  }
}
