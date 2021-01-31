package fr.formation.itschool.masterpiece.domain;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;

/**
 * Abstract class that represents id of Entities class
 * Every Entities that extends it will have an id with strategy Identity
 */

@MappedSuperclass
public abstract class AbstractEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }
}
