package fr.formation.itschool.masterpiece.controllers;

import fr.formation.itschool.masterpiece.dtos.CreateAccountDto;
import fr.formation.itschool.masterpiece.services.AccountService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@CrossOrigin
@RestController
@RequestMapping(value = "/private")
class AccountController {

  private final AccountService service;

  protected AccountController(AccountService service) {
    this.service = service;
  }

  @PostMapping("/accounts")
  public void createAccount(@Valid @RequestBody CreateAccountDto createAccountDto) {
    service.create(createAccountDto);
  }
}
