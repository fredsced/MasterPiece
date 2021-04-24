package fr.formation.itschool.masterpiece.errors;


import java.util.ArrayList;
import java.util.List;
import java.util.StringJoiner;

/**
 * Object encapsulating error informations used by {@code ControllerAdvice}
 **/

public class RestApiError {
  private final String message;
  private final List<String> errors;


  public RestApiError(String message, List<String> errors) {
    this.message = message;
    this.errors = errors;
  }

  public RestApiError(String message) {
    this.message = message;
    this.errors = new ArrayList<String>();
  }

  public String getMessage() {
    return message;
  }

  public List<String> getErrors() {
    return errors;
  }

  @Override
  public String toString() {
    return new StringJoiner(", ", RestApiError.class.getSimpleName() + "[", "]")
      .add("message=" + message)
      .add("errors=" + errors)
      .toString();
  }
}
