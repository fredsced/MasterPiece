package fr.formation.itschool.masterpiece.dtos;

import java.util.StringJoiner;
/**
 * A DTO representation of a {@code Level} to project
 */

public class LevelViewDto {
  private Long id;
  private String code;
  private String label;

  protected LevelViewDto() {}

  public Long getId() {
    return id;
  }

  public String getCode() {
    return code;
  }

  public String getLabel() {
    return label;
  }

  @Override
  public String toString() {
    return new StringJoiner(", ", LevelViewDto.class.getSimpleName() + "[", "]")
      .add("id=" + id)
      .add("code=" + code)
      .add("label=" + label)
      .toString();
  }
}
