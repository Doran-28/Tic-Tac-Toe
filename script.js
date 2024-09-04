

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

    const playGame = async function(){
        let turn = true;

        for (let i = 0; i < 9; i++){ // Max of 9 moves

            let char = turn ? 'X' : 'O';
            let player = turn ? p1 : p2;
            instruction.textContent = `${player.name}'s turn`;
            coords = await dom.getCoords();
            let row = coords.row;
            let col = coords.col;

            while (!gameboard.validPlay(row, col)){
                coords = await dom.getCoords();
                row = coords.row;
                col = coords.col;
            }

            gameboard.play(char, row, col);
            dom.writeCell(char, row, col);

            // If someone wins, stop game loop
            if (gameboard.isWinner(char)){
                console.log(player.name + " Wins");
                isWinner = true;
                instruction.textContent = `${player.name} Wins`;
                break;
            }   
            turn = !turn
        }
        if (!isWinner){ // If moves are done, check if tie
            console.log("It's a tie!");
            instruction.textContent = "It's a tie!";
        }
    }
    return {playGame};
}

function DOM(){


    function waitForClick() {
        return new Promise((resolve) => {
            const cells = document.querySelectorAll('.cell');
            cells.forEach(element => {
                element.addEventListener("click", () => {
                    const row = element.getAttribute('data-row');
                    const col = element.getAttribute('data-col');
                    resolve({ row, col }); // Resolve the promise with the coordinates
                }, { once: true });
            });
        });
    }

    async function getCoords(){
        let coords = await waitForClick();
        console.log(coords)
        return coords;
    }

    function writeCell(char, row, col){
        const cell = document.querySelector(`div[data-row="${row}"][data-col="${col}"]`);
        cell.textContent = char
    }
    return {writeCell, getCoords}
}







const myGame = game();
myGame.playGame();
