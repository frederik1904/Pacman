export class Actor {
  act(){
    // Do nothing
  }

      /**
     * Moves the actor in the given direction if it doesn't collide with a wall.
     * 
     * @param   movingDirection   An integer representing the direction to move in
     * @return                    A boolean value of whether the move was done
     */
    moveInDirectionIfPossible(movingDirection: number) {
        let xDistanceToWall: number = 15;
        let yDistanceToWall: number = 15;
        let aBit: number = 11;
        let xOffset: number = 0;
        let yOffset: number = 0;
        let xExtraOffset: number = 0;
        let yExtraOffset: number = 0;
        
        switch (movingDirection) {
            case 0:
                xOffset = xDistanceToWall;
                yExtraOffset += aBit; 
                break;
            case 90:
                yOffset = yDistanceToWall;
                xExtraOffset -= aBit;
                break;
            case 180:
                xOffset = -1 * xDistanceToWall;
                yExtraOffset -= aBit;
                break;
            case 270:
                yOffset = -1 * yDistanceToWall;
                xExtraOffset += aBit;
                break;
        }
        
        List<Wall> wallsRightAhead = getObjectsAtOffset(xOffset, yOffset, Wall.class);
        List<Wall> wallsABitToTheRight = getObjectsAtOffset(xOffset + xExtraOffset, yOffset + yExtraOffset, Wall.class);
        List<Wall> wallsABitToTheLeft = getObjectsAtOffset(xOffset - xExtraOffset, yOffset - yExtraOffset, Wall.class);
        
        if (wallsRightAhead.isEmpty() && wallsABitToTheRight.isEmpty() && wallsABitToTheLeft.isEmpty()) {
            move(1);
            return true;
        }

        return false;
    }

    /**
     * Move the actor randomly around in the world.
     */
    protected void moveRandom() {
        boolean hasMoved = moveInDirectionIfPossible(currentDirection);
        int random = Greenfoot.getRandomNumber(75);
        
        if (!hasMoved || random == 74) {
            currentDirection = (currentDirection + random * 90) % 360;
            setRotation(currentDirection);
        }
    }
    
    /**
     * Ends the game if Pacman has been killed or there are no more 
     * cheeses.
     */
    protected void endGameIfDone () {
        World world = getWorld();
        if (world.getObjects(Cheese.class).isEmpty()) {
            endGameWithText("Victory!");
        } else if (world.getObjects(Pacman.class).isEmpty()) {
            endGameWithText("Game over");
        }
    }
    
    /**
     * Ends the game and displayes the given text string.
     */
    private void endGameWithText (String endingText) {
        World world = getWorld();
        world.addObject(new TextImage(endingText, 150), (int) world.getWidth()/2, (int) world.getHeight()/3);
        Greenfoot.stop();
    }
}