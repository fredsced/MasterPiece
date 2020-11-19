package fr.formation.itschool.masterpiece.dtos;

/** A DTO representation of a {@code Organisationunit} */
public class OrganisationUnitViewDto {
  private String code;
  private String name;
  private String description;

  protected OrganisationUnitViewDto() {}


  public String getCode() {
    return code;
  }

  public void setCode(String code) {
    this.code = code;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getDescription() {
    return description;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  @Override
  public String toString() {
    return "OrgUnitViewDto{" +
      ", name='" + name + '\'' +
      ", description='" + description + '\'' +
      '}';
  }
}
