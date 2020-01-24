package fr.formation.itschool.masterpiece.service;

import fr.formation.itschool.masterpiece.domain.Account;
import fr.formation.itschool.masterpiece.dto.AccountDto;
import fr.formation.itschool.masterpiece.repository.AccountRepository;
import org.springframework.stereotype.Service;

@Service
public class AccountService {
    private final AccountRepository repo;

    protected AccountService(AccountRepository repo){
        this.repo = repo;
    }

    public boolean createAccount(AccountDto accountDto){
        Account accountToSave = new Account();
        accountToSave.setEmail(accountDto.getEmail());
        accountToSave.setPassword(accountDto.getPassword());
        // check if email is already use in db
        if (repo.findByEmail(accountToSave.getEmail()).isPresent()){
            return false;
        }
        else{
            repo.save(accountToSave);
            return true;
        }
    }

}
