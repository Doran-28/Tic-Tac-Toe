

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

    return {play, isWinner, validPlay};
}

const player = function(name){
    return {name};
}

function game(){
    p1 = player("PlayerOne");
    p2 = player("PlayerTwo");
    const gameBoard = gameBoard();

    const playGame = function(){
        let turn = true;
        while (true){
            let row = promt("Enter row");
            let col = promt("Enter col");
            let char = turn ? 'X' : 'O';
            let player = turn ? p1 : p2;

            if (gameBoard.validPlay())
                gameBoard.play(char, row, col)
            else{
                row = promt("Enter row");
                col = promt("Enter col");
            }

            if (gameBoard.isWinner()){
                console.log(player)
            }
            if (gameBoard.isTie()){
                
            }
        



            turn = !turn
        }
    }


}
