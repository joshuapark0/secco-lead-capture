# Secco Lead Capture Page

A full-stack lead capture application built with Next.js (App Router), Supabase, and Tailwind CSS.

## Features

- Lead submission form with validation
- Server-side data persistence using Supabase
- Webhook integration for external notifications
- Error handling (duplicate emails, webhook failures)
- Leads dashboard displaying submitted entries
- Responsive UI with basic styling

## Tech Stack

- Next.js (App Router, Server Actions)
- TypeScript
- Tailwind CSS
- Supabase (PostgreSQL)

## Setup Instructions

1. Clone the repo:
```bash
  git clone https://github.com/YOUR_USERNAME/secco-lead-capture.git
  cd secco-lead-capture
```
2. Install dependencies:

```bash
  npm install
```
3. Create a .env.local file in the root directory:

  SUPABASE_URL=your_supabase_url
  SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
  CANDIDATE_NAME=Your Name
  WEBHOOK_URL=https://webhook-receiver-flax.vercel.app/api/lead-webhook

5. Run the development server:
```bash  
  npm run dev
```
Then Open:
  http://localhost:3000

Run the following SQL in Supabase:
```bash
create table leads (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null unique,
  company text,
  source text not null,
  message text,
  created_at timestamptz default now()
);

alter table leads enable row level security;

```
