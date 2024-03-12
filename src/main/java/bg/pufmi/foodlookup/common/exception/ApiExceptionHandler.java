package bg.pufmi.foodlookup.common.exception;

import static org.springframework.http.HttpStatus.BAD_REQUEST;
import static org.springframework.http.HttpStatus.NOT_FOUND;

import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.ConstraintViolationException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ApiExceptionHandler {

  @ExceptionHandler(EntityNotFoundException.class)
  @ResponseStatus(code = NOT_FOUND)
  public ErrorResponse handleEntityNotFound(EntityNotFoundException ex) {
    return new ErrorResponse(ex.getMessage(), NOT_FOUND.value());
  }

  @ExceptionHandler(ConstraintViolationException.class)
  @ResponseStatus(BAD_REQUEST)
  public ConstraintViolationException handleFailedDataValidation(ConstraintViolationException ex) {
    return ex;
  }
}
