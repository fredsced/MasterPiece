package fr.formation.itschool.masterpiece.domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Entity
@Table(name="ORGANISATION_UNITS")
public class OrganisationUnit {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @NotBlank
  @Size(max=25)
  private String code;

  @Size(max=100)
  private String name;

  @Size(max=500)
  private String description;
}
