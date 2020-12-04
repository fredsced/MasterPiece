package fr.formation.itschool.masterpiece.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;
import javax.validation.constraints.Size;
import java.util.StringJoiner;

@Entity
@Table(
  name = "risks",
  uniqueConstraints = @UniqueConstraint(name = "risks_code_UQ", columnNames = "code"))
public class Risk {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(unique = true, nullable = false, length = 45)
  private String code;

  @Size(max = 255)
  private String label;

  @Override
  public String toString() {
    return new StringJoiner(", ", Risk.class.getSimpleName() + "[", "]")
      .add("id=" + id)
      .add("code=" + code)
      .add("label=" + label)
      .toString();
  }
}
