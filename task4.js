const { table } = require('console');
const { generateKey } = require('crypto');


let menu_items = "1 - rock\n2 - paper\n3 - scissors\n4 - lizard\n5 - Spock\n0 - exit\n? - help\n Enter your move:";

let mid_value = 3;

let user_win_message = "You win";
let pc_win_message = "Computer Win";
let draw_message = "Draw";
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


class Computer {
    choise = GenerateComputerStep();
    hmac = 
    _max = 5;
    _min = 1;
    MakeChoise(params) {
        this.choise = Math.floor(Math.random() * (max - min + 1)) + min;
    }

};

let mykey = require('randomatic');

class GenKey {

    constructor(mykey) {
        this.mykey = mykey;
    }

    GenerateKey() {

        mykey = mykey('Aa0!', 128);
        mykey = Buffer.from(mykey).toString('hex');
    }
}

value = new GenKey();



computer_step = GenerateComputerStep();

class GenHmac {

    constructor() {

        this.mykey = value.GenerateKey();
    }

    DoHmac() {

        var hmac = require('crypto').createHmac('SHA3-256', mykey).update(computer_step + '').digest('hex');
        console.log('hmac:' + hmac);

    }
}

hmac = new GenHmac();




//returns -1 for left won, 1 for right won or 0 for draw
function CompareChoice(left, right) {
    let diff = left - right;

    if (Math.abs(diff) >= mid_value) {
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

class TabHelp {
    help_result_table = {
        '1': 'Lose',
        '-1': 'Win',
        '0': 'Draw'
    };


    constructor(rock, paper, spock, scissors, lizard) {
        rock = this.rock;
        paper = this.paper;
        spock = this.spock;
        scissors = this.scissors;
        lizard = this.lizard;
    }

    callHelp() {


        let formated_table = {};
        for (const left in choose_table) {
            formated_table[choose_table[left]] = {}
            for (const right in choose_table) {
                let result = CompareChoice(left, right);
                formated_table[choose_table[left]][choose_table[right]] = this.help_result_table[result];
            }
        }
        console.log('rows for player | columns for computer');
        console.table(formated_table);
    }
}

tab = new TabHelp();


class WinLose {

    compareChoice(user, pc) {
        let diff = user - pc

        let result = CompareChoice(user, pc)

        if (result == -1) {
            return user_win_message;
        }
        if (result == 1) {
            return pc_win_message
        }
        return draw_message
    }
}

res = new WinLose();


//console.log(menu_items);



readline.on('line', (user_input) => {
    if (user_input == '0') {
        readline.close();
        return
    }
    if (user_input == '?') {
        tab.callHelp();
        console.log(menu_items);
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
        console.log(err_prompt_message)
        return
    }


    console.log('Computer move: ' + choose_table[computer_step]);
    console.log('Your move: ' + choose_table[user_choose]);

    let result = res.compareChoice(user_input, computer_step)

    console.log(result)
    console.log('key:' + mykey);


});

hmac.DoHmac();
console.log(menu_items);



