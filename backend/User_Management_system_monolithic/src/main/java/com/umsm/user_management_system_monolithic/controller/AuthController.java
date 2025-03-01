package com.umsm.user_management_system_monolithic.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.umsm.user_management_system_monolithic.dto.CognitoTokenResponseDto;
import com.umsm.user_management_system_monolithic.dto.TokenDto;
import com.umsm.user_management_system_monolithic.dto.UrlDto;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.Base64;

@RestController
public class AuthController {
    @Value("${auth.cognitoUri}")
    private String cognitoUri;

    @Value("${spring.security.oauth2.resourceserver.jwt.clientSecret}")
    private String clientSecret;

    @Value("${spring.security.oauth2.resourceserver.jwt.clientId}")
    private String clientId;

    private static final ObjectMapper JSON_MAPPER = new ObjectMapper();

    @GetMapping("/auth/url")
    public ResponseEntity<UrlDto> auth() {
        String url = cognitoUri +
                "/oauth2/authorize?" +
                "response_type=code" +
                "&client_id=" + clientId +
                "&redirect_uri=http://localhost:3001/oauth2/idpresponse" +
                "&scope=email+openid+profile";
        return ResponseEntity.ok(new UrlDto(url));
    }

    @GetMapping("/auth/callback")
    public ResponseEntity<TokenDto> callback(@RequestParam("code") String code) throws URISyntaxException {

        //Build Cognito Token Request URL
        String urlStr = cognitoUri + "/oauth2/token?"
                + "grant_type=authorization_code" +
                "&client_id=" + clientId +
                "&code=" + code +
                "&redirect_uri=http://localhost:3001/oauth2/idpresponse";

        String authenticationInfo = clientId + ":" + clientSecret;
        String basicAuthenticationInfo = Base64.getEncoder().encodeToString(authenticationInfo.getBytes());

        HttpRequest request;
        try {
            //Create Basic Authentication Header
            request = HttpRequest.newBuilder(new URI(urlStr))
                    .header("Content-type", "application/x-www-form-urlencoded") //standard for token requests
                    .header("Authorization", "Basic " + basicAuthenticationInfo)
                    .POST(HttpRequest.BodyPublishers.noBody())
                    .build();
        } catch (URISyntaxException e) {
            throw new RuntimeException("Unable to build Cognito URL");
        }

        HttpClient client = HttpClient.newHttpClient();

        HttpResponse<String> response;
        try {
            response = client.send(request, HttpResponse.BodyHandlers.ofString()); //Send HTTP Request
        } catch (IOException | InterruptedException e) {
            throw new RuntimeException("Unable to request Cognito");
        }

        if (response.statusCode() != 200) {
            throw new RuntimeException("Authentication failed");
        }

        CognitoTokenResponseDto token;
        try {
            token = JSON_MAPPER.readValue(response.body(), CognitoTokenResponseDto.class); //Parse the JSON Response
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Unable to decode Cognito response");
        }

        return ResponseEntity.ok(new TokenDto(token.id_token()));
    }
}
