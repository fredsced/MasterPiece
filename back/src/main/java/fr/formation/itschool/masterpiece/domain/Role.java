package fr.formation.itschool.masterpiece.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.StringJoiner;

@Setter
@Getter
@Entity
@Table(name = "roles")
public class Role {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(length = 45, nullable = false, unique = true)
  private String code;

  @Column(nullable = false)
  private boolean defaultRole;

  @Override
  public String toString() {
    return new StringJoiner(", ", Role.class.getSimpleName() + "[", "]")
      .add("id=" + id)
      .add("code=" + code)
      .add("defaultRole=" + defaultRole)
      .toString();
  }
}
