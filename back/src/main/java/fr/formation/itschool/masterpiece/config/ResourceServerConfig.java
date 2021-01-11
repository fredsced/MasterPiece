package fr.formation.itschool.masterpiece.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer;
import org.springframework.security.oauth2.config.annotation.web.configuration.ResourceServerConfigurerAdapter;

@Configuration
@EnableResourceServer
@EnableGlobalMethodSecurity(prePostEnabled = true, securedEnabled = true)
public class ResourceServerConfig extends ResourceServerConfigurerAdapter {

  /**
   * Configures the HTTP security for this application.
   *
   * @param http the HttpSecurity to configure
   */
  @Override
  public void configure(HttpSecurity http) throws Exception {
    /*
    All the endpoints request authentication except the POST method in the /api/accounts end point
    To enable anonymous to create an account
     */
    http.httpBasic()
      .disable()
      .sessionManagement()
      .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
      .and()
      .authorizeRequests()
      .antMatchers(HttpMethod.OPTIONS)
      .permitAll()
      .and()
      .authorizeRequests()
      .antMatchers(HttpMethod.POST, "/api/accounts")
      .permitAll()
      .and()
      .authorizeRequests()
      .antMatchers("/api/**")
      .authenticated();
  }
}
