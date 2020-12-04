package fr.formation.itschool.masterpiece.repositories;

import fr.formation.itschool.masterpiece.domain.Account;
import fr.formation.itschool.masterpiece.dtos.AccountAuthDto;
import fr.formation.itschool.masterpiece.dtos.AccountInfoDto;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AccountRepository extends JpaRepository<Account, Long> {
  Optional<AccountAuthDto> findByEmailIgnoreCase(String email);

  Boolean existsByEmailIgnoreCase(String email);

  Optional<AccountInfoDto> getById(Long id);
}
