---
title: Authentication
tags: [tech-stack, web-development, security, identity, auth]
---

## Overview
Authentication is the process of verifying the identity of a user, device, or system before granting access to resources. It is a fundamental part of [[notes/Web Development]] and security practices.

## Common Methods
- **Password-based**: Users log in with a username and password.  
- **Token-based ([[notes/JWT]], OAuth2)**: Issues tokens for session management and [[notes/API]] access.  
- **Session-based**: Uses cookies and server-side sessions to track authentication.  
- **Multi-Factor Authentication (MFA)**: Adds additional layers like OTP, biometrics, or hardware keys.  
- **Social Login**: Uses third-party identity providers like Google, GitHub, or Microsoft.  

## Key Concepts
- **Authorization vs Authentication**: Authentication verifies *who you are*, while authorization determines *what you can access*.  
- **Identity Providers (IdP)**: Services that manage user credentials and identities.  
- **Access Tokens & Refresh Tokens**: Short-lived tokens for requests, with refresh tokens to extend sessions.  

## Use Cases
- Protecting restricted pages and resources.  
- Enabling user accounts and personalized experiences.  
- Securing APIs and backend services.  
- Implementing single sign-on (SSO) across apps.  

## Tools & Libraries
- **Frontend**: MSAL.js, Firebase Auth, NextAuth.js  
- **Backend**: Passport.js, Auth0, Keycloak  
- **Standards**: OAuth2, OpenID Connect, SAML  
