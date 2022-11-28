
function returnObject (index) {
  var i = parseInt(index)
  const rows = 10;
  const columns = 10;
  const size = rows * columns;

  if (index === 0) {
    // No top left - top, top right, left, bottom left values
    return {
        right: i + 1,
        bottom: (i + rows),
        bottomRight: (i + rows) + 1
    }
  } else if (index % 10 === 0 && index !== 90) {
    // no top left, left, bottom left
    return {
        top: (i - rows),
        topright: (i - rows) + 1,
        right: i + 1,
        bottom: (i + rows),
        bottomRight: (i + rows) + 1
    }

  } else if (index > 0 && index < 9) {
    // no top values
    return {
        left: i - 1,
        right: i + 1,
        bottomLeft: (i + rows) - 1,
        bottom: (i + rows),
        bottomRight: (i + rows) + 1
    }
  } else if (index === 9) {
    // No top top right right bottom right values
    return {
        left: i - 1,
        bottomLeft: (i + rows) - 1,
        bottom: (i + rows)
    }
  }  else if (index % 10 === 9 && index !== 99 && index !== 9) {
    // no top right, right, bottom right
    return {
      left: i - 1,
      bottomLeft: (i + rows) - 1,
      bottom: (i + rows),
      topleft: (i - rows) - 1,
      top: (i - rows)
    }
  } else if (index === 90) {
    // no top left, left, bottom left bottom bottom right
    return  {
          top: (i - rows),
          topright: (i - rows) + 1,
          right: i + 1
      }
  } else if (index > 90 && index < 99) {
    // no bottom left, bottom && bottom right
    return {
        topleft: (i - rows) - 1,
        top: (i - rows),
        topright: (i - rows) + 1,
        left: i - 1,
        right: i + 1
    }
  } else if (index === 99) {
    // no bottom left, bottom, bottom right, right, top right
      return {
          topleft: (i - rows) - 1,
          top: (i - rows),
          left: i - 1
      }
  } else {
    return {
        left: i - 1,
        right: i + 1,
        bottomLeft: (i + rows) - 1,
        bottom: (i + rows),
        bottomRight: (i + rows) + 1,
        topleft: (i - rows) - 1,
        top: (i - rows),
        topright: (i - rows) + 1
    }
  }

}



function findSurroundingCells(int) {
    var surroundingCells = returnObject(int);
    return surroundingCells
}

function getCellsArray(element) {

    // Active and inactive cells
    var cells = findSurroundingCells(element);
    // Takes the object with all the positions and transforms it into an array

  var getKeys = function(obj){
   var keys = [];
   for(var key in obj){
      keys.push(obj[key]);
   }
   return keys;
}
    // Return the array
    return getKeys(cells);

}

function compareLiveAndDead(index, currentState) {

    var stateArray = currentState;
    var surroundingCells = getCellsArray(index);
    var newArray = [];

    // Check whether current index's surroundingCells are inactive or Inactive;
    for (let i = 0; i < stateArray.length; i++) {
        if (surroundingCells.indexOf(stateArray[i]) !== -1) {
            newArray.push("true");
        }
    }

    if (newArray.length < 2) {
        // Kill Cell

        return false;
    } else if (newArray.length === 2 || newArray.length === 3) {
        // Cell Lives
        return index;
    } else {
        return false;
    }

}

// Function to cycle through the current state and return new state of live or dead cells

var cellCheck = function(currentState) {
    var oldState = currentState;
    var newState = oldState.filter(function(ele, index) {
        return compareLiveAndDead(ele, oldState);
    });
    var dCellCheck = checkLiveCells(oldState);
    newState = newState.concat(dCellCheck);
    return newState;
};

// Dead Cell Checker

// Return an array of all the deadCells
function deadCellFinder(thisState) {
    var liveCells = thisState;
    var newArray = [];
    for (var i = 0; i <= 99; i++) {
        if (liveCells.indexOf(i) === -1) {
            newArray.push(i);
        }
    }
    // Returns an array of all the deadcells on the board
    return newArray;
}

function verifyDeadCellArray(deadCellArray, state) {
    var liveCells = state;
    var deadCells = deadCellArray;
    var newArray = [];
    for (var i = 0; i < liveCells.length; i++) {
        if (deadCells.indexOf(liveCells[i]) !== -1) {
            newArray.push("true");
        }
    }
    if (newArray.length === 3) {
        return true
    } else {
        return false;
    }
}

function checkLiveCells(theState) {
    // Array of Dead Cells
    var deadCells = deadCellFinder(theState);
    var newArray = [];
    for (var i = 0; i < deadCells.length; i++) {
        // Finds the surrouding cells for each element in deadCells, returns an array.
        var surroundCell = getCellsArray(deadCells[i]);
        // Check to see if the values in array are positive and === to two
        var liveOrDie = verifyDeadCellArray(surroundCell, theState);
        if (liveOrDie !== false) {
            newArray.push(deadCells[i]);
        }
    }
    return newArray;
}


module.exports = cellCheck;
