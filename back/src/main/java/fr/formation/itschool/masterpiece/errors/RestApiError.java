package fr.formation.itschool.masterpiece.errors;


import java.util.ArrayList;
import java.util.List;

/**
 * Class used when
 */

public class RestApiError {
  private final String message;
  private final List<String> errors;


  public RestApiError(String message, List<String> errors) {
    this.message = message;
    this.errors = errors;
  }
  public RestApiError(String message){
    this.message = message;
    this.errors=new ArrayList<String>();
  }

  public String getMessage() {
    return message;
  }

  public List<String> getErrors() {
    return errors;
  }
}
