package com.umsm.user_management_system_monolithic.controller;

import com.umsm.user_management_system_monolithic.dto.MessageDto;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.core.annotation.AuthenticationPrincipal;


@RestController
public class PrivateController {

    @GetMapping("/private")
    public ResponseEntity<MessageDto> privateMessages(@AuthenticationPrincipal Jwt jwt) { //Inject the currently authenticated JWT token
        return ResponseEntity.ok(new MessageDto("Hello " + jwt.getClaim("name")));
    }
}
