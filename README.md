SubscribeToTelegramChannelTypeScript

Subscribe To Telegram Channel TypeScript

-= NGINX =-

    location / {
        proxy_pass http://localhost:3000; # Порт, на котором работает приложение
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    location /webhook {
        proxy_pass http://localhost:3000/webhook; # Убедитесь, что вебхук работает
    }

npm run dev
