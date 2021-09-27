greenAngrySlime = function(game,x,y){
    Slime.call(this, game, x, y, 'greenAngrySlime');
}

greenAngrySlime.prototype = Object.create(Slime.prototype);
Object.defineProperty(greenAngrySlime.prototype, 'constructor', {
    value: greenAngrySlime,
    enumerable: false, // so that it does not appear in 'for in' loop
    writable: true });

