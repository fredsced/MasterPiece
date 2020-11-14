package fr.formation.itschool.masterpiece.config;

import fr.formation.itschool.masterpiece.dtos.CollaboratorNameDto;
import fr.formation.itschool.masterpiece.services.CollaboratorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.common.DefaultOAuth2AccessToken;
import org.springframework.security.oauth2.common.OAuth2AccessToken;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.security.oauth2.provider.token.TokenEnhancer;

import java.util.HashMap;
import java.util.Map;

public class CustomTokenEnhancer implements TokenEnhancer {

  static final String ACCOUNT_ID_KEY = "accountId";
  static final String ACCOUNT_EMAIL = "accountEmail";
  static final String ACCOUNT_ROLES = "accountRoles";
  static final String ACCOUNT_HAS_PROFILE = "accountHasProfile";
  static final String COLLABORATOR_NAME = "collaboratorName";
  static final String COLLABORATOR_FIRSTNAME = "collaboratorFirstname";
  static final String COLLABORATOR_COUNTRY_ISO = "collaboratorCountryIso";
  static final String COLLABORATOR_ORG_UNIT_CODE = "collaboratorOrgUnitCode";

  // need to conserve the enhance method signature
  @Autowired private CollaboratorService collaboratorService;

  @Override
  public OAuth2AccessToken enhance(
      OAuth2AccessToken accessToken, OAuth2Authentication authentication) {
    // Store account id in access token as additional info
    Map<String, Object> additionalInfo = new HashMap<>();
    // Authentication principal not yet flattened to username
    // Will be available in access token and Authentication object
    AccountDetails account = (AccountDetails) authentication.getPrincipal();
    additionalInfo.put(ACCOUNT_ID_KEY, account.getId());
    additionalInfo.put(ACCOUNT_EMAIL, account.getUsername());
    additionalInfo.put(ACCOUNT_ROLES, account.getAuthorities());
    additionalInfo.put(ACCOUNT_HAS_PROFILE, collaboratorService.hasProfile(account.getId()));
    if (collaboratorService.hasProfile(account.getId())){
        CollaboratorNameDto collaboratorName = collaboratorService.getNameByAccountId(account.getId());
        additionalInfo.put(COLLABORATOR_NAME, collaboratorName.getName());
        additionalInfo.put(COLLABORATOR_FIRSTNAME, collaboratorName.getFirstname());
    }
    ((DefaultOAuth2AccessToken) accessToken).setAdditionalInformation(additionalInfo);
    return accessToken;
  }
}
