package fr.formation.itschool.masterpiece.controllers;

import fr.formation.itschool.masterpiece.services.CacheManagerService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * a {@code RestController} to handle {@code Caches}.
 *
 * @author Frederic Descloux
 */

@PreAuthorize("hasRole('ROLE_ADMIN')")
@RestController
@RequestMapping(value = "cache-managers")
public class CacheManagerController {

  private final CacheManagerService cacheManagerService;

  /**
   * Protected constructor to autowire needed bean
   *
   * @param cacheManagerService interface
   */
  protected CacheManagerController(CacheManagerService cacheManagerService) {
    this.cacheManagerService = cacheManagerService;
  }

  /**
   * Clear all caches
   */
  @GetMapping()
  protected void clearAllCaches() {
    cacheManagerService.clearAllCaches();
  }

  /**
   * Clear cache by {@code cacheName}
   *
   * @param cacheName
   */

  @GetMapping("/{cacheName}")
  protected void clearCache(@PathVariable String cacheName) {
    cacheManagerService.clearCache(cacheName);
  }
}
