package fr.formation.itschool.masterpiece.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "COLLABORATORS")
public class Collaborator {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @NotBlank
  @Size(max = 255)
  private String name;

  @NotBlank
  @Size(max = 255)
  @Column(name = "firstname")
  private String firstname;

  @NotBlank
  @Size(min = 7, max = 7)
  @Column(unique = true, nullable = false)
  private String sesameId;

  @NotNull @ManyToOne private Country country;

  @NotNull @ManyToOne private Organisationunit organisationUnit;

  @OneToOne
  @JoinColumn(name = "account_id")
  private Account account;
}
