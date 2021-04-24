package fr.formation.itschool.masterpiece.repositories;

import fr.formation.itschool.masterpiece.domain.Account;
import fr.formation.itschool.masterpiece.dtos.account.AccountAuthDto;
import fr.formation.itschool.masterpiece.dtos.account.AccountInfoDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * {@code JpaRepository} to handle {@code Account} persistence.
 */
@Repository
public interface AccountRepository extends JpaRepository<Account, Long> {
  Optional<AccountAuthDto> findByEmailIgnoreCase(String email);

  Boolean existsByEmailIgnoreCase(String email);

  Optional<AccountInfoDto> getById(Long id);
}
