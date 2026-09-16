package com.invoiceGenerator.InvoiceGenerator.security;


import com.invoiceGenerator.InvoiceGenerator.model.User;
import com.invoiceGenerator.InvoiceGenerator.reposiory.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class CustomOAuth2UserService extends DefaultOAuth2UserService{
    @Autowired
    private UserRepository userRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = super.loadUser(userRequest);

        String provider = userRequest.getClientRegistration().getRegistrationId(); // "google" or "facebook"
        Map<String, Object> attributes = oAuth2User.getAttributes();

        Object rawId = attributes.get("sub") != null ? attributes.get("sub") : attributes.get("id");
        String providerId = String.valueOf(rawId);
        String email = (String) attributes.get("email");
        String name = (String) attributes.get("name");

        if (email == null) {
            throw new OAuth2AuthenticationException("Email not provided by " + provider);
        }

        User user = userRepository.findByEmail(email).orElse(null);

        if (user == null) {
            user = new User();
            user.setEmail(email);
            user.setName(name);
            user.setProvider(provider.toUpperCase());
            user.setProviderId(providerId);
            user.setPassword(null);
            userRepository.save(user);
        } else if ("LOCAL".equals(user.getProvider()) && user.getProviderId() == null) {
            // Existing local-signup account sharing this email — link it to the OAuth provider
            user.setProvider(provider.toUpperCase());
            user.setProviderId(providerId);
            userRepository.save(user);
        }

        return oAuth2User;
    }
}
