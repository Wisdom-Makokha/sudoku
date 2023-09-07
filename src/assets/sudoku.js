class Sudoku{

    constructor(size, difficulty){
        this.size = size;
        this.difficulty = difficulty;

        const sqsize = Math.sqrt(size);
        this.squaresize = Math.floor(sqsize);

        this.sudokugrid = Array.from({length: size}, () => Array.from({length: size}, () => 0));
    }

    

    createboard()
    {
        for(let i = 0; i < 3; i++)
            this.fillsquare(i * 3, i * 3);

        this.solve(0, 0);        
        this.removedigits();
    }

    checkinrow(row, number)
    {
        for(let i = 0; i < this.size; i++)
            if(number === this.sudokugrid[row][i])
            {
                // console.log("The number already exists in this row!!");
                return true;
            }

        return false;
    }

    checkincolumn(column, number)
    {
        for(let i = 0; i < this.size; i++)
            if(number === this.sudokugrid[i][column])
            {
                // console.log("The number already exists in this column");
                return true;
            }

        return false;
    }

    checkinsquare(row, column, number)
    {
        let rowstart = row - (row % 3);
        let columnstart = column - (column % 3);

        for(let i = 0; i < this.squaresize; i++)
        {
            for(let j = 0; j < this.squaresize; j++)
                if(this.sudokugrid[rowstart + i][columnstart + j] === number)
                {
                    // console.log("The number exists in this square!!");
                    return true;
                }
        }

        return false;
    }
    

    checkifsafe(row, column, number)
    {
        if(!this.checkinrow(row, number) &&
            !this.checkincolumn(column, number) &&
                !this.checkinsquare(row, column, number))
            return true;
        else
        {
            // console.log("The number is not safe");
            return false;
        }
    }

    fillsquare(rowstart, columnstart)
    {
        let probabilitycheck = Array.from({length: this.size}, ()=> 1);
        let foundcount = 0;
        let number;
        let issafe;


        for(let i = 0; i < this.squaresize; i++)
        {
            for(let j = 0; j < this.squaresize; j++)
            {
                do
                {
                    number = this.randomnumber(true, probabilitycheck);
                    issafe = this.checkifsafe(rowstart + i, columnstart + j, number);
                } while(!issafe && foundcount != 8);

                foundcount++;
                this.sudokugrid[rowstart + i][columnstart + j] = number;
            }
        }
    }

    randomnumber(limit, probabilitycheck)
    {
        let selectnum;
        let maxnum = 0;
        
        let offset = Array.from({length: this.size}, ()=> 1);

        for(let i = 0; i < this.size; i++)
            offset[i] = Math.random() * probabilitycheck[i];

        for(let i = 0; i < this.size; i++)
        {
            if(offset[i] > maxnum)
            {
                maxnum = offset[i];
                selectnum = i;
            }
        }

        if(limit)
            probabilitycheck[selectnum] = 0;

        return selectnum + 1;
    }

    removedigits()
    {
        let probabilitycheck = Array.from({length: this.size}, ()=> 1);

        while(this.difficulty != 0)
        {
            let row;
            let col;

            row = (this.randomnumber(false, probabilitycheck)) - 1;
            col = (this.randomnumber(false, probabilitycheck)) - 1;

            if(this.sudokugrid[row][col] != 0)
            {
                this.difficulty--;
                this.sudokugrid[row][col] = 0;
            }
        }
    }

    solve(row, column)
    {
        if(row === this.size - 1 && column === this.size)
            return 1;

        if(column == this.size)
        {
            row++;
            column = 0;
        }

        if(this.sudokugrid[row][column] != 0)
            return this.solve(row, column + 1);

        for(let number = 0; number < this.size; number++)
        {
            if(this.checkifsafe(row, column, number + 1))
            {
                this.sudokugrid[row][column] = number + 1;

                if(this.solve(row, column + 1) === 1)
                    return 1;
            }

            this.sudokugrid[row][column] = 0;
        }

        return 0;
    }

    printgrid()
    {
        for(let i = 0; i < this.size; i++)
            console.log(this.sudokugrid[i].join(" "));
    }
}

export default Sudoku;