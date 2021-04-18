package fr.formation.itschool.masterpiece.dtos.compliancereferent;

import fr.formation.itschool.masterpiece.domain.Level;
import fr.formation.itschool.masterpiece.domain.Risk;
import fr.formation.itschool.masterpiece.dtos.collaborator.CollaboratorDto;
import fr.formation.itschool.masterpiece.validators.ExtendedEmailValidator;
import fr.formation.itschool.masterpiece.validators.UniqueEmail;

import javax.validation.Valid;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

public class SaveComplianceReferentDto {

  @NotNull
  @Valid
  private CollaboratorDto collaboratorDto;

  @NotNull
  private Risk risk;

  @NotNull
  private Level level;

  @NotEmpty
  @ExtendedEmailValidator
  @UniqueEmail
  @Size(max = 254)
  private String email;

  private String phone;

  public CollaboratorDto getCollaboratorDto() {
    return collaboratorDto;
  }

  public void setCollaboratorDto(CollaboratorDto collaboratorDto) {
    this.collaboratorDto = collaboratorDto;
  }

  public Risk getRiskId() {
    return risk;
  }


  public Risk getRisk() {
    return risk;
  }

  public void setRisk(Risk risk) {
    this.risk = risk;
  }

  public Level getLevel() {
    return level;
  }

  public void setLevel(Level level) {
    this.level = level;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public String getPhone() {
    return phone;
  }

  public void setPhone(String phone) {
    this.phone = phone;
  }
}
