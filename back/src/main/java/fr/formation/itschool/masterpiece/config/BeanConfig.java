package fr.formation.itschool.masterpiece.config;

import fr.formation.itschool.masterpiece.domain.Collaborator;
import fr.formation.itschool.masterpiece.domain.ComplianceReferent;
import fr.formation.itschool.masterpiece.dtos.collaborator.SaveCollaboratorDto;
import fr.formation.itschool.masterpiece.dtos.compliancereferent.SaveComplianceReferentDto;
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
    modelMapper.typeMap(SaveCollaboratorDto.class, Collaborator.class).addMappings(mapper -> mapper.skip(Collaborator::setId));
    modelMapper.typeMap(SaveComplianceReferentDto.class, ComplianceReferent.class).addMappings(mapper -> mapper.skip(ComplianceReferent::setId));
    return modelMapper;
  }

  /**
   * The cache manager for application. Used to cached some referential data.
   *
   * @return a {@code ConcurrentMapCacheManager} instance
   */
  @Bean
  public CacheManager cacheManager() {
    return new ConcurrentMapCacheManager("countries", "organisationUnits", "risks");

  }

}
