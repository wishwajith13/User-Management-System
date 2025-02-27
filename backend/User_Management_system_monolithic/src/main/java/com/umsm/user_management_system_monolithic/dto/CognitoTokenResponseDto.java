package com.umsm.user_management_system_monolithic.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true) // This annotation is used to ignore any unknown properties in JSON response
public record CognitoTokenResponseDto(String id_token) {
}
