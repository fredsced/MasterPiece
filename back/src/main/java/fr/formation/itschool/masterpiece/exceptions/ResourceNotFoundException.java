package fr.formation.itschool.masterpiece.exceptions;

/**
 * Exception used when a resource is not present
 */

@SuppressWarnings("serial")
public class ResourceNotFoundException extends RuntimeException {

  public ResourceNotFoundException(String message) {
    super(message);
  }

}
