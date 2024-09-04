

function gameBoard(){
    let gameBoard = [
        [null, null, null],
        [null, null, null],
        [null, null, null]
    ];
    function validPlay(row, col){
        if (gameBoard[row][col] == null)
            return true
        else
            return false
    }
    function play(char, row, col){
        gameBoard[row][col] = char
    }
    function isWinner(char){
        if (gameBoard[0][0] == char && gameBoard[0][1] == char && gameBoard[0][2] == char
            || gameBoard[1][0] == char && gameBoard[1][1] == char && gameBoard[1][2] == char
            || gameBoard[2][0] == char && gameBoard[2][1] == char && gameBoard[2][2] == char           
            || gameBoard[0][0] == char && gameBoard[1][0] == char && gameBoard[2][0] == char
            || gameBoard[0][1] == char && gameBoard[1][1] == char && gameBoard[2][1] == char
            || gameBoard[0][2] == char && gameBoard[1][2] == char && gameBoard[2][2] == char
            || gameBoard[0][0] == char && gameBoard[1][1] == char && gameBoard[2][2] == char
            || gameBoard[0][2] == char && gameBoard[1][1] == char && gameBoard[2][0] == char 
            )
            return true;
        else
            return false;
    }
    function isTie(){
        if (gameBoard.some(row => row.includes(null)))
            return true;
        else
            return false;
    }
    function printBoard(){
        console.log(gameBoard);
    }

    return {play, isWinner, validPlay, isTie, printBoard};
}



const player = function(name){
    return {name};
}



function game(){

    const dom = DOM();
    let p1 = player("Player One");
    let p2 = player("Player Two");
    let isWinner = false;
    let gameboard = gameBoard();
    const instruction = document.querySelector("p");

    const playGame = function(){
        let turn = true;

        for (let i = 0; i < 9; i++){ // Max of 9 moves

            let char = turn ? 'X' : 'O';
            let player = turn ? p1 : p2;
            instruction.textContent = `${player.name}'s turn`;
            row = dom.getCoords().row;
            col = dom.getCoords().col;

            while (!gameboard.validPlay(row, col)){
                row = dom.getCoords().row;
                col = dom.getCoords().col;
            }

            gameboard.play(char, row, col);
            dom.writeCell(char, row, col);

            // If someone wins, stop game loop
            if (gameboard.isWinner(char)){
                console.log(player.name + "Wins");
                isWinner = true;
                break;
            }   
            turn = !turn
        }
        if (!isWinner){ // If moves are done, check if tie
            console.log("It's a tie!");
        }
    }
    return {playGame};
}

function DOM(){

    let row = null;
    let col = null;

    const cells = document.querySelectorAll('.cell');
    cells.forEach(element => {
        element.addEventListener("click", () =>{
            row = element.getAttribute('data-row');
            col = element.getAttribute('data-col');
        });
    });

    function getCoords(){
        while (row == null && col == null){
            console.log(row, col)
        }
        console.log(row, col)
        return {row, col};
    }

    function writeCell(char, row, col){
        const cell = document.querySelector(`div[data-row="${row}"][data-col="${col}"]`);
        cell.textContent = char
    }
    return {writeCell, getCoords}
}

let dom = DOM()
dom.getCoords();








const myGame = game();
//myGame.playGame();
