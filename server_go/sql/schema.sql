create table accounts (
  id varchar not null PRIMARY KEY,
  first_name varchar not null,
  last_name varchar not null,
  email varchar not null unique,
  password varchar not null,
  password_salt varchar,
  verified boolean not null DEFAULT false,
  verified_token varchar not null DEFAULT '',
  two_factor_auth varchar,
  last_ip_login varchar,
  current_ip_login varchar,
  sign_in_count int not null DEFAULT 0,
  failed_attempts int not null DEFAULT 0,
  unlock_token varchar,
  locked boolean not null DEFAULT false,
  locked_at date,
  profile jsonb not null default '{}'::jsonb,
  created_at date not null DEFAULT NOW(),
  updated_at date not null DEFAULT NOW()
);

create type node_status_type as enum('OFFLINE', 'ONLINE', 'ERROR', 'UPGRADING', 'PENDING');

drop type node_status_type;

create table nodes (
  id varchar not null PRIMARY KEY,
  account_id varchar not null,
  node_name varchar not null,
  seen_last_at timestamp,
  node_status smallint not null DEFAULT 0,
  created_at timestamp not null DEFAULT NOW(),
  updated_at timestamp not null DEFAULT NOW()
);

ALTER TABLE nodes ADD CONSTRAINT fk_nodes_accounts FOREIGN KEY(account_id) REFERENCES accounts(id);



create type build_status_type as enum('SCHEDULED', 'PENDING', 'BUILDING', 'FAILED', 'SUCESSS');

create table builds (
  id varchar not null PRIMARY KEY,
  node_id varchar not null,
  build_hash varchar not null,
  build_path varchar not null,
  configs jsonb not null default '{}'::jsonb,
  created_at date not null DEFAULT NOW(),
  updated_at date not null DEFAULT NOW()
);
