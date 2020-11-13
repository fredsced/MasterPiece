package fr.formation.itschool.masterpiece.dtos;

/** A DTO representation of a {@code Country} */
public class CountryViewDto {

  private String iso;
  private String name;

  protected CountryViewDto() {}

  public String getIso() {
    return iso;
  }

  public void setIso(String iso) {
    this.iso = iso;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  @Override
  public String toString() {
    return "CountryViewDto{" + "iso='" + iso + '\'' + ", name='" + name + '\'' + '}';
  }
}
