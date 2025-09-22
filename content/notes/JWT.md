---
title: JWT
tags: [jwt, authentication, security, web, token]
---
**JWT (JSON Web Token)** is an open standard (RFC 7519) used for securely transmitting information between parties as a JSON object. It is compact, URL-safe, and commonly used for authentication in [[notes/Web Development]] applications built with [[notes/JavaScript]].

## Structure
A JWT consists of three parts, separated by dots (`.`):  
1. **Header** – specifies the algorithm and token type  
2. **Payload** – contains claims (e.g., user ID, roles, expiration)  
3. **Signature** – verifies integrity and authenticity  

## Typical Usage
- User logs in and server generates a JWT signed with a secret.  
- The client stores the token (often in localStorage or cookies).  
- Each subsequent request includes the JWT (commonly in the `Authorization` header).  
- The server verifies the token’s signature and validity before processing.  

## Advantages
- Stateless authentication (no need for server-side sessions).  
- Portable and easy to integrate with APIs and SPAs.  

## Limitations
- Must be securely stored on the client (XSS can expose tokens).  
- Revocation is difficult without additional infrastructure.  

## Purpose
JWT simplifies **authentication and authorization** workflows in modern applications, making it a popular choice for APIs, [[notes/Next.js]] backends, and single-page applications like Quillify.