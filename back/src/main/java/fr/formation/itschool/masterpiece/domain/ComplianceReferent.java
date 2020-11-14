package fr.formation.itschool.masterpiece.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "COMPLIANCE_REFERENTS")
public class ComplianceReferent {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @NotNull
  @OneToOne
  @JoinColumn(name = "collaborator_id")
  private Collaborator collaborator;

  @NotNull @ManyToOne private ComplianceLevel complianceLevel;

  @NotNull @ManyToOne private Risk risk;
}
