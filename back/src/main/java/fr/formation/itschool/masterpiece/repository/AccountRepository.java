package fr.formation.itschool.masterpiece.repository;

import fr.formation.itschool.masterpiece.domain.Account;
import fr.formation.itschool.masterpiece.dto.AccountAuthDto;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AccountRepository extends JpaRepository<Account, Long> {
  Optional<AccountAuthDto> findByEmail(String email);
}
