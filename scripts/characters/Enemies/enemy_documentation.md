## Methods needed for all enemies
- hit()
- die()
- update() (obviously)

## Methods recommended
- None apart from needed

## Properties needed for all enemies
- mass (number)
- damage (dictionary)
  - ex. this.damage = {none: false, left: true, right: true, up: false, down: true};
- health (number)

## Properties recommended for enemies
- currentlyHit (bool) : Helps enemy not be hit multiple times by one slash

## Other recommendations
- Use an animation priority dictionary. Basically, rank all of your animations so that you have the ability to separate animations. It allows for some convenient checks and makes it easier to shut down certain possibilities
- Use base classes when adding variations of enemies. I'd prefer to not have repeating code when possible.
