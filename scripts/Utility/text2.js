/* Similar to text.js but attempts to use the automatic word wrapping 
that is provided through the style attribute. NOT complete or working atm.*/


// Text
var textLoop;
var sentence;
var curSenLen;
globalText = '';
//Text position
var textBoxTextWidth; 
// Text box
var readyToContinueText = false;
var readyToCloseText = false;
var firstTextBox = true;
var closedText = false;
var textBox;
// quickfill
var quickFillEnabled = true;
var quickFillEnded = false; // how to tell if text is scrolling or not
var temptext = '';
var addedTextContinueListener = false;
// text indices
var fullTextIndex;
var curTextIndex;
// Dialogue (used when handling dialogue in events)
var dialogueList = [];
var dialogueIndex = 0;

function generateText(text, sprite){
    // Fix variables correctly
    quickFillEnded = false;
    globalText = text;
    var headshot;
    textBoxTextWidth = parseInt(gameWidth*.12);

    // Generate text
    placeHeadshot(sprite);
    spellOutText(text);
}

function placeHeadshot(sprite){
    headshot = game.add.sprite(10, game.height - textHeight, sprite);
    headshot.scale.setTo(1.2, 1.2);
    headshot.fixedToCamera = true;
}

function spellOutText(text, x = textOffsetX + 7, y = game.height - textHeight + 7, fontsize = 12, speed = 0){
    if (!addedTextContinueListener){
        addedTextContinueListener = true;
        addTextContinueListener();
    }
    if (firstTextBox){
        // draw initial text box
        textBox = game.add.graphics(0, game.height - textHeight);
        textBox.fixedToCamera = true;  
        textBox.lineStyle(2, 0xfff);
        textBox.beginFill(0xffffff, .8);
        textBox.drawRoundedRect(textOffsetX, 0, textWidth, textHeight, 10);
        textBox.endFill();
        firstTextBox = false;
        var style = {
            fontSize: fontsize + 'px',
            wordWrap: true, 
            wordWrapWidth: 370,
            maxLines: 3
        }
        sentence = game.add.text(x, y, '', style);
        sentence.fixedToCamera = true;
        textLoop = game.time.events.loop(speed, addChar, this);
        game.time.events.start(textLoop); 
    }
    
    // textBox.alpha = 0;
    game.time.events.resume(textLoop); 
    curSenLen = 0; //current sentence length
    totalChars = 0;
    curLineAmount = 0;
    curTextIndex = 0; // character index in text
    fullTextIndex = 0; // character index in fullText

}

function addChar(){
    text = globalText;
    width = textBoxTextWidth;
    // Manually refresh the text box
    if (text[curTextIndex] == "@"){
        curTextIndex += 1;
        checkRefresh(text, true);
        curSenLen = 0;
    }
    // Add character    
    if (text[curTextIndex] != undefined){
        sentence.text += text[curTextIndex];
        curTextIndex += 1;
        curSenLen += 1;
    }
    // close text box
    if (curTextIndex >= text.length){
        game.time.events.pause(textLoop);  
        readyToCloseText = true;
    }
}
function findFullText(index, text){
    // Find the full amount of text that goes into a text box
    //
    // :param index: current index of the text being read, will be the start
    //                of the textbox being displayed. 
    // returns [Text to go into text box (str), 
    //          number of characters in that text (int), 
    //          if the end of text was reached (bool)]
        fullText = text;
        index2 = index;
        width = textBoxTextWidth;
        var curLineAmount = 0;
        var curSenLen = 0;
        var totalChars = 0;
        while (curLineAmount <= 2){
            
            if (index2 >= text.length){ 
                return [fullText, totalChars, true];
            }
            // Manually refresh the text box
            if (text[index2] == "@"){
                console.log("manual refresh")
                return [fullText, totalChars, false];
            }
            
            // Add character    
            fullText += text[index2];
            totalChars += 1;
            curSenLen += 1;
            index2 += 1;
        }
        return [fullText, totalChars, true]
    }
    
    // Check if a new set of text needs to be put in the text box
    function checkRefresh(text, refresh = false){
        // greater than 3 lines of text
        if (curLineAmount > 2 || refresh){
            readyToContinueText = true; // There is a listener that activates when this is true. Spacebar resets.
            game.time.events.pause(textLoop);            
            curLineAmount = 0;
            temptext = findFullText(fullTextIndex, text); 
            quickFillEnded = true;
        }
    }
    
    function addTextContinueListener(){
        addedTextContinueListener = true;
        // add event listener to react to the text box
        game.input.keyboard.addKey(Phaser.Keyboard.Z).onDown.add(
            function(){
                if (!(dialogueList.length == 0)){
                    if (quickFillEnabled && quickFillEnded){
                        // update indices
                        fullTextIndex += temptext[1];
                        curTextIndex = fullTextIndex;
                        // resume scrolling of text
                        curSenLen = 0;
                        quickFillEnded = false;
                        checkCloseText(temptext);
                    }
                    else if (quickFillEnabled && !quickFillEnded){
                        // fill text box with words
                        temptext = findFullText(fullTextIndex, globalText);
                        sentence.setText(temptext[0]); 
                        quickFillEnded = true;
                        game.time.events.pause(textLoop);
                    }
                    if (readyToContinueText){ // move to next text box
                        sentence.setText('');
                        game.time.events.resume(textLoop);
                        readyToContinueText = false;
                    }
                    else if (readyToCloseText){ // close the entire text box
                        // remove/reset variables
                        sentence.setText('');
                        readyToCloseText = false;
                        closedText = true;
                        // remove sprites
                        // textLoop.destroy();
                        // game.time.events.remove(textLoop);
                        headshot.destroy();
                        // Move to next dialogue if it exists
                        nextDialogue();
                    }
                }
            })
    }

function nextDialogue(){
    dialogueIndex += 1;
    // move to next dialogue
    if (!(dialogueIndex >= dialogueList.length)){
        generateText(dialogueList[dialogueIndex][0], dialogueList[dialogueIndex][1]);
    }
    // Otherwise, reset
    else{
        console.log("done with dialogue")
        dialogueIndex = 0;
        dialogueList = [];
        textBox.alpha = 0;
        currentPlayer.disableMovement = false;
        firstTextBox = true;
    }
}

function startDialogue(){
    currentPlayer.disableMovement = true;
    generateText(dialogueList[dialogueIndex][0], dialogueList[dialogueIndex][1]);
}

function checkCloseText(temptext){
    if (temptext[2]){
        readyToCloseText = true;
    }
    else{
        readyToContinueText = true;
    }
}