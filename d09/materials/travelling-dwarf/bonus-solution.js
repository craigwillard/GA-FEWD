var x = 0,
    y = 0,
    lastPositionCoordinates = {
        x: 0,
        y: 0
    },
    nextSquareCoordinates = {
        x: -1,
        y: -1
    };

/**
 * Determines whether the dwarf's next move will take him backwards
 * @returns {boolean}
 */
function goingBackwards() {
    return lastPositionCoordinates.x === nextSquareCoordinates.x && lastPositionCoordinates.y === nextSquareCoordinates.y ;
}

/**
 * Move the dwarf and increment the appropriate axis variable's value
 */
function moveDwarf() {
    lastPositionCoordinates.x = x;
    lastPositionCoordinates.y = y;

    d.move();

    switch( d.orientation ) {
        case "right":
            x++;
            break;
        case "left":
            x--;
            break;
        case "up":
            y--;
            break;
        case "down":
            y++;
            break;
    }
}

/**
 * Determine the next square the dwarf will move to, based on its current orientation
 * @returns {string|number}
 */
function nextSquare() {
    var newX = x,
        newY = y;

    switch( d.orientation ) {
        case "right":
            newX = Math.max( 0, x+1 ); // the app will throw an error if we try to move to a negative value, so ensure we don't by rounding to zero
            break;
        case "left":
            newX = Math.max( 0, x-1 );
            break;
        case "up":
            newY = Math.max( 0, y-1 );
            break;
        case "down":
            newY = Math.max( 0, y+1 );
            break;
    }

    nextSquareCoordinates.x = newX;
    nextSquareCoordinates.y = newY;

    return g.at( newX, newY );
}

/**
 * Turn the dwarf based on its current orientation, to be used if we encounter an obstacle
 */
function reOrient() {
    switch( d.orientation ) {
        case "right":
            d.orient('up');
            break;
        case "left":
            d.orient('down');
            break;
        case "up":
            d.orient('left');
            break;
        case "down":
            d.orient('right');
            break;
    }
}

// Keep going until we are adjacent to the green square
while( nextSquare() !== 'color green' ) {
    if ( goingBackwards() || typeof nextSquare() === 'string' ) {
        reOrient();
    }
    else {
        moveDwarf()
    }
}