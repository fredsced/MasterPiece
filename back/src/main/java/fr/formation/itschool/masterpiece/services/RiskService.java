package fr.formation.itschool.masterpiece.services;

import fr.formation.itschool.masterpiece.dtos.RiskViewDto;

import java.util.List;

public interface RiskService {
    List<RiskViewDto> getAll();
}
