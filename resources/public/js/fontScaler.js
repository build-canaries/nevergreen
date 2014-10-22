function FontScaler(listOfText, height, width) {

    var widthOfSingleLetter = 6
    var heightOfSingleLetter = 13
    var widthOfSingleLetterAtFontSize = 10
    var fontPaddingInCharacters = 3

    function flatten(array) {
        return [].concat.apply([], array);
    }

    function findLongestWord() {
        var words = flatten(listOfText.map(function(item) { return item.split(" ")}))
        return words.reduce(function(largestFound, candidate) { return Math.max(candidate.length, largestFound) }, 0)
    }

    function linesForWord(words) {
        var longestWordSize = findLongestWord() + fontPaddingInCharacters
        var lineNumber = 1
        var currentLinePosition = 0

        words.forEach(function(word) {
            if((word.length + currentLinePosition) > longestWordSize){
                lineNumber++
                currentLinePosition = 0
            }
            currentLinePosition += word.length + 1
        })

        return lineNumber
    }

    this.maxFontSizeByWidth = function() {
        var longestWord = findLongestWord() + fontPaddingInCharacters
        var longestWordSize = (widthOfSingleLetter * longestWord)
        return (width / longestWordSize) * widthOfSingleLetterAtFontSize
    }

    this.maxFontSizeByHeight = function() {
        var numberOfLines = listOfText.map(function(item) { return linesForWord(item.split(" "))})
        var largestNumberOfLines = Math.max.apply(Math, numberOfLines)

        var maximumFontHeightInPixels = (height / largestNumberOfLines) / heightOfSingleLetter

        return maximumFontHeightInPixels * widthOfSingleLetterAtFontSize
    }

    this.ideal = function() {
        return Math.min(
                Math.floor(this.maxFontSizeByWidth()),
                Math.floor(this.maxFontSizeByHeight())
    )}
}
