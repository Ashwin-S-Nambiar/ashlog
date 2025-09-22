---
title: NoSQL
tags: [nosql, database, web, backend, data]
---
**NoSQL** databases are **non-relational databases** that store and retrieve data in flexible formats, such as key-value pairs, documents, wide-column stores, or graphs. They are commonly used in [[notes/Web Development]] when scalability and schema flexibility are priorities.

## Characteristics
- **Schema-less or flexible schema**: No predefined structure is required.  
- **Horizontal scalability**: Designed for distributed clusters and large-scale applications.  
- **Data Models**: Document-oriented (e.g., [[notes/MongoDB]]), key-value, graph, or wide-column.  
- **High performance**: Optimized for read/write-heavy applications.  

## Advantages
- Rapid iteration due to schema flexibility.  
- Handles large volumes of unstructured or semi-structured data.  
- Scales easily across multiple servers.  
- Ideal for applications like social media platforms, blogs, or real-time analytics.  

## Limitations
- Weaker support for complex joins and transactions compared to SQL.  
- Data consistency can vary depending on database type (eventual consistency).  
- Requires careful planning to avoid unstructured, inconsistent data.  

## Purpose
NoSQL databases are best suited for **modern, distributed applications** where rapid scaling and flexible data structures are critical. Example: [[projects/Quillify]] uses MongoDB, a document-oriented NoSQL database.
