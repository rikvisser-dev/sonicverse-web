# Vercel Deployment Guide

## Prerequisites

1. Install [Node.js](https://nodejs.org/) (v18+ recommended)
2. Install dependencies: `npm install`

## Development

### Local Development

```bash
npm run dev
```

This starts the Next.js development server on `http://localhost:3000`.

## Vercel Deployments

This repository uses Vercel for deployment and preview system.

- Pull requests are automatically previewed by Vercel.
- The `main` branch is automatically deployed to production.

## Production Deployment

### Build for Production

```bash
npm run build
```

### Start Production Server Locally

```bash
npm run start
```

## Configuration

### Environment Variables

Configure environment variables in the Vercel Dashboard under Project Settings > Environment Variables.

Required variables:

- `EMAIL_SENDER`: The email address that sends inquiries (e.g., `noreply@mail.sonicverse.eu`).
- `EMAIL_RECIPIENT`: The email address that receives inquiries (e.g., `hello@sonicverse.eu`).
- `RESEND_API_KEY`: API key for the Resend email service.

Optional variables:

- `NEXT_PUBLIC_SITE_URL`: The public URL of the website.
- `NEXT_PUBLIC_IMAGE_WORKER_URL`: Custom URL for image processing if applicable.

## Troubleshooting

### Clean Build

```bash
npm run clean
npm install
npm run build
```

## Useful Commands

- `npm run dev` - Starts the Next.js development server
- `npm run build` - Builds the Next.js app for production
- `npm run start` - Starts the production server
- `npm run lint` - Run ESLint
- `npm run clean` - Clean build artifacts
