package fr.formation.itschool.masterpiece.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;
import javax.validation.constraints.Size;
import java.util.StringJoiner;
/**
 * A representation of an account {@code Risk} a risk of non-compliance
 */
@Entity
@Table(
  name = "risks",
  uniqueConstraints = @UniqueConstraint(name = "risks_code_UQ", columnNames = "code"))
public class Risk extends AbstractEntity {

  @Column(unique = true, nullable = false, length = 5)
  private String code;
  @Column(nullable = false)
  private String label;

  @Override
  public String toString() {
    return new StringJoiner(", ", Risk.class.getSimpleName() + "[", "]")
      .add("id=" + super.getId())
      .add("code=" + code)
      .add("label=" + label)
      .toString();
  }
}
