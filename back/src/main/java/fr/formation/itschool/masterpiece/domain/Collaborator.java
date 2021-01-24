package fr.formation.itschool.masterpiece.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.ForeignKey;
import javax.persistence.Index;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;
import java.util.StringJoiner;

@Entity
@Table(
  name = "collaborators",
  uniqueConstraints = {
    @UniqueConstraint(name = "collaborators_account_id_UQ", columnNames = "account_id"),
    @UniqueConstraint(name = "collaborators_sesame_id_UQ", columnNames = "sesame_id")
  },
  indexes = {
    @Index(name = "collaborators_account_id_IDX", columnList = "account_id"),
    @Index(name = "collaborators_country_id_IDX", columnList = "country_id"),
    @Index(name = "collaborators_organisation_unit_id_IDX", columnList = "organisation_unit_id"),
    @Index(name = "collaborators_sesame_id_IDX", columnList = "sesame_id")
  })
public class Collaborator extends AbstractEntity {

  @Column(nullable = false)
  private String lastname;

  @Column(nullable = false)
  private String firstname;

  @Column(name = "sesame_id", nullable = false)
  private String sesame;

  @ManyToOne
  @JoinColumn(name = "country_id", foreignKey = @ForeignKey(name = "collaborators_country_id_FK"))
  private Country country;

  @ManyToOne
  @JoinColumn(
    name = "organisation_unit_id",
    foreignKey = @ForeignKey(name = "collaborators_organisation_unit_id_FK"))
  private OrganisationUnit organisationUnit;

  @OneToOne
  @JoinColumn(
    name = "account_id",
    nullable = true,
    foreignKey = @ForeignKey(name = "collaborators_account_id_FK"))
  private Account account;

  public void setLastname(String lastname) {
    this.lastname = lastname;
  }

  public void setFirstname(String firstname) {
    this.firstname = firstname;
  }

  public String getSesame() {
    return sesame;
  }

  public void setSesame(String sesame) {
    this.sesame = sesame;
  }

  public void setAccount(Account account) {
    this.account = account;
  }

  public Country getCountry() {
    return country;
  }

  public void setCountry(Country country) {
    this.country = country;
  }

  public OrganisationUnit getOrganisationUnit() {
    return organisationUnit;
  }

  public void setOrganisationUnit(OrganisationUnit organisationUnit) {
    this.organisationUnit = organisationUnit;
  }

  @Override
  public String toString() {
    return new StringJoiner(", ", Collaborator.class.getSimpleName() + "[", "]")
      .add("id=" + super.getId())
      .add("lastname=" + lastname)
      .add("firstname=" + firstname)
      .add("sesame=" + sesame)
      .add("country=" + country)
      .add("organisationUnit=" + organisationUnit)
      .add("account=" + account)
      .toString();
  }
}
