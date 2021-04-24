package fr.formation.itschool.masterpiece.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;
import java.util.Objects;
import java.util.StringJoiner;
/**
 * A representation of an account {@code Role} used for authorization
 */
@Entity
@Table(name = "roles",  uniqueConstraints =
@UniqueConstraint(
  name = "roles_code_UQ",
  columnNames = {"code"}))
public class Role extends AbstractEntity {

  @Column(length = 20, nullable = false)
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

  @Override
  public boolean equals(Object o) {
    if (this == o) return true;
    if (!(o instanceof Role)) return false;
    Role role = (Role) o;
    return code.equals(role.code);
  }

  @Override
  public int hashCode() {
    return Objects.hash(code);
  }
}
