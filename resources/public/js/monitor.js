function Styler() {
    var maxColumns = 3
    var buildStatusPadding = 10

    var widthOfSingleLetter = 6
    var heightOfSingleLetter = 13
    var widthOfSingleLetterAtFontSize = 10
    var fontPaddingInCharacters = 3

    function buildStatusCount() {
        return $('li').size()
    }

    function numberOfColumns() {
        return Math.min(maxColumns, buildStatusCount())
    }

    function numberOfRows() {
        return Math.ceil(buildStatusCount() / maxColumns)
    }

    function buildStatusWidth() {
        return window.innerWidth / numberOfColumns() - (buildStatusPadding * 2)
    }

    function buildStatusHeight() {
        return window.innerHeight / numberOfRows() - buildStatusPadding
    }

    function findLongestWord() {
        var words = $.makeArray($('li div div').map(function(index, item) { return $(item).text().split(" ")}))
        return words.reduce(function(largestFound, candidate) { return Math.max(candidate.length, largestFound)  }, 0)
    }

    function idealFontSizeForBoxBasedOffTheLongestWord() {
        var longestWord = findLongestWord() + fontPaddingInCharacters
        var longestWordSize = (widthOfSingleLetter * longestWord)
        return (buildStatusWidth() / longestWordSize) * widthOfSingleLetterAtFontSize
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

    function maxFontSizeByHeight() {
        var texts = $.makeArray($('li div div').map(function(index, item) { return $(item).text()}))
        var numberOfLines = texts.map(function(item) { return linesForWord(item.split(" "))})
        var largestNumberOfLines = Math.max.apply(Math, numberOfLines)

        var maximumFontHeightInPixels = (buildStatusHeight() / largestNumberOfLines) / heightOfSingleLetter

        console.log("Max font by height " + maximumFontHeightInPixels)
        return maximumFontHeightInPixels
    }

    function scaleFontToContainerSize() {
        $(".outerContainer").css("font-size",
            Math.min(
            Math.floor(idealFontSizeForBoxBasedOffTheLongestWord()),
            Math.floor(maxFontSizeByHeight())
            )
        )
    }

    this.styleProjects = function () {
        $('.outerContainer').height(buildStatusHeight()).width(buildStatusWidth())
        scaleFontToContainerSize()
    }
}

function StatusAppender(projects) {
    function addBuildStatusToScreen(project) {
        $('#projects')
         .append("<li class=" + project.prognosis + "><div class=outerContainer><div class=innerContainer>" +
          project.name + "</div></div></li>")
    }

    this.addProjects = function() {
        $('#projects').empty()
        projects.forEach(addBuildStatusToScreen)

        if(projects.length === 0) {
            $('#projects')
                .append("<li><div class=outerContainer><div class=innerContainer>=(^.^)=</div></div></li>")
        }
    }
}

function Updater(frequency) {
    function updateBuildMonitor() {
        $.getJSON("/interesting").then(function(data){
            new StatusAppender(data).addProjects()
            new Styler().styleProjects()
        })
    }

    this.start = function() {
        updateBuildMonitor() // run immediately
        setInterval(updateBuildMonitor, frequency)
    }
}

var fiveSeconds = 5000
new Updater(fiveSeconds).start()
