package fr.formation.itschool.masterpiece.controllers;

import fr.formation.itschool.masterpiece.dtos.account.CreateAccountDto;
import fr.formation.itschool.masterpiece.services.AccountService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

/**
 * A {@code RestController} to handle {@code Accounts}.
 *
 */

 @RestController
@RequestMapping(value = "/accounts")
class AccountController {

  private final AccountService accountService;

  protected AccountController(AccountService accountService) {
    this.accountService = accountService;
  }

  /**
   * Creates a new account with given email, password and default role
   * @param createAccountDto
   */
  @PostMapping()
  protected void createAccount(@Valid @RequestBody CreateAccountDto createAccountDto) {
    accountService.create(createAccountDto);
  }
}
