package fr.formation.itschool.masterpiece.services;

import fr.formation.itschool.masterpiece.dtos.LevelViewDto;

import java.util.List;

public interface LevelService {
  List<LevelViewDto> getAllLevels();
}
