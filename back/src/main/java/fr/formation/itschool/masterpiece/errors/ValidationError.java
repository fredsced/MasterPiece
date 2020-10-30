package fr.formation.itschool.masterpiece.errors;

import lombok.Getter;

@Getter
public class ValidationError {
  private final String code;
  private final String field;
  private final String message;

  public ValidationError(String code, String field, String message) {
    this.code = code;
    this.field = field;
    this.message = message;
  }
}
