# ====================================================================
# STAGE 1: DEPENDENCIES ARTIFACT NODE
# ====================================================================
FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copy lockfiles to fetch precise cached layers
COPY package.json package-lock.json* pnpm-lock.yaml* yarn.lock* ./
RUN \
  if [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i --frozen-lockfile; \
  elif [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  else echo "No lockfile found. Falling back to default npm install." && npm install; \
  fi

# ====================================================================
# STAGE 2: HIGH-COMPRESSION COMPILATION BUILDER
# ====================================================================
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Next.js collects completely anonymous telemetry data during builds. Disabling it speeds up execution.
ENV NEXT_TELEMETRY_DISABLED=1

RUN \
  if [ -f package-lock.json ]; then npm run build; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm run build; \
  elif [ -f yarn.lock ]; then yarn build; \
  else npm run build; \
  fi

# ====================================================================
# STAGE 3: MINIMALIST PRODUCTION RUNTIME ENGINE
# ====================================================================
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Secure the container environment by creating a non-privileged system user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Set up the correct storage routing directory permissions for Next.js standalone file-tracing
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Pull in the standalone server assets isolated in Stage 2
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Execute the self-contained Next.js server node loop
CMD ["node", "server.js"]