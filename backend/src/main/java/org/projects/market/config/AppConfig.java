package org.projects.market.config;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;

import java.util.Arrays;
import java.util.Collections;

@Configuration
@EnableWebSecurity
public class AppConfig {

    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.sessionManagement(management -> management.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(Authorize -> Authorize

                        // ── PUBLIC ──────────────────────────────────────────────────────────
                        .requestMatchers("/api/product/*/reviews").permitAll()
                        .requestMatchers("/auth/**").permitAll()           // signup, login, forgot/reset-password
                        .requestMatchers("/sellers/login", "/sellers").permitAll() // seller register & login

                        // ── ADMIN only ───────────────────────────────────────────────────────
                        .requestMatchers("/api/seller/*/status/*").hasAuthority("ROLE_ADMIN")

                        // ── SELLER only ──────────────────────────────────────────────────────
                        .requestMatchers("/api/seller/orders/**", "/api/seller/orders")
                        .hasAnyAuthority("ROLE_SELLER", "ROLE_ADMIN")
                        .requestMatchers("/seller/products/**", "/seller/products")
                        .hasAnyAuthority("ROLE_SELLER", "ROLE_ADMIN")
                        .requestMatchers("/sellers/profile").hasAnyAuthority("ROLE_SELLER", "ROLE_ADMIN")
                        .requestMatchers("/sellers/report").hasAnyAuthority("ROLE_SELLER", "ROLE_ADMIN")
                        .requestMatchers("/sellers/verify/**").hasAnyAuthority("ROLE_SELLER", "ROLE_ADMIN")

                        // ── All other /api/** require at least a valid login ─────────────────
                        .requestMatchers("/api/**").authenticated()

                        .anyRequest().permitAll())
                .addFilterBefore(new JwtTokenValidator(), BasicAuthenticationFilter.class)
                .csrf(csrf -> csrf.disable())
                .cors(cors -> cors.configurationSource(corsConfigurationSource()));

        return http.build();
    }

    private CorsConfigurationSource corsConfigurationSource() {
        return new CorsConfigurationSource() {
            @Override
            public CorsConfiguration getCorsConfiguration(HttpServletRequest request) {
                CorsConfiguration cfg = new CorsConfiguration();
                cfg.setAllowedOriginPatterns(Collections.singletonList("*")); // spring introduced this method to url
                                                                              // dynamically in url like
                                                                              // "https://*.example.com" where * will be
                                                                              // replaced by any domain name. But here
                                                                              // what we have written is not recommended
                                                                              // for production purpose.
                // cfg.setAllowedOrigins(Collections.singletonList("http://localhost:5173"));
                // //this is allowed to use.
                // cfg.setAllowedOrigins(Collections.singletonList("*")); //you cannot use *
                // when you are using allowCredentials(true) because browser dont allow to use *
                // where credentials are allow to pass in header, if used then it will kill the
                // request.
                cfg.setAllowedMethods(Collections.singletonList("*"));
                cfg.setAllowCredentials(true);
                cfg.setAllowedHeaders(Collections.singletonList("*"));
                cfg.setExposedHeaders(Arrays.asList("Authorization"));
                cfg.setMaxAge(3600L);
                return cfg;
            }
        };
    }

    @Bean
    PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
