package fr.formation.itschool.masterpiece.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import java.util.StringJoiner;

@Entity
@Table(name = "roles")
public class Role extends AbstractEntity {

  @Column(length = 45, nullable = false, unique = true)
  private String code;

  @Column(nullable = false)
  private boolean defaultRole;

  public String getCode() {
    return code;
  }

  @Override
  public String toString() {
    return new StringJoiner(", ", Role.class.getSimpleName() + "[", "]")
      .add("id=" + super.getId())
      .add("code=" + code)
      .add("defaultRole=" + defaultRole)
      .toString();
  }
}
