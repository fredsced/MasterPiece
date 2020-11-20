package fr.formation.itschool.masterpiece.domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

@Entity
@Table(
    name = "compliance_referents",
    uniqueConstraints =
        @UniqueConstraint(
            name = "compliance_referents_collaborator_id",
            columnNames = "collaborator_id"))
public class ComplianceReferent {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @OneToOne
  @JoinColumn(name = "collaborator_id", nullable = false)
  private Collaborator collaborator;

  @ManyToOne
  @JoinColumn(name = "compliance_level_id", nullable = false)
  private ComplianceLevel complianceLevel;

  @ManyToOne
  @JoinColumn(name = "risk_id", nullable = false)
  private Risk risk;
}
