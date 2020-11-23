package fr.formation.itschool.masterpiece.dtos;

import fr.formation.itschool.masterpiece.domain.Country;
import fr.formation.itschool.masterpiece.domain.OrganisationUnit;
import fr.formation.itschool.masterpiece.validators.UniqueSesame;
import lombok.Getter;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Getter
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

  @NotNull Country country;

  @NotNull OrganisationUnit organisationUnit;
}
