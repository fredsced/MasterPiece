package fr.formation.itschool.masterpiece.services;

import fr.formation.itschool.masterpiece.dtos.RiskViewDto;
import fr.formation.itschool.masterpiece.repositories.RiskRepository;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class RiskServiceImpl implements RiskService{

    private final RiskRepository riskRepository;
    private final ModelMapper modelMapper;

    protected RiskServiceImpl(RiskRepository riskRepository, ModelMapper modelMapper){
        this.riskRepository = riskRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public List<RiskViewDto> getAll() {
        return riskRepository.findAll()
                .stream()
                .map( risk -> modelMapper.map(risk,RiskViewDto.class))
                .collect(Collectors.toList());
    }
}
