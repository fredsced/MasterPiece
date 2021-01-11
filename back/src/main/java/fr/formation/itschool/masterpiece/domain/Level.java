package fr.formation.itschool.masterpiece.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;
import java.util.StringJoiner;

@Entity
@Table(
  name = "compliance_levels",
  uniqueConstraints = @UniqueConstraint(name = "compliance_levels_code_UQ", columnNames = "code"))
public class Level {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false, length = 45)
  private String code;

  private String label;

  @Override
  public String toString() {
    return new StringJoiner(", ", Level.class.getSimpleName() + "[", "]")
      .add("id=" + id)
      .add("code=" + code)
      .add("label=" + label)
      .toString();
  }
}
