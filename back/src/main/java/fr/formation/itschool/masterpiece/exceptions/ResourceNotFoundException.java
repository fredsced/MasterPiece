package fr.formation.itschool.masterpiece.config;

public class ResourceNotFoundException extends RuntimeException{

  public ResourceNotFoundException(String message){
    super(message);
  }
}
