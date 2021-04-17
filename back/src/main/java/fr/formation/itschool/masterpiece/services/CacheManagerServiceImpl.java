package fr.formation.itschool.masterpiece.services;

import org.springframework.cache.CacheManager;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Service
public class CacheManagerServiceImpl implements CacheManagerService {

  private final CacheManager cacheManager;

  protected CacheManagerServiceImpl(CacheManager cacheManager) {
    this.cacheManager = cacheManager;
  }

  @Override
  public void clearAllCaches() {
    for (String name : cacheManager.getCacheNames()) {
      Objects.requireNonNull(cacheManager.getCache(name),"Cache name must exist").clear();
    }
  }

  @Override
  public void clearCache(String cacheName) {
    Objects.requireNonNull(cacheManager.getCache(cacheName), "Cache name must exist").clear();
  }
}
