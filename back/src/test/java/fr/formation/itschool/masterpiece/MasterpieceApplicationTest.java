package fr.formation.itschool.masterpiece;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.context.web.WebAppConfiguration;

@ExtendWith(SpringExtension.class)
@SpringBootTest
@WebAppConfiguration
@ContextConfiguration
@ActiveProfiles("test")
public class MasterpieceApplicationTest {
  @Test
  void contextLoads() {
  }
}
