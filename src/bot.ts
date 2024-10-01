import axios from 'axios';

const botToken = '7630795225:AAFjAUfyje4elU5TYVSyysiP1Bgv7xZ40w0';
const apiUrl = `https://api.telegram.org/bot${botToken}`;
const channelId = '-1002480930273';

// Функция для проверки подписки пользователя на канал
async function checkSubscription(userId: number): Promise<boolean> {
    const url = `${apiUrl}/getChatMember?chat_id=${channelId}&user_id=${userId}`;
    try {
        const response = await axios.get(url);
        const status = response.data.result.status;
        return status === 'member' || status === 'administrator' || status === 'creator';
    } catch (error) {
        console.error('Error checking subscription:', error);
        return false;
    }
}

// Функция для отправки сообщения
async function sendMessage(chatId: number, text: string, replyMarkup: any) {
    const url = `${apiUrl}/sendMessage`;
    const payload = {
        chat_id: chatId,
        text,
        reply_markup: replyMarkup,
    };
    await axios.post(url, payload);
}

// Функция для редактирования сообщения
async function editMessageReplyMarkup(chatId: number, messageId: number, replyMarkup: any) {
    const url = `${apiUrl}/editMessageReplyMarkup`;
    const payload = {
        chat_id: chatId,
        message_id: messageId,
        reply_markup: replyMarkup,
    };
    await axios.post(url, payload);
}

// Обработчик входящих сообщений
async function handleUpdate(update: any) {
	console.log("handleUpdate:", JSON.stringify(update, null, 2));
	
    if (update.message) {
        const chatId = update.message.chat.id;
        const options = {
            inline_keyboard: [
                [
                    { text: 'Подпишитесь на канал', url: 'https://t.me/SubscribeToTelegramChannel' },
                    { text: 'Проверить подписку', callback_data: 'check_subscription' },
                ],
            ],
        };
        await sendMessage(chatId, 'Подпишитесь на канал и нажмите "Проверить подписку"', options);
    } else if (update.callback_query) {
        const callbackQuery = update.callback_query;
        const message = callbackQuery.message;
        const chatId = message.chat.id;
        const userId = callbackQuery.from.id;

        if (callbackQuery.data === 'check_subscription') {
            const isSubscribed = await checkSubscription(userId);

            if (isSubscribed) {
                await sendMessage(chatId, 'Вы успешно подписаны на канал!', {});
            } else {
                await sendMessage(chatId, 'Вы не подписаны на канал. Пожалуйста, подпишитесь и попробуйте снова.', {});
            }

            await editMessageReplyMarkup(chatId, message.message_id, {
                inline_keyboard: [
                    [{ text: 'Проверить подписку', callback_data: 'check_subscription' }],
                ],
            });
        }
    }
}

import express, { Request, Response } from 'express';

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Hello, secure world!');
});

app.post('/webhook', async (req: Request, res: Response) => {
    const update = req.body;
	console.log("webhook:", JSON.stringify(update, null, 2));
	
    try {
        await handleUpdate(update);
        res.sendStatus(200);
    } catch (error) {
        console.error('Error handling update:', error);
        res.sendStatus(500);
    }
});

app.listen(PORT, async () => {
	await setWebhook();
	
    console.log(`Server is running on port ${PORT}`);
});

// Установка webhook для получения обновлений
async function setWebhook() {
    const webhookUrl = 'https://subscribetotelegramchannel.telegrambotsupport.ru/webhook';
    const url = `${apiUrl}/setWebhook`;
    const payload = {
        url: webhookUrl,
    };
    const res = await axios.post(url, payload);
	
	console.log("setWebhook:", JSON.stringify(res.data, null, 2));
}
