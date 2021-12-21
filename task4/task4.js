
let randomatic = require('randomatic');
let crypto = require('crypto');
const { argv } = require('process');


let menu_items = "1 - rock\n2 - paper\n3 - scissors\n4 - lizard\n5 - Spock\n0 - exit\n? - help\n Enter your move:";
let err_prompt_message = "Wrong input";

var readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

let choose_table = {
    1: 'rock',
    2: 'paper',
    3: 'scissors',
    4: 'lizard',
    5: 'spock',
};


class HmacKey {
    value;
    constructor() {
        let source = randomatic('Aa0!', 128);
        this.value = Buffer.from(source).toString('hex');
    }
}

class Hmac {
    value;
    key;

    constructor(value) {
        this.key = new HmacKey();
        this.value = crypto.createHmac('SHA3-256', this.key.value).update(value + '').digest('hex');
    }
}

class Computer {
    choise;
    hmac;
    #max = 5;
    #min = 1;

    constructor() {
        this.MakeChoise();
    }
    MakeChoise() {
        this.choise = Math.floor(Math.random() * (this.#max - this.#min + 1)) + this.#min;
        this.hmac = new Hmac(this.choise);
    }
};

computer_player = new Computer();

class Game {
    //returns -1 for left won, 1 for right won or 0 for draw
    static #mid_value = 3;
    static Compare(left, right) {
        let diff = left - right;

        if (Math.abs(diff) >= this.#mid_value) {
            if (diff > 0) {
                return 1;
            }
            return -1
        }

        if (diff < 0) {
            return 1
        }

        if (diff > 0) {
            return -1
        }

        return 0
    }
}

class TabHelp {
    #help_result_table = {
        '1': 'Lose',
        '-1': 'Win',
        '0': 'Draw'
    };

    CallHelp() {
        let formated_table = {};
        for (const left in choose_table) {
            formated_table[choose_table[left]] = {}
            for (const right in choose_table) {
                let result = Game.Compare(left, right);
                formated_table[choose_table[left]][choose_table[right]] = this.#help_result_table[result];
            }
        }
        console.log('rows for player | columns for computer');
        console.table(formated_table);
    }
}

class MessageProvider {
    static #user_win_message = "You win";
    static #pc_win_message = "Computer Win";
    static #draw_message = "Draw";

    static #help = new TabHelp();
    static PrintWinner(user, pc) {
        let result = Game.Compare(user, pc)

        if (result == -1) {
            console.log(this.#user_win_message);
        }
        if (result == 1) {
            console.log(this.#pc_win_message);
        }
        if (result == 0) {
            console.log(this.#draw_message);
        }

    }

    static PrintHelp() {
        this.#help.CallHelp();
    }

    static PrintMenu() {
        console.log(menu_items);
    }

    static PrintError() {
        console.log(err_prompt_message)
    }

    static PrintComputerHMAC() {
        console.log("Compuuter HMAC: " + computer_player.hmac.value);
    }

    static PrintComputerKey() {
        console.log("Computer Key: " + computer_player.hmac.key.value);
    }

    static PrintGameResult(computer_step, user_choose) {
        console.log('Computer move: ' + choose_table[computer_step]);
        console.log('Your move: ' + choose_table[user_choose]);

        console.log()
        this.PrintWinner(user_choose, computer_step);
        this.PrintComputerKey();
    }

    static PrintGameStart() {
        console.log('--Task 4--');

        computer_player.MakeChoise();

        this.PrintComputerHMAC();
        this.PrintMenu();
    }

    static ProcessGameInput(user_input) {

        this.process = require('process');

        if (user_input == '0') {
            readline.close();
            return
        }
        if (user_input == '?') {
            MessageProvider.PrintHelp()
            return
        }

        let user_choose = '';
        for (const el in choose_table) {
            if (user_input == el || user_input == choose_table[el]) {
                user_choose = el;
                break;
            }
        }

        if (user_choose == '') {
            MessageProvider.PrintError()
            return
        }

        this.PrintGameResult(computer_player.choise, user_choose);
        computer_player.MakeChoise();
    }

}



if (process.argv.length >= 4) {
    for (let i = 2; i < process.argv.length; i++) {
        console.log(" Game #", i - 1)

        MessageProvider.PrintComputerHMAC();
        MessageProvider.ProcessGameInput(process.argv[i]);
    }
    readline.close();
} else {
    readline.on('line', (user_input) => {
        MessageProvider.ProcessGameInput(user_input);

        console.log('------------');

        MessageProvider.PrintComputerHMAC();
        MessageProvider.PrintMenu();

    });
    MessageProvider.PrintGameStart()
}

