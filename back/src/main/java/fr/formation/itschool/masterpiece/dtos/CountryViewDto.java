package fr.formation.itschool.masterpiece.dtos;

import java.util.StringJoiner;

/**
 * A DTO representation of a {@code Country}
 */
public class CountryViewDto {

  private Long id;
  private String iso;
  private String name;

  protected CountryViewDto() {}

  public Long getId() {
    return id;
  }

  public String getIso() {
    return iso;
  }

  public String getName() {
    return name;
  }

  @Override
  public String toString() {
    return new StringJoiner(", ", CountryViewDto.class.getSimpleName() + "[", "]")
      .add("id=" + id)
      .add("iso=" + iso)
      .add("name=" + name)
      .toString();
  }

}
