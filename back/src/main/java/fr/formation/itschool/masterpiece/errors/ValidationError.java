package fr.formation.itschool.masterpiece.errors;

public class ValidationError {
  private final String code;
  private final String field;
  private final String message;

  public ValidationError(String code, String field, String message) {
    this.code = code;
    this.field = field;
    this.message = message;
  }

  public String getCode() {
    return code;
  }

  public String getField() {
    return field;
  }

  public String getMessage() {
    return message;
  }
}
