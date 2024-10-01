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

# Поддержите наш проект

Мы стремимся развивать наши проекты и поддерживать VPS сервер для их работы. Если вы хотите помочь, вы можете сделать пожертвование в криптовалюте.

## Как поддержать

Ваши донаты помогут нам покрыть расходы на сервер и развитие проекта. Мы принимаем следующие криптовалюты:

- **Bitcoin (BTC)**: `bc1q7phnhfv3veqny03sn3wdzmg7qufp3z05w9kv6s`
- **Ethereum (ETH)**: `-`
- **Litecoin (LTC)**: `LMietss16Bpgex8ATkgzmWbbYio5mcEAuw`
- **Tron (TRX)**: `TG2zE9WTKWrxwNRPMm1CS6BCSRNDeYEBYL`
- **Tether (USDT TRC20)**: `TFH9hmWS7pq5fmbgEYjsJTvegCt1C7zLax`
- **Tether (USDT ERC20)**: `-`
- **Bitcoin Cash (BCH)**: `bitcoincash:qztjnw0uqfg0fenk35hld0tu8qpy6a4djvh5pjquzh`
- **Dogecoin (DOGE)**: `DLKJvCY6YdJ3UfdKiefJRqj7in7qSjCdTG`
  
### Почему это важно?

Ваши пожертвования помогут нам:

- Поддерживать и обновлять наш VPS сервер.
- Разрабатывать новые функции и улучшения для проектов.
- Покрывать расходы на хостинг и другие нужды.

## Как сделать донат

1. Выберите криптовалюту, которую хотите отправить.
2. Используйте указанные адреса для перевода.
3. Вы можете указать, для какого проекта предназначен донат в сообщении.

## Спасибо за вашу поддержку!

Каждое пожертвование имеет значение и помогает нам расти. Если у вас есть вопросы или предложения, не стесняйтесь связаться с нами.

---

*Следите за обновлениями и новыми проектами на нашем GitHub!*
