// Text
var textLoop;
var sentence;
var curSenLen;
// Text box
var readyToContinueText = false;
var readyToCloseText = false;
var firstTextBox = true;
// quickfill
var quickFillEnabled = true;
var quickFillEnded = false; // how to tell if text is scrolling or not
var temptext = '';
// text indices
var fullTextIndex;
var curTextIndex;

text = "Contrary to popular belief, Lorem Ipsum is not simply random text. " +
"It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. " +
" Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more " +
"obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in " +
"classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 " +
"of (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, " +
"very popular during the Renaissance. The first line of Lorem Ipsum, comes from a line in section 1.10.32.";

function generateText(text, sprite){
    var headshot;
    placeHeadshot(sprite);
    spellOutText(text);
    
}

function placeHeadshot(sprite){
    headshot = game.add.sprite(10, game.height - textHeight, sprite);
    headshot.scale.setTo(1.2, 1.2);
    headshot.fixedToCamera = true;
    
}

function spellOutText(text, x = textOffsetX + 7, y = game.height - textHeight + 7, width = 95, fontsize = 12, speed = 0){
    // console.log("text length: ", text.length)
    // draw initial text box
    if (firstTextBox){
        var graphics = game.add.graphics(0, game.height - textHeight);
        graphics.fixedToCamera = true;  
        graphics.lineStyle(2, 0xfff);
        graphics.beginFill(0xffffff, .8);
        graphics.drawRoundedRect(textOffsetX, 0, textWidth, textHeight, 10);
        graphics.endFill();
        firstTextBox = false;
        // add event listener to react to the text box
        game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.add(
            function(){
                if (quickFillEnabled && quickFillEnded){
                    // update indices
                    fullTextIndex += temptext[1];
                    curTextIndex = fullTextIndex;
                    // resume scrolling of text
                    curSenLen = 0;
                    quickFillEnded = false;
                    if (temptext[2]){
                        readyToCloseText = true;
                    }
                    else{
                        readyToContinueText = true;
                    }
                }
                else if (quickFillEnabled && !quickFillEnded){
                    // fill text box with words
                    temptext = findFullText(fullTextIndex);
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
                    sentence.setText('');
                    graphics.alpha = 0;
                    readyToCloseText = false;
                    game.time.events.destroy(textLoop);
                    headshot.destroy();
                }
            })
        }
        sentence = game.add.text(x, y, '', {fontSize: fontsize + 'px'});
        sentence.fixedToCamera = true;
        curSenLen = 0; //current sentence length
        totalChars = 0;
        curLineAmount = 0;
    
        var textLoop = game.time.events.loop(speed, addChar);
        var curTextIndex = 0; // character index in text
        fullTextIndex = 0; // character index in fullText
        
    function addChar(){
        // Manually refresh the text box
        if (text[curTextIndex] == "@"){
            curTextIndex += 1;
            checkRefresh(true);
            curSenLen = 0;
        }
        // Check if hitting the edge of text box
        // breaking up by word
        if (curSenLen + 3 > width && text[curTextIndex] == ' '){
            sentence.text += '\n';
            curSenLen = 0;
            curLineAmount += 1;
            checkRefresh()
        }
        // breaking up by character
        else if(curSenLen > width){
            sentence.text += '-\n'; 
            curSenLen = 0;
            curLineAmount += 1;
            checkRefresh()
        }
        // Add character    
        sentence.text += text[curTextIndex];
        curTextIndex += 1;
        curSenLen += 1;
        // close text box
        if (curTextIndex >= text.length){
            game.time.events.remove(textLoop);
            readyToCloseText = true;
        }
    }
    function findFullText(index){
        // returns [Text to go into text box (str), 
        //          number of characters in that text (int), 
        //          if the end of text was reached (bool)]
        // Find the full amount of text that goes into a text box
        fullText = '';
        var index2 = index;
        var curLineAmount = 0;
        var curSenLen = 0;
        var totalChars = 0;
        while (curLineAmount <= 2){
            if (index2 >= text.length){ 
                return [fullText, totalChars, true];
            }
            // Manually refresh the text box
            if (text[index2] == "@"){
                return [fullText, totalChars, false];
            }
            // Check if hitting the edge of text box
            // breaking up by word
            if (curSenLen + 3 > width && text[index2] == ' '){
                fullText += '\n';
                curSenLen = 0;
                curLineAmount += 1;
                if (curLineAmount > 2){
                    return [fullText, totalChars, false];
                }
            }
            // breaking up by character
            else if(curSenLen > width){
                fullText += '-\n'; 
                curSenLen = 0;
                curLineAmount += 1;
                if (curLineAmount > 2){
                    return [fullText, totalChars, false];
                }
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
    function checkRefresh(refresh = false){
        if (curLineAmount > 2 || refresh){
            readyToContinueText = true; // There is a listener that activates when this is true. Spacebar resets.
            game.time.events.pause(textLoop);            
            curLineAmount = 0;
            temptext = findFullText(fullTextIndex); 
            quickFillEnded = true;
        }
    }

    
}

