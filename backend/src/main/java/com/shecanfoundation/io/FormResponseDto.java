package com.shecanfoundation.io;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FormResponseDto {
    private long id;
    private String name;
    private String email;
    private String message;
}

