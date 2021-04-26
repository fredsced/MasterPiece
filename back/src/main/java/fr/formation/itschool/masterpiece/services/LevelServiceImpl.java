package fr.formation.itschool.masterpiece.services;

import fr.formation.itschool.masterpiece.dtos.LevelViewDto;
import fr.formation.itschool.masterpiece.repositories.LevelRepository;
import org.modelmapper.ModelMapper;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class LevelServiceImpl implements LevelService {

  private final LevelRepository levelRepository;
  private final ModelMapper modelMapper;

  protected LevelServiceImpl(LevelRepository levelRepository, ModelMapper modelMapper) {
    this.levelRepository = levelRepository;
    this.modelMapper = modelMapper;
  }

  @Cacheable("levels")
  @Transactional(readOnly = true)
  @Override
  public List<LevelViewDto> getAllLevels() {
    return levelRepository.findAll().stream()
      .map(level -> modelMapper.map(level, LevelViewDto.class))
      .collect(Collectors.toList());
  }
}
