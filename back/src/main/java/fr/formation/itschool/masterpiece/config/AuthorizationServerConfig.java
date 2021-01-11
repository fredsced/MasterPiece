package fr.formation.itschool.masterpiece.config;

import fr.formation.itschool.masterpiece.dtos.account.AccountInfoDto;
import fr.formation.itschool.masterpiece.services.AccountService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.config.annotation.configurers.ClientDetailsServiceConfigurer;
import org.springframework.security.oauth2.config.annotation.web.configuration.AuthorizationServerConfigurerAdapter;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableAuthorizationServer;
import org.springframework.security.oauth2.config.annotation.web.configurers.AuthorizationServerEndpointsConfigurer;
import org.springframework.security.oauth2.config.annotation.web.configurers.AuthorizationServerSecurityConfigurer;
import org.springframework.security.oauth2.provider.token.DefaultTokenServices;
import org.springframework.security.oauth2.provider.token.TokenEnhancer;
import org.springframework.security.oauth2.provider.token.TokenEnhancerChain;
import org.springframework.security.oauth2.provider.token.TokenStore;
import org.springframework.security.oauth2.provider.token.store.JwtAccessTokenConverter;
import org.springframework.security.oauth2.provider.token.store.JwtTokenStore;
import org.springframework.security.oauth2.provider.token.store.KeyStoreKeyFactory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;

@Configuration
@EnableAuthorizationServer
@RestController // for "/me" endpoint
public class AuthorizationServerConfig extends AuthorizationServerConfigurerAdapter {

  // Defined as Spring bean in WebSecurity
  private final AuthenticationManager authenticationManager;
  // Custom user details service to authenticate users with username and
  // password from the database
  private final AccountService accountService;
  // Custom token converter to store custom info within access token
  private final CustomAccessTokenConverter customAccessTokenConverter;
  private final PasswordEncoder encoder;
  // Get custom properties from application.properties
  // Could be different between environments
  @Value("${jwt-auth-server.keyStore}")
  private String keyStore;
  @Value("${jwt-auth-server.keyPass}")
  private String keyPass;
  @Value("${jwt-auth-server.keyAlias}")
  private String keyAlias;
  @Value("${jwt-auth-server.accessTokenValiditySeconds}")
  private int accessTokenValiditySeconds;
  @Value("${jwt-auth-server.refreshTokenValiditySeconds}")
  private int refreshTokenValiditySeconds;
  @Value("${jwt-auth-server.clientId}")
  private String clientId;

  protected AuthorizationServerConfig(
    PasswordEncoder encoder,
    AuthenticationManager authenticationManagerBean,
    AccountService accountService,
    CustomAccessTokenConverter customAccessTokenConverter) {
    this.encoder = encoder;
    authenticationManager = authenticationManagerBean;
    this.accountService = accountService;
    this.customAccessTokenConverter = customAccessTokenConverter;
  }

  /**
   * Token service using random UUID values for the access token and refresh token values. Specifies
   * the token store and enables the refresh token.
   */
  @Bean
  protected DefaultTokenServices tokenServices() {
    DefaultTokenServices services = new DefaultTokenServices();
    services.setTokenStore(tokenStore());
    services.setSupportRefreshToken(true);
    return services;
  }

  /**
   * JwtTokenStore can read and write JWT thanks to the token converter.
   */
  @Bean
  protected TokenStore tokenStore() {
    return new JwtTokenStore(accessTokenConverter());
  }

  @Bean
  public TokenEnhancer tokenEnhancer() {
    return new CustomTokenEnhancer();
  }

  /**
   * All in one.
   */
  @Override
  public void configure(AuthorizationServerEndpointsConfigurer configurer) throws Exception {
    TokenEnhancerChain tokenEnhancerChain = new TokenEnhancerChain();
    tokenEnhancerChain.setTokenEnhancers(Arrays.asList(tokenEnhancer(), accessTokenConverter()));
    configurer
      .tokenStore(tokenStore())
      .tokenEnhancer(tokenEnhancerChain)
      .authenticationManager(authenticationManager)
      .userDetailsService(accountService);
  }

  /**
   * A token converter for JWT and specifies a signing key (private/public key pair).
   */
  @Bean
  protected JwtAccessTokenConverter accessTokenConverter() {
    JwtAccessTokenConverter converter = new JwtAccessTokenConverter();
    Resource resource = new ClassPathResource(keyStore);
    char[] password = keyPass.toCharArray();
    KeyStoreKeyFactory factory = new KeyStoreKeyFactory(resource, password);
    converter.setKeyPair(factory.getKeyPair(keyAlias));
    converter.setAccessTokenConverter(customAccessTokenConverter);
    return converter;
  }

  /**
   * Change authorization server security allowing form auth for clients (vs HTTP Basic). The
   * client_id is sent as form parameter instead.
   */
  @Override
  public void configure(AuthorizationServerSecurityConfigurer configurer) throws Exception {
    configurer.allowFormAuthenticationForClients();
  }

  /**
   * In memory client with empty secret, application is a "private" API with a single client, but
   * Spring forces a client authentication.
   *
   * <p>Authorized grant types are <i>password</i> and <i>refresh_token</i>.
   *
   * <p>The scope is trusted (convention) and no need to specify it during client authentication. We
   * do not use scope-based authorization in this application.
   */
  @Override
  public void configure(ClientDetailsServiceConfigurer clients) throws Exception {
    clients
      .inMemory()
      .withClient(clientId)
      .secret(encoder.encode(""))
      .scopes("trusted")
      .authorizedGrantTypes("password")
      .accessTokenValiditySeconds(accessTokenValiditySeconds);
  }

  /**
   * Standard endpoint returning a view of the current authenticated user.
   *
   * <p>Could be in a "user controller".
   */
  @GetMapping("/accountInfo")
  public AccountInfoDto userInfo() {
    Long userId = SecurityHelper.getAccountId();
    return accountService.getCurrentAccountInfo(userId);
  }
}
