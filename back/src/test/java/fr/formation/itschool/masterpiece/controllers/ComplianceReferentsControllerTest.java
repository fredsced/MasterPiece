package fr.formation.itschool.masterpiece.controllers;

import fr.formation.itschool.masterpiece.IntegrationTest;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.TestMethodOrder;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvFileSource;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class ComplianceReferentsControllerTest extends IntegrationTest {
  @Value("${mockserver.paths.compliance.referents}")
  private String path;

  @Value("${token.user}")
  private String userToken;

  @Value("${token.admin}")
  private String adminToken;

  @Value("${token.invalid}")
  private String invalidToken;

  @Order(1)
  @ParameterizedTest
  @CsvFileSource(resources = "/create_compliance_referents.csv", delimiterString = "|$|", numLinesToSkip = 1)
  void shouldNotCreateCollaboratorUnauthenticated(String complianceReferent) throws Exception {
    api.perform(post(path)
      .contentType(MediaType.APPLICATION_JSON)
      .content(complianceReferent))
      .andExpect(status().isUnauthorized());
  }
  @Order(2)
  @ParameterizedTest
  @CsvFileSource(resources = "/create_compliance_referents.csv", delimiterString = "|$|", numLinesToSkip = 1)
  void shouldNotCreateComplianceReferentInvalidToken(String complianceReferent) throws Exception {
    api.perform(post(path)
      .header("Authorization", invalidToken)
      .contentType(MediaType.APPLICATION_JSON)
      .content(complianceReferent))
      .andExpect(status().isUnauthorized());
  }
  @Order(3)
  @ParameterizedTest
  @CsvFileSource(resources = "/create_compliance_referents.csv", delimiterString = "|$|", numLinesToSkip = 1)
  void shouldNotCreateComplianceReferentUserRole(String complianceReferent) throws Exception {
    api.perform(post(path)
      .header("Authorization", userToken)
      .contentType(MediaType.APPLICATION_JSON)
      .content(complianceReferent))
      .andExpect(status().isForbidden());
  }
  @Order(4)
  @ParameterizedTest
  @CsvFileSource(resources = "/create_compliance_referents.csv", delimiterString = "|$|", numLinesToSkip = 1)
  void shouldCreateComplianceReferentAdminRole(String complianceReferent) throws Exception {
    api.perform(post(path)
      .header("Authorization", adminToken)
      .contentType(MediaType.APPLICATION_JSON)
      .content(complianceReferent))
      .andExpect(status().isOk());
  }
  @Order(5)
  @ParameterizedTest
  @CsvFileSource(resources = "/create_compliance_referents.csv", delimiterString = "|$|", numLinesToSkip = 1)
  void shouldNotCreateDuplicatedComplianceReferentAdminRole(String complianceReferent) throws Exception {
    api.perform(post(path)
      .header("Authorization", adminToken)
      .contentType(MediaType.APPLICATION_JSON)
      .content(complianceReferent))
      .andExpect(status().isBadRequest());
  }
  @Order(6)
  @ParameterizedTest
  @CsvFileSource(resources = "/create_compliance_referents.csv", delimiterString = "|$|", numLinesToSkip = 1)
  void shouldNotCreatInvalidComplianceReferentAdminRole(String complianceReferent) throws Exception {
    api.perform(post(path)
      .header("Authorization", adminToken)
      .contentType(MediaType.APPLICATION_JSON)
      .content(complianceReferent))
      .andExpect(status().isBadRequest());
  }
}
