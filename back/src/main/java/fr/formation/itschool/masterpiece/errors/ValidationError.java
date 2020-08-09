package fr.formation.itschool.masterpiece.errors;

import lombok.Getter;

@Getter
public class ValidationError {
  private final String code;
  private final String field;

  public ValidationError(String code,String field){
    this.code = code;
    this.field=field;
  }
}
