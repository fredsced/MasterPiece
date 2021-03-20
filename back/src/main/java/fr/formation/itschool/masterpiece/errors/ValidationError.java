package fr.formation.itschool.masterpiece.errors;


import java.util.List;

public class ValidationError {
  private final String message;
  private final List<String> errors;


  public ValidationError(String message, List<String> errors) {

    this.message = message;
    this.errors = errors;
  }

  public String getMessage() {
    return message;
  }

  public List<String> getErrors() {
    return errors;
  }
}
