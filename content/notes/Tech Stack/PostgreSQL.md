---
title: PostgreSQL
date: 2025-10-08
tags: [postgresql, database, sql, backend, web]
---
**PostgreSQL** (often called **Postgres**) is a powerful, **[[notes/Tech Stack/SQL]] relational database** system known for its reliability, feature richness, and standards compliance. It’s widely used in [[notes/Web Development]] and enterprise-level applications where **data integrity**, **complex queries**, and **scalability** are essential.  

Website: [https://www.postgresql.org/](https://www.postgresql.org/)  

Unlike [[notes/Tech Stack/NoSQL]] databases like [[notes/Tech Stack/MongoDB]], PostgreSQL organizes data in **tables and rows** with a well-defined schema and supports **ACID transactions**, ensuring consistency and reliability. It integrates seamlessly with [[notes/Tech Stack/Node.js]], [[notes/Tech Stack/Express.js]], and ORMs like `Prisma` or `Sequelize`.

## Features
- **ACID Compliance**: Ensures data integrity through atomicity, consistency, isolation, and durability.  
- **Advanced Querying**: Powerful SQL support with complex joins, subqueries, and window functions.  
- **Data Types**: Supports a wide range including JSONB, arrays, UUIDs, and custom types.  
- **Extensions**: Highly extensible with modules like `PostGIS` for geospatial data or `pg_trgm` for text search.  
- **Performance Optimization**: Indexes, query planner, and caching improve query efficiency.  
- **Security**: Robust authentication, SSL, and role-based access control.  

## Usage Example
### Basic Table
```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(150) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
````

### Connecting with Node.js (using `pg`)

```javascript
import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const result = await pool.query(
  'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
  ['Ashwin', 'ashwin@example.com']
);

console.log(result.rows[0]);
```

## Advantages
* Strong data integrity and reliability with full ACID support
* Advanced SQL querying and indexing capabilities
* Excellent for analytical and transactional workloads
* JSONB support combines relational and NoSQL-style flexibility
* Widely supported across cloud platforms and ORMs

## Limitations
* More complex to scale horizontally compared to [[notes/Tech Stack/MongoDB]]
* Requires predefined schemas, making early development less flexible
* Slightly higher setup and maintenance overhead

## Purpose
PostgreSQL is ideal for **production-grade applications** that demand **data consistency**, **complex relationships**, and **strong transactional guarantees**.