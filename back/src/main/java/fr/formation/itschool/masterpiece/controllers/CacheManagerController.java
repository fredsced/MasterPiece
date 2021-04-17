package fr.formation.itschool.masterpiece.controllers;

import fr.formation.itschool.masterpiece.services.CacheManagerService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@PreAuthorize("hasRole('ROLE_ADMIN')")
@RestController
@RequestMapping(value = "cache-managers")
public class CacheManagerController {

  private final CacheManagerService cacheManagerService;

  protected CacheManagerController(CacheManagerService cacheManagerService) {
    this.cacheManagerService = cacheManagerService;
  }

  @GetMapping()
  protected void clearAllCaches() {
    cacheManagerService.clearAllCaches();
  }

  @GetMapping("/{cacheName}")
  protected void clearCache(@PathVariable String cacheName) {
    cacheManagerService.clearCache(cacheName);
  }
}
