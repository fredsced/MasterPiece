package fr.formation.itschool.masterpiece.dtos.collaborator;

/**
 * A projection of {@code Collaborator} name and firstName, sesame, countryId and organisationUnitId
 */
public interface CollaboratorInfoDto {
  Long getId();

  String getLastname();

  String getFirstname();

  String getSesame();

  Long getCountryId();

  Long getOrganisationUnitId();
}
