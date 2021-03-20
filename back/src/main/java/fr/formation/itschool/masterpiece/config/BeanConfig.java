package fr.formation.itschool.masterpiece.config;

import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.cache.CacheManager;
import org.springframework.cache.concurrent.ConcurrentMapCacheManager;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class BeanConfig {
  /**
   * The password encoder bean for the application. Used for client and accounts.
   *
   * @return a {@code PasswordEncoder}
   */
  @Bean
  protected PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }

  /**
   * The modelMapper for application. Used to make the mapping between dtos and entities.
   *
   * @return a {@code ModelMapper} instance
   */
  @Bean
  protected ModelMapper modelMapper() {
    ModelMapper modelMapper = new ModelMapper();
    modelMapper
      .getConfiguration()
      .setFieldMatchingEnabled(true)
      .setFieldAccessLevel(org.modelmapper.config.Configuration.AccessLevel.PRIVATE)
      .setMatchingStrategy(MatchingStrategies.STANDARD);
    return modelMapper;
  }

  /**
   * The cacheManager for application. Used to provided referential data without accessing DB after the first time.
   *
   * @return a {@code ConcurrentMapCacheManager} instance
   */
  @Bean
  protected CacheManager cacheManager() {
    return new ConcurrentMapCacheManager("countries", "organisationUnits", "risks");

  }

}
