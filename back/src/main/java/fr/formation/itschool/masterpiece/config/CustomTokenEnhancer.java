package fr.formation.itschool.masterpiece.config;

import fr.formation.itschool.masterpiece.dtos.CollaboratorInfoDto;
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
  static final String COLLABORATOR_LASTNAME = "collaboratorLastname";
  static final String COLLABORATOR_FIRSTNAME = "collaboratorFirstname";
  static final String COLLABORATOR_ID = "collaboratorId";
  static final String COLLABORATOR_COUNTRY_ID = "collaboratorCountryId";
  static final String COLLABORATOR_ORG_UNIT_ID = "collaboratorOrgUnitId";

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
    boolean hasProfile = collaboratorService.hasProfile(account.getId());
    additionalInfo.put(ACCOUNT_HAS_PROFILE, hasProfile);
    if (hasProfile){
        CollaboratorInfoDto collaboratorInfo = collaboratorService.getCollaboratorInfoByAccountId(account.getId());
        additionalInfo.put(COLLABORATOR_ID, collaboratorInfo.getId());
        additionalInfo.put(COLLABORATOR_LASTNAME, collaboratorInfo.getLastname());
        additionalInfo.put(COLLABORATOR_FIRSTNAME, collaboratorInfo.getFirstname());
        additionalInfo.put(COLLABORATOR_COUNTRY_ID, collaboratorInfo.getCountryId());
        additionalInfo.put(COLLABORATOR_ORG_UNIT_ID, collaboratorInfo.getOrganisationUnitId());
    }
    ((DefaultOAuth2AccessToken) accessToken).setAdditionalInformation(additionalInfo);
    return accessToken;
  }
}
