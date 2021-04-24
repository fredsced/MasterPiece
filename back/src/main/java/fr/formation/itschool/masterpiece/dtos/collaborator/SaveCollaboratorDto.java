package fr.formation.itschool.masterpiece.dtos.collaborator;

import fr.formation.itschool.masterpiece.validators.SesamePattern;
import fr.formation.itschool.masterpiece.validators.UniqueSesame;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.StringJoiner;

/**
 * DTO representing {@code Collaborator} data to be persisted in database.
 */
public class SaveCollaboratorDto {
  @NotNull
  @Size(min = 2, max = 255, message="Field length between 2 and 255 char")
  private String lastname;

  @NotNull
  @Size(min = 2, max = 255, message="Field length between 2 and 255 char")
  private String firstname;

  @NotNull
  @SesamePattern
  @UniqueSesame
  private String sesame;

  @NotNull
  Long  countryId;

  @NotNull
  Long  organisationUnitId;

  public String getLastname() {
    return lastname;
  }

  public String getFirstname() {
    return firstname;
  }

  public String getSesame() {
    return sesame;
  }

  public Long getCountryId() {
    return countryId;
  }

  public Long getOrganisationUnitId() {
    return organisationUnitId;
  }

  @Override
  public String toString() {
    return new StringJoiner(", ", SaveCollaboratorDto.class.getSimpleName() + "[", "]")
      .add("lastname=" + lastname)
      .add("firstname=" + firstname)
      .add("sesame=" + sesame)
      .add("countryId=" + countryId)
      .add("organisationUnitId=" + organisationUnitId)
      .toString();
  }
}
