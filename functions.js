function validate_text(text) {
    const input = text.split(/\s+/);
    if (input.length !== 4) {
        return false;
    }

    const country = input[0].toLowerCase();
    const valuta = input[1].toLowerCase();
    const one_item_price = input[2];
    const item_count = Number(input[3]);

    if (country != 'к' && country != 'корея' &&
        country != 'т' && country != 'турция') {
        return false;
    }

    if (valuta != 'д' && valuta != 'доллар' &&
        valuta != 'е' && valuta != 'евро') {
        return false;
    }

    if (isNaN(one_item_price)) {
        return false;
    }

    if (!Number.isInteger(item_count) || item_count < 0) {
        return false;
    }

    return true;
}

function convert_input(input) {
    let input_converted = [];

    const country = input[0].toLowerCase()[0];
    const valuta = input[1].toLowerCase()[0];
    const one_item_price = Number(input[2]);
    const item_count = Number(input[3]);

    input_converted.push(country);
    input_converted.push(valuta);
    input_converted.push(one_item_price);
    input_converted.push(item_count);

    console.log(input_converted);
    return input_converted;
}

module.exports = {convert_input, validate_text};
