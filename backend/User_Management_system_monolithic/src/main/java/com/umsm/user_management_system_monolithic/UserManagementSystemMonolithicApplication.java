package com.umsm.user_management_system_monolithic;

import org.modelmapper.ModelMapper;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class UserManagementSystemMonolithicApplication {

	public static void main(String[] args) {
		SpringApplication.run(UserManagementSystemMonolithicApplication.class, args);
	}

	@Bean
	public ModelMapper modelMapper() {
		return new ModelMapper();
	}
}
