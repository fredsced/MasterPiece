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
public class AccountControllerTest extends IntegrationTest {

  @Value("${mockserver.paths.accounts}")
  private String path;

  @ParameterizedTest
  @Order(1)
  @CsvFileSource(resources = "/accountsSuccess.csv", delimiterString = "|$|", numLinesToSkip = 1)
  void shouldCreateAccount(String account) throws Exception {
    api.perform(post(path)
      .contentType(MediaType.APPLICATION_JSON)
      .content(account))
      .andExpect(status().isOk());
  }

  @ParameterizedTest
  @Order(2)
  @CsvFileSource(resources = "/accountsSuccess.csv", delimiterString = "|$|", numLinesToSkip = 1)
  void shouldNotCreateDuplicateAccount(String account) throws Exception {
    api.perform(post(path)
      .contentType(MediaType.APPLICATION_JSON)
      .content(account))
      .andExpect(status().is4xxClientError());
  }
  @ParameterizedTest
  @Order(3)
  @CsvFileSource(resources = "/accountsFail.csv", delimiterString = "|$|", numLinesToSkip = 1)
  void shouldNotCreateInvalidAccount(String account) throws Exception {
    api.perform(post(path)
      .contentType(MediaType.APPLICATION_JSON)
      .content(account))
      .andExpect(status().is4xxClientError());
  }



}
