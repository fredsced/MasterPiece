package fr.formation.itschool.masterpiece.config;


import java.util.Map;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.provider.authentication.OAuth2AuthenticationDetails;

/**
 * Helper class to access the Spring security context.
 * <p>
 * Provides convenient methods to deal with the currently authenticated user.
 */
public final class SecurityHelper {

  private SecurityHelper() {
    // Ensure non-instantiability, helper class with static methods only
  }

  /**
   * Returns the currently authenticated user identifier.
   *
   * @return the authenticated user identifier
   */
  @SuppressWarnings("unchecked")
  public static Long getAccountId() {
    Authentication auth = getAuthentication();
    OAuth2AuthenticationDetails details = (OAuth2AuthenticationDetails) auth
        .getDetails();
    Map<String, Object> decodedDetails = (Map<String, Object>) details
        .getDecodedDetails();
    Integer value = (Integer) decodedDetails
        .get(CustomTokenEnhancer.ACCOUNT_ID_KEY);
    return value.longValue();
  }

  /**
   * Returns the currently authenticated user username.
   * <p>
   * Alias for {@link #getPrincipal()}
   *
   * @return the authenticated user username
   */
  public static String getUsername() {
    return getPrincipal();
  }

  /**
   * Returns the currently authenticated principal.
   * <p>
   * The principal is the string representation of the "user details" object,
   * in other words its username.
   *
   * @return the principal
   * @see #getUsername()
   */
  public static String getPrincipal() {
    return (String) getAuthentication().getPrincipal();
  }

  /**
   * Returns the {@code Authentication} object associated to the currently
   * authenticated principal, or an authentication request token.
   *
   * @return the Authentication or {@code null} if no
   *         authenticationinformation is available
   */
  public static Authentication getAuthentication() {
    return SecurityContextHolder.getContext().getAuthentication();
  }
}
