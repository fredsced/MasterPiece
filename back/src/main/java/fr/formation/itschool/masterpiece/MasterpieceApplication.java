package fr.formation.itschool.masterpiece;

import org.modelmapper.ModelMapper;
import org.modelmapper.config.Configuration;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
public class MasterpieceApplication {

  public static void main(String[] args) {
    SpringApplication.run(MasterpieceApplication.class, args);
  }

  /**
   * The password encoder bean for the application. Used for client and users.
   *
   * @return a password encoder
   */
  @Bean
  protected PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }
  /**
   * The modelMapper for application. Used to make the mapping between dtos and entities.
   *
   * @return a modelMapper
   */
  @Bean
  protected ModelMapper modelMapper() {
    ModelMapper modelMapper = new ModelMapper();
    modelMapper
        .getConfiguration()
        .setFieldMatchingEnabled(true)
        .setFieldAccessLevel(Configuration.AccessLevel.PRIVATE)
        .setMatchingStrategy(MatchingStrategies.STANDARD);
    return modelMapper;
  }
}
