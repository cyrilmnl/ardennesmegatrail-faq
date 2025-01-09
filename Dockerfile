FROM node:22.9-alpine AS builder

WORKDIR /app

ARG VITE_SUPABASE_URL
ARG VITE_SUPABASE_ANON_KEY
ENV VITE_SUPABASE_URL=${VITE_SUPABASE_URL}
ENV VITE_SUPABASE_ANON_KEY=${VITE_SUPABASE_ANON_KEY}

COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:22.9-alpine AS production

WORKDIR /app
RUN npm install -g serve
RUN mkdir -p /app/public

COPY --from=builder /app/dist /app/public/

RUN echo '<!DOCTYPE html>\
<html>\
<head>\
    <meta charset="UTF-8" />\
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />\
    <title>Ardennes Megatrail FAQ</title>\
    <link rel="stylesheet" href="/ardennesmegatrail-faq.css" />\
</head>\
<body>\
    <ardennesmegatrail-faq></ardennesmegatrail-faq>\
    <script type="module" src="/ardennesmegatrail-faq.es.js"></script>\
</body>\
</html>' > /app/public/index.html

EXPOSE 3000
CMD ["serve", "-s", "public", "-l", "3000"]
