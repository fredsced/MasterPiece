package fr.formation.itschool.masterpiece.domain;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.ForeignKey;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;
import java.util.StringJoiner;

/**
 * A representation of a ComplianceReferent {@code ComplianceReferent}
 */
@Entity
@Table(
  name = "compliance_referents",
  uniqueConstraints = {
    @UniqueConstraint(name = "compliance_referents_collaborator_id_UQ", columnNames = "collaborator_id"),
    @UniqueConstraint(name = "compliance_referents_email_UQ", columnNames = "email")})
public class ComplianceReferent extends AbstractEntity {

  @Column(nullable = false)
  private String email;

  @Column(nullable = true, length = 30)
  private String phone;

  @OneToOne(cascade = {CascadeType.PERSIST})
  @JoinColumn(name = "collaborator_id", nullable = false)
  private Collaborator collaborator;

  @ManyToOne
  @JoinColumn(name = "compliance_level_id",
    foreignKey = @ForeignKey(name = "compliance_referents_level_id_FK"), nullable = false)
  private Level level;

  @ManyToOne
  @JoinColumn(name = "risk_id", foreignKey = @ForeignKey(name = "compliance_referents_risk_id_FK"), nullable = false)
  private Risk risk;

  public void setCollaborator(Collaborator collaborator) {
    this.collaborator = collaborator;
  }


  @Override
  public String toString() {
    return new StringJoiner(", ", ComplianceReferent.class.getSimpleName() + "[", "]")
      .add("id=" + super.getId())
      .add("email=" + email)
      .add("phone=" + phone)
      .add("collaborator=" + collaborator)
      .add("level=" + level)
      .add("risk=" + risk)
      .toString();
  }
}
