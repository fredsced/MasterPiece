package fr.formation.itschool.masterpiece.controllers;

import fr.formation.itschool.masterpiece.IntegrationTest;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvFileSource;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

public class CollaboratorControllerTest extends IntegrationTest {

  @Value("${mockserver.paths.collaborators}")
  private String path;

  @Value("${token.user}")
  private String userToken;

  @Value("${token.invalid}")
  private String invalidToken;


  @ParameterizedTest
  @CsvFileSource(resources = "/collaborators.csv", delimiterString = "|$|", numLinesToSkip = 1)
  void shouldNotCreateCollaboratorUnauthenticated(String collaborator) throws Exception {
    api.perform(put(path)
      .contentType(MediaType.APPLICATION_JSON)
      .content(collaborator))
      .andExpect(status().isUnauthorized());
  }

  @ParameterizedTest
  @CsvFileSource(resources = "/collaborators.csv", delimiterString = "|$|", numLinesToSkip = 1)
  void shouldCreateCollaboratorAuthenticatedAsUser(String collaborator) throws Exception {
    api.perform(put(path)
      .header("Authorization", userToken)
      .contentType(MediaType.APPLICATION_JSON)
      .content(collaborator))
      .andExpect(status().isOk());
  }
  @ParameterizedTest
  @CsvFileSource(resources = "/collaborators_2.csv", delimiterString = "|$|", numLinesToSkip = 1)
  void shouldNotCreateCollaboratorAuthenticatedExpired(String collaborator) throws Exception {
    api.perform(put(path)
      .header("Authorization", invalidToken)
      .contentType(MediaType.APPLICATION_JSON)
      .content(collaborator))
      .andExpect(status().isUnauthorized());
  }
}