package fr.formation.itschool.masterpiece.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ForeignKey;
import javax.persistence.Index;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;
import java.util.Set;
import java.util.StringJoiner;

@Entity
@Table(
  name = "accounts",
  uniqueConstraints =
  @UniqueConstraint(
    name = "accounts_email_UQ",
    columnNames = {"email"}))
public class Account extends AbstractEntity {

  @Column(nullable = false, length = 254)
  private String email;

  @Column(nullable = false, length = 60)
  private String password;

  @ManyToMany(fetch = FetchType.EAGER)
  @JoinTable(
    name = "accounts_roles",
    indexes = {
      @Index(name = "accounts_roles_account_id_IDX", columnList = "account_id"),
      @Index(name = "account_roles_role_id_IDX", columnList = "role_id")
    },
    joinColumns =
    @JoinColumn(
      name = "account_id",
      foreignKey = @ForeignKey(name = "accounts_roles_account_id_FK")),
    inverseJoinColumns =
    @JoinColumn(
      name = "role_id",
      foreignKey = @ForeignKey(name = "account_roles_role_id_FK")))
  private Set<Role> roles;

  protected Account() {}

  public Account(String email, String password, Set<Role> roles) {
    this.email = email;
    this.password = password;
    this.roles = roles;
  }

  @Override
  public String toString() {
    return new StringJoiner(", ", Account.class.getSimpleName() + "[", "]")
      .add("id=" + super.getId())
      .add("email=" + email)
      .add("password=" + "[HIDE]")
      .add("roles=" + roles)
      .toString();
  }
}
