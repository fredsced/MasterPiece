package fr.formation.itschool.masterpiece.dtos;

import fr.formation.itschool.masterpiece.dtos.account.CreateAccountDto;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertNotNull;

public class CreateAccountDtoTest {
  @Test
  void should_create_account_with_no_params(){
    CreateAccountDto actual = new CreateAccountDto();
    assertNotNull(actual, "Create account failed");
  }

}
