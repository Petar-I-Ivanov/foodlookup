package bg.pufmi.foodlookup.utils;

import static org.springframework.security.core.context.SecurityContextHolder.getContext;

import java.util.Optional;
import org.springframework.security.core.Authentication;

public class SecurityUtils {

  private SecurityUtils() {}

  public static boolean isAuthenticated() {
    return Optional.ofNullable(getContext().getAuthentication())
        .map(Authentication::isAuthenticated)
        .orElse(false);
  }
}
