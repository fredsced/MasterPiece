package fr.formation.itschool.masterpiece.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

@Entity
@Table(
    name = "countries",
    uniqueConstraints = @UniqueConstraint(name = "countries_iso_UQ", columnNames = "iso"))
public class Country {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false, length = 3)
  private String iso;

  @Column(length = 100)
  private String name;

  public Long getId() {
    return id;
  }
}
