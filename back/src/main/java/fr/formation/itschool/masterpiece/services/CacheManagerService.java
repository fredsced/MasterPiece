package fr.formation.itschool.masterpiece.services;

/*
 */

public interface CacheManagerService {

  /**
   *  Clear the cache of all referentials (countries, org.units and risks)
   */
  void clearAllCaches();

  /**
   *  Clear the cache of one referential
   * @param cacheName
   */

  void clearCache(String cacheName);
}
