package fr.formation.itschool.masterpiece.controller;

import fr.formation.itschool.masterpiece.dto.AccountDto;
import fr.formation.itschool.masterpiece.service.AccountServiceImpl;
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

  private final AccountServiceImpl service;

  protected AccountController(AccountServiceImpl service) {
    this.service = service;
  }

  @PostMapping("/account")
  public void createAccount(@Valid @RequestBody AccountDto accountDto) {
    service.create(accountDto);
  }
}
