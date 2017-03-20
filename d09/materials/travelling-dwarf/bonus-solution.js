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
 * Ensure the dwarf is not going backwards
 */
function goingBackwards() {
    return lastPositionCoordinates.x === nextSquareCoordinates.x && lastPositionCoordinates.y === nextSquareCoordinates.y ;
}

/**
 * Move the dwarf and increment the appropriate axis value
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
 * Move the dwarf forward based on its current orientation
 */
function nextSquare() {
    var newX = x,
        newY = y;

    switch( d.orientation ) {
        case "right":
            newX = Math.max( 0, x+1 );
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
 * Turn the dwarf counter-clockwise (because we are going left to right and don't want to go backwards) based on its current orientation
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

while( nextSquare() !== 'color green' ) {
    if ( goingBackwards() || typeof nextSquare() === 'string' ) {
        reOrient();
    }
    else {
        moveDwarf()
    }
}