package com.shecanfoundation.service;

import com.shecanfoundation.entitiy.DataEntity;
import com.shecanfoundation.io.FormRequestDto;
import com.shecanfoundation.io.FormResponseDto;
import com.shecanfoundation.repository.DataRepository;
import org.springframework.stereotype.Service;

@Service
public class FormService {

    private final DataRepository dataRepository;

    public FormService(DataRepository dataRepository) {
        this.dataRepository = dataRepository;
    }

    public FormResponseDto submit(FormRequestDto requestDto) {
        DataEntity entity = DataEntity.builder()
                .name(requestDto.getName())
                .email(requestDto.getEmail())
                .message(requestDto.getMessage())
                .build();

        DataEntity saved = dataRepository.save(entity);

        return new FormResponseDto(
                saved.getId(),
                saved.getName(),
                saved.getEmail(),
                saved.getMessage()
        );
    }
}

