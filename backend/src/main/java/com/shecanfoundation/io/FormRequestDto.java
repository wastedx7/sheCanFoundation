package com.shecanfoundation.io;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FormRequestDto {
    private String name;
    private String email;
    private String message;
}

