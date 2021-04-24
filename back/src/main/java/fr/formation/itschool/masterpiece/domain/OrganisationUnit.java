package fr.formation.itschool.masterpiece.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.StringJoiner;

/**
 * A representation of an account {@code OrganisationUnit} like a service or business unit
 */
@Entity
@Table(
  name = "organisation_units",
  uniqueConstraints =
  @UniqueConstraint(name = "organisation_units_code_UQ", columnNames = "code"))
public class OrganisationUnit extends AbstractEntity {


  @Column(nullable = false, length = 25)
  private String code;

  @Column(length = 100, nullable = true)
  private String name;


  @Override
  public String toString() {
    return new StringJoiner(", ", OrganisationUnit.class.getSimpleName() + "[", "]")
      .add("id=" + super.getId())
      .add("code=" + code)
      .add("name=" + name)
      .toString();
  }
}
