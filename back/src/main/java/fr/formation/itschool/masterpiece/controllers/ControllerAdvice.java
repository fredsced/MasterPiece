package fr.formation.itschool.masterpiece.controllers;

import fr.formation.itschool.masterpiece.errors.RestApiError;
import fr.formation.itschool.masterpiece.exceptions.ResourceNotFoundException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import javax.persistence.EntityNotFoundException;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Controller advice to handle all {@code RestController} exceptions.
 * <p>
 * Manages handlers for exceptions to mutualize and standardize exception
 * handling for all {@code RestControllers}
 *
 */

 @RestControllerAdvice
public class ControllerAdvice extends ResponseEntityExceptionHandler {

  @ExceptionHandler(ResourceNotFoundException.class)
  protected ResponseEntity<Object> handleResourceNotFountException(ResourceNotFoundException ex, WebRequest request) {
    RestApiError restApiError = new RestApiError("EntityNotFoundException");
    return super.handleExceptionInternal(ex, restApiError, null, HttpStatus.NOT_FOUND, request);
  }

  @ExceptionHandler(EntityNotFoundException.class)
  protected ResponseEntity<Object> handleEntityNotFoundException(EntityNotFoundException ex, WebRequest request) {
    RestApiError restApiError = new RestApiError("EntityNotFoundException");
    return super.handleExceptionInternal(ex, restApiError, null, HttpStatus.NOT_FOUND, request);
  }

  @ExceptionHandler(DataIntegrityViolationException.class)
  protected ResponseEntity<Object> handleDataIntegrityViolationException(DataIntegrityViolationException ex, WebRequest request) {

    RestApiError restApiError = new RestApiError("SQLIntegrityException");
    return super.handleExceptionInternal(ex, restApiError, null, HttpStatus.CONFLICT, request);
  }

  @Override
  protected ResponseEntity<Object> handleMethodArgumentNotValid(
    MethodArgumentNotValidException ex,
    HttpHeaders headers,
    HttpStatus status,
    WebRequest webRequest) {
    BindingResult result = ex.getBindingResult();
    List<FieldError> fieldErrors = result.getFieldErrors();
    List<String> errors = fieldErrors.stream()
      .map(fieldError -> fieldError.getField() + "-" + fieldError.getDefaultMessage()).collect(Collectors.toList());
    RestApiError restApiError = new RestApiError("ValidationFailed", errors);

    return super.handleExceptionInternal(ex, restApiError, headers, status, webRequest);
  }


}
