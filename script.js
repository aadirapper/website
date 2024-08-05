document.addEventListener('DOMContentLoaded', () => {
    const rows = document.querySelectorAll('.row');
    let currentPlayer = 'x';
    let gameBoard = Array.from(Array(6), () => Array(7).fill(null));

    function checkWin(player) {
        // Check horizontal, vertical, and diagonal lines for a win
        // This is a simplified version; full implementation required
        return false;
    }

    function handleClick(event) {
        if (!event.target.classList.contains('cell')) return;
        const cell = event.target;
        const rowIndex = Array.from(cell.parentNode.parentNode.children).indexOf(cell.parentNode);
        const colIndex = Array.from(cell.parentNode.children).indexOf(cell);

        if (gameBoard[rowIndex][colIndex] !== null) return;

        gameBoard[rowIndex][colIndex] = currentPlayer;
        cell.classList.add(currentPlayer);
        if (checkWin(currentPlayer)) {
            document.getElementById('message').textContent = `${currentPlayer.toUpperCase()} wins!`;
            return;
        }

        currentPlayer = currentPlayer === 'x' ? 'o' : 'x';
    }

    function resetGame() {
        gameBoard = Array.from(Array(6), () => Array(7).fill(null));
        currentPlayer = 'x';
        document.querySelectorAll('.cell').forEach(cell => {
            cell.classList.remove('x', 'o');
        });
        document.getElementById('message').textContent = '';
    }

    rows.forEach(row => row.addEventListener('click', handleClick));
    document.getElementById('reset-button').addEventListener('click', resetGame);
});
