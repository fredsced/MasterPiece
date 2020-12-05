package fr.formation.itschool.masterpiece.config;

import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class BeanConfig {
  /**
   * The password encoder bean for the application. Used for client and users.
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
   * The cors configuration for the entire application.
   * Allow only the front
   *
   * @return a modelMapper
   */
  /*@Bean
  public WebMvcConfigurer corsConfigurer() {
    return new WebMvcConfigurer() {
      @Override
      public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**").allowedOrigins("http://localhost:3000");
      }
    };
  }*/
}
