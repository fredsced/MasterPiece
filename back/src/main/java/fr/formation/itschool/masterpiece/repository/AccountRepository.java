package fr.formation.itschool.masterpiece.repository;

import fr.formation.itschool.masterpiece.domain.Account;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AccountRepository extends JpaRepository<Account, Long> {
  Optional<Account> findByEmail(String email);
}
