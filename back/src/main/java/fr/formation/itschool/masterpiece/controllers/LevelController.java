package fr.formation.itschool.masterpiece.controllers;

import fr.formation.itschool.masterpiece.dtos.LevelViewDto;
import fr.formation.itschool.masterpiece.services.LevelService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * A{@code RestController}to handle{@code Levels}.
 */

@RestController
@RequestMapping("levels")
public class LevelController {
  private final LevelService levelService;

  protected LevelController(LevelService levelService) {
    this.levelService = levelService;
  }

  @PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
  @GetMapping()
  protected List<LevelViewDto> getAll() {
    return levelService.getAllLevels();
  }


}


