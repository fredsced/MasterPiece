package fr.formation.itschool.masterpiece.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;
import java.util.StringJoiner;

/**
 * A representation of an account {@code Level} a level of compliance responsibility
 */
@Entity
@Table(
  name = "compliance_levels",
  uniqueConstraints = @UniqueConstraint(name = "compliance_levels_code_UQ", columnNames = "code"))
public class Level extends AbstractEntity {

  @Column(nullable = false, length = 3)
  private String code;

  @Column(nullable = false)
  private String label;

  @Override
  public String toString() {
    return new StringJoiner(", ", Level.class.getSimpleName() + "[", "]")
      .add("id=" + super.getId())
      .add("code=" + code)
      .add("label=" + label)
      .toString();
  }
}
