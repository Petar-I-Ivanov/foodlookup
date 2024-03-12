package bg.pufmi.foodlookup.common.exception;

import static lombok.AccessLevel.PRIVATE;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@RequiredArgsConstructor
@FieldDefaults(level = PRIVATE, makeFinal = true)
public class ErrorResponse {

  String message;
  Integer code;
}
