class Sudoku {

    //contructor
    constructor(size, difficulty) {
        this.size = size;
        this.difficulty = difficulty;

        const sqsize = Math.sqrt(size);
        this.squaresize = Math.floor(sqsize);

        this.sudokugrid = Array.from({length: size}, () => Array.from({length: size}, () => 0));
        // this.completegrid = Array.from({length: size}, () => Array.from({length: size}, () => 0));
    }

    //function to create a board
    //it fills three squares diagonally to avoid contradicting sudoku rules as much as possible
    //fills the remainder using the solve function
    //removes a random number of digits to create the puzzle
    createboard() {
        for (let i = 0; i < 3; i++)
            this.fillsquare(i * 3, i * 3);

        this.solve(0, 0);
        this.removedigits();
        this.removezeroes();
    }

    //checks if the number is compatible in row
    //returns true if the number already exists in the row and false if otherwise
    checkinrow(row, number) {
        for (let i = 0; i < this.size; i++)
            if (number === this.sudokugrid[row][i]) {
                // console.log("The number already exists in this row!!");
                return true;
            }

        return false;
    }

    //checks if the number is compatible in column
    //returns true if the number already exists in column and false if otherwise
    checkincolumn(column, number) {
        for (let i = 0; i < this.size; i++)
            if (number === this.sudokugrid[i][column]) {
                // console.log("The number already exists in this column");
                return true;
            }

        return false;
    }

    //checks if the number is compatible in square
    //returns true if the number is in the
    checkinsquare(row, column, number) {
        let rowstart = row - (row % 3);
        let columnstart = column - (column % 3);

        for (let i = 0; i < this.squaresize; i++) {
            for (let j = 0; j < this.squaresize; j++)
                if (this.sudokugrid[rowstart + i][columnstart + j] === number) {
                    // console.log("The number exists in this square!!");
                    return true;
                }
        }

        return false;
    }


    ////checks if the number is compatible in row, column and square
    //returns true if the number is not in row, column or square and false if otherwise
    checkifsafe(row, column, number) {
        if (!this.checkinrow(row, number) &&
            !this.checkincolumn(column, number) &&
            !this.checkinsquare(row, column, number))
            return true;
        else {
            // console.log("The number is not safe");
            return false;
        }
    }

    //this function fills an entire square in the grid
    fillsquare(rowstart, columnstart) {
        let probabilitycheck = Array.from({ length: this.size }, () => 1);
        let foundcount = 0;
        let number;
        let issafe;


        for (let i = 0; i < this.squaresize; i++) {
            for (let j = 0; j < this.squaresize; j++) {
                do {
                    number = this.randomnumber(true, probabilitycheck);
                    issafe = this.checkifsafe(rowstart + i, columnstart + j, number);
                } while (!issafe && foundcount != 8);

                foundcount++;
                this.sudokugrid[rowstart + i][columnstart + j] = number;
            }
        }
    }

    //this function returns a randomnumber between 1 and 9
    //when limit is true any selected numbers are not selected again
    randomnumber(limit, probabilitycheck) {
        let selectnum;
        let maxnum = 0;

        let offset = Array.from({ length: this.size }, () => 1);

        for (let i = 0; i < this.size; i++)
            offset[i] = Math.random() * probabilitycheck[i];

        for (let i = 0; i < this.size; i++) {
            if (offset[i] > maxnum) {
                maxnum = offset[i];
                selectnum = i;
            }
        }

        if (limit)
            probabilitycheck[selectnum] = 0;

        return selectnum + 1;
    }

    //this is used to set the difficulty of the board
    removedigits() {
        let probabilitycheck = Array.from({ length: this.size }, () => 1);

        while (this.difficulty != 0) {
            let row;
            let col;

            row = (this.randomnumber(false, probabilitycheck)) - 1;
            col = (this.randomnumber(false, probabilitycheck)) - 1;

            if (this.sudokugrid[row][col] != 0) {
                this.difficulty--;
                this.sudokugrid[row][col] = 0;
            }
        }
    }

    //recursive function that solves the grid to completion
    solve(row, column) {
        if (row === this.size - 1 && column === this.size)
            return 1;

        if (column == this.size) {
            row++;
            column = 0;
        }

        if (this.sudokugrid[row][column] != 0)
            return this.solve(row, column + 1);

        for (let number = 0; number < this.size; number++) {
            if (this.checkifsafe(row, column, number + 1)) {
                this.sudokugrid[row][column] = number + 1;

                if (this.solve(row, column + 1) === 1)
                    return 1;
            }

            this.sudokugrid[row][column] = 0;
        }

        return 0;
    }

    //function to convert a string received from the server to a grid, this is to resume an unfinished game
    stringtogrid(sudokustring)
    {
        let k = 0;
        for(let i = 0; i < this.size; i++)
            for(let j = 0; j < this.size; j++, k++)
                this.sudokugrid[i][j] = parseInt(sudokustring[k]);
    }

    //function to convert the current board into a string and send it to the server
    gridtostring()
    {
        let sudokustring = this.sudokugrid.toString();
        sudokustring = sudokustring.replaceAll(",", "");
        return sudokustring;
    }

    //console function to look at the grid
    printgrid(){
        for (let i = 0; i < this.size; i++)
            console.log(this.sudokugrid[i].join(" "));
    }

    //function to remove the zeroes that are in the grid converting them to undefined value for the blank space in the grid
    removezeroes(){
        for(let i = 0; i < this.size; i++)
            for(let j = 0; j < this.size; j++)
                if(this.sudokugrid[i][j] === 0)
                    this.sudokugrid[i][j] = undefined;
    }

    checkassignmentvalid(row, column, number)
    {
        if(this.checkaxisvalid(row, column, number, true) &&
            this.checkaxisvalid(row, column, number, false) &&
                this.checksquarevalid(row, column, number))
                {
                    console.log("Point assignment is valid!!");
                    return true;
                }
        else
        {
            console.log("Point assignment not valid!!");
            return false;
        }
    }

    checkaxisvalid(row, column, number, rowmain)
    {
        if(rowmain === true)
        {
            for(let i = 0; i < this.size; i++)
            {
                if(column === i)
                    continue;

                if(number === this.sudokugrid[row][i])
                    return false;
            }

            console.log(number);

            return true;
        }
        else
        {
            for(let i = 0; i < this.size; i++)
            {
                if(row === i)
                    continue;

                if(number === this.sudokugrid[i][column])
                    return false;
            }

            console.log(number);

            return true;
        }
    }

    checksquarevalid(row, column, number)
    {
        let rowstart = row - (row % 3);
        let columnstart = column - (column % 3);

        for(let i = 0; i < this.squaresize; i++)
            for(let j = 0; j < this.squaresize; j++)
            {
                if((rowstart + i) === row && (columnstart + i) === column)
                    continue;

                if(number === this.sudokugrid[i][j])
                    return false;
            }

            console.log(number);

        return true;
    }
}

export default Sudoku;