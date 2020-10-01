package fr.formation.itschool.masterpiece.config;

import org.springframework.security.oauth2.common.DefaultOAuth2AccessToken;
import org.springframework.security.oauth2.common.OAuth2AccessToken;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.security.oauth2.provider.token.TokenEnhancer;

import java.util.HashMap;
import java.util.Map;

public class CustomTokenEnhancer implements TokenEnhancer {

  final static String USER_ID_KEY = "userId";
  final static String USER_EMAIL  = "userEmail";

  @Override
  public OAuth2AccessToken enhance(OAuth2AccessToken accessToken,
                                   OAuth2Authentication authentication) {
    // Store user id in access token as additional info
    Map<String, Object> additionalInfo = new HashMap<>();
    // Authentication principal not yet flattened to username
    // Will be available in access token and Authentication object
    AccountDetails user = (AccountDetails) authentication
        .getPrincipal();
    additionalInfo.put(USER_ID_KEY, user.getId());
    additionalInfo.put(USER_EMAIL, user.getUsername());
    ((DefaultOAuth2AccessToken) accessToken)
        .setAdditionalInformation(additionalInfo);
    return accessToken;
  }
}

