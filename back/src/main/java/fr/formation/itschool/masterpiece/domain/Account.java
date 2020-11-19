package fr.formation.itschool.masterpiece.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ForeignKey;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Index;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;
import java.util.Set;

@Entity
@Table(
    name = "accounts",
    uniqueConstraints =
        @UniqueConstraint(
            name = "accounts_email_UQ",
            columnNames = {"email"}))
public class Account {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false)
  private String email;

  @Column(nullable = false)
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
}
