package com.invoiceGenerator.InvoiceGenerator.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import jakarta.persistence.*;

@Entity
@Table(name = "users")
@JsonPropertyOrder({"id", "userCode", "name", "email", "phoneNumber", "address", "businessName", "provider"})
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    // Public unique user ID

    @Column(name = "userCode", unique = true, nullable = false)
    private String userCode;

    @Column(name = "userName")
    private String name;

    @Column(name = "userEmail")
    private String email;

    @JsonIgnore
    @Column(name = "userPassword", nullable = true)
    private String password;

    @Column(name = "PhoneNumber")
    private String phoneNumber;

    @Column(name = "address", nullable = true)
    private String address;

    @Column(name = "businessName", nullable = true)
    private String businessName;

    @Column(name = "provider")
    private String provider;

    @Column(name = "providerId")
    private String providerId;
    @Column(name = "verificationCode")
    private String verificationCode;

    @Column(name = "enabled")
    private boolean enabled = false; // account inactive until verified

    public User() {
    }

    public User(String name, String email, String password, String phoneNumber, String address, String businessName) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.phoneNumber = phoneNumber;
        this.address = address;
        this.businessName = businessName;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }
    public String getUserCode() {
        return userCode;

    }

    public void setUserCode(String userCode) {
        this.userCode = userCode;

    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getBusinessName() {
        return businessName;
    }

    public void setBusinessName(String businessName) {
        this.businessName = businessName;
    }

    public String getProvider() {
        return provider;
    }

    public void setProvider(String provider) {
        this.provider = provider;
    }

    public String getProviderId() {
        return providerId;
    }

    public void setProviderId(String providerId) {
        this.providerId = providerId;
    }
    public String getVerificationCode() {
        return verificationCode;
    }
    public void setVerificationCode(String verificationCode) {
        this.verificationCode = verificationCode;
    }

    public boolean isEnabled() {
        return enabled;
    }
    public void setEnabled(boolean enabled) {
        this.enabled = enabled;
    }
}