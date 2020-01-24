package fr.formation.itschool.masterpiece.controller;

import fr.formation.itschool.masterpiece.dto.AccountDto;
import fr.formation.itschool.masterpiece.service.AccountService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@CrossOrigin
@RestController
@RequestMapping(value="/api")
public class AccountController {

    private final AccountService service;

    protected AccountController(AccountService service){
        this.service = service;
    }

    @PostMapping("/account")
    public ResponseEntity<String> newAccount(@Valid @RequestBody AccountDto accountdto)  {
        if (service.createAccount(accountdto)) {
            return new ResponseEntity<>("Account created", HttpStatus.CREATED);
        }
        else {
            return new ResponseEntity<>("Email already presents", HttpStatus.CONFLICT);
        }
    }
}
