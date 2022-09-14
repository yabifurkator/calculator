const TelegramBotApi = require('node-telegram-bot-api');
const functions = require('./functions');

const token = '5798021649:AAFJIMGU2de9qvkHJrflMfhzLrlIVaxZVUM';
const bot = new TelegramBotApi(token, {polling: true});

bot.on('text', (msg) => {
    const text = msg.text;
    const chat_id = msg.chat.id;

    if (!functions.validate_text(text)) {
        console.log('hui');
        return;
    }
    const input = functions.convert_input(text.split(/\s+/));

    const country = input[0];
    const valuta = input[1];
    const one_item_price = input[2];
    const item_count = input[3];

    const invoice = one_item_price * item_count * 11;
    
    let plus = 0;
    if (country === 'к') {
        plus = 4900;
    }
    if (country === 'т') {
        plus = 3700;
    }
    const partia_na_granice = invoice + plus;

    let valuta_translate = 0;
    let valuta_string = '';
    if (valuta === 'д') {
        valuta_translate = 61;
        valuta_string = 'Доллар';
    }
    if (valuta === 'е') {
        valuta_translate = 61.5;
        valuta_string = 'Евро';
    }
    const tamoznya = partia_na_granice * 1.2 * valuta_translate;

    let country_string = '';
    if (country === 'к') {
        plus = 255000;
        country_string = 'Корея';
    }
    if (country === 'т') {
        country_string = 'Турция';
        plus = 194000;
    }
    const sebestoimost_rc = tamoznya + plus;
    const sebestoimost_edenici = sebestoimost_rc / item_count / 11;
    
    let output = '> Вы ввели\n' +
                 'Страна: ' + country_string + '\n' +
                 'Валюта: ' + valuta_string + '\n' +
                 'Цена (в валюте): ' + one_item_price + '\n' +
                 'Количество на паллете: ' + item_count + '\n\n' +
                 '> Расчёты\n' +
                 'Стоимость по инвойсу (в валюте): ' + invoice + '\n' +
                 'Стоимость партии на границе (в валюте): ' + partia_na_granice + '\n' +
                 'Таможенная стоимость (в рублях): ' + tamoznya + '\n' +
                 'Себестоимость на РЦ (в рублях): ' + sebestoimost_rc + '\n' +
                 'Себестоимость единицы на РЦ (в рублях): ' + sebestoimost_edenici; 
    
    bot.sendMessage(chat_id, output);
    console.log(invoice, partia_na_granice, tamoznya, sebestoimost_rc, sebestoimost_edenici);
    
});
