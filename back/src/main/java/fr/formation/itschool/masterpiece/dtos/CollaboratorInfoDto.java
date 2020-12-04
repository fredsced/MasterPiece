package fr.formation.itschool.masterpiece.dtos;

/**
 * A projection of {@code Collaborator} name and firstName
 */
public interface CollaboratorInfoDto {
  Long getId();

  String getLastname();

  String getFirstname();

  Long getCountryId();

  Long getOrganisationUnitId();
}
