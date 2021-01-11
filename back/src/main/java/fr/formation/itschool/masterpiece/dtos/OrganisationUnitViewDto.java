package fr.formation.itschool.masterpiece.dtos;

import java.util.StringJoiner;

/**
 * A DTO representation of a {@code Organisationunit}
 */
public class OrganisationUnitViewDto {
  private Long id;
  private String code;
  private String name;
  private String description;

  protected OrganisationUnitViewDto() {}

  public Long getId() {
    return id;
  }

  public String getCode() {
    return code;
  }

  public String getName() {
    return name;
  }


  public String getDescription() {
    return description;
  }

  @Override
  public String toString() {
    return new StringJoiner(", ", OrganisationUnitViewDto.class.getSimpleName() + "[", "]")
      .add("id=" + id)
      .add("code=" + code)
      .add("name=" + name)
      .add("description=" + description)
      .toString();
  }
}
