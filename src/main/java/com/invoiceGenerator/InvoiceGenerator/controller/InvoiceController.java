package com.invoiceGenerator.InvoiceGenerator.controller;

import com.invoiceGenerator.InvoiceGenerator.dto.SigninRequest;
import com.invoiceGenerator.InvoiceGenerator.dto.SignupRequest;
import com.invoiceGenerator.InvoiceGenerator.model.User;
import com.invoiceGenerator.InvoiceGenerator.reposiory.UserRepository;
import com.invoiceGenerator.InvoiceGenerator.service.EmailService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/invoice")
public class InvoiceController {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private EmailService emailService;

    // SIGN UP
    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody SignupRequest request) {
        // Check email
        if (userRepository.existsByEmail(request.getEmail())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Email already registered");
        }

        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPhoneNumber(request.getPhoneNumber());
        user.setAddress(request.getAddress());
        user.setBusinessName(request.getBusinessName());
        user.setProvider("LOCAL");

        // Account disabled until email verification
        user.setEnabled(false);
        // Encrypt password
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        // Generate unique User Code from Gmail
        String email = request.getEmail();
        String emailName = email.substring(0, email.indexOf("@"));
        String uniquePart = UUID.randomUUID().toString().substring(0, 8).toUpperCase();
        String userCode = emailName.toUpperCase() + "-" + uniquePart;
        user.setUserCode(userCode);
        // Generate 6-digit verification code
        String code = String.valueOf((int) (Math.random() * 900000) + 100000);
        user.setVerificationCode(code);
        // Save user
        userRepository.save(user);
        // Send verification code to email
        emailService.sendVerificationCode(user.getEmail(), code);

        return ResponseEntity.status(HttpStatus.CREATED).body("Signup successful. Check your email for a verification code.");
    }

    // SIGN IN
    @PostMapping("/signin")
    public ResponseEntity<?> signin(@RequestBody SigninRequest request) {

        User user = userRepository.findByEmail(request.getEmail()).orElse(null);

        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password");
        }

        // Check email verification
        if (!user.isEnabled()) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Please verify your email first");
        }
        // Check password
        boolean passwordMatch = passwordEncoder.matches(request.getPassword(), user.getPassword());

        if (!passwordMatch) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password");
        }
        if (!user.isEnabled()) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Please verify your email before signing in");
        }

        UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(user.getEmail(), null, List.of());

        SecurityContextHolder.getContext().setAuthentication(auth);

        return ResponseEntity.ok("Login successful");
    }
    @PostMapping("/verify")
    public ResponseEntity<?> verify(@RequestParam String email, @RequestParam String code) {
        User user = userRepository.findByEmail(email).orElse(null);

        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
        if (user.isEnabled()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Account already verified");
        }
        if (!code.equals(user.getVerificationCode())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid verification code");
        }

        user.setEnabled(true);
        user.setVerificationCode(null); // clear it, one-time use
        userRepository.save(user);
        return ResponseEntity.ok("Account verified successfully");
    }

    // OAUTH2 SUCCESS
    @GetMapping("/oauth2/success")
    public ResponseEntity<?> oauth2Success() {
        return ResponseEntity.ok("OAuth2 login successful");
    }
}