package fr.formation.itschool.masterpiece.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;
import java.util.StringJoiner;

@Entity
@Table(
  name = "countries",
  uniqueConstraints = @UniqueConstraint(name = "countries_iso_UQ", columnNames = "iso"))
public class Country extends AbstractEntity {

  @Column(nullable = false, length = 3)
  private String iso;

  @Column(length = 60)
  private String name;

  @Override
  public String toString() {
    return new StringJoiner(", ", Country.class.getSimpleName() + "[", "]")
      .add("id=" + super.getId())
      .add("iso=" + iso)
      .add("name=" + name)
      .toString();
  }
}
