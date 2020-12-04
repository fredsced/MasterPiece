package fr.formation.itschool.masterpiece.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.StringJoiner;

@Entity
@Table(
  name = "organisation_units",
  uniqueConstraints =
  @UniqueConstraint(name = "organisation_units_code_UQ", columnNames = "code"))
public class OrganisationUnit {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @NotBlank
  @Size(max = 25)
  @Column(nullable = false)
  private String code;

  @Size(max = 100)
  private String name;

  @Size(max = 500)
  private String description;

  public Long getId() {
    return id;
  }

  @Override
  public String toString() {
    return new StringJoiner(", ", OrganisationUnit.class.getSimpleName() + "[", "]")
      .add("id=" + id)
      .add("code=" + code)
      .add("name=" + name)
      .add("description=" + description)
      .toString();
  }
}
