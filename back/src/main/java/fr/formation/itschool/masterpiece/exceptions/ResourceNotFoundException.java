package fr.formation.itschool.masterpiece.exceptions;


@SuppressWarnings("serial")
public class ResourceNotFoundException extends RuntimeException {

  public ResourceNotFoundException(String message) {
    super(message);
  }

}
