package fr.formation.itschool.masterpiece.repository;

import fr.formation.itschool.masterpiece.domain.Account;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AccountRepository extends JpaRepository <Account, Long> {

}
