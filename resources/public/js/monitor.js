function Styler() {
    var maxColumns = 3
    var buildStatusPadding = 10

    var widthOfSingleLetter = 6
    var withOfSingleLetterAtFontSize = 10
    var fontPaddingInCharacters = 2

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
        return (buildStatusWidth() / longestWordSize) * withOfSingleLetterAtFontSize
    }

    function scaleFontToContainerSize() {
        $(".outerContainer").css("font-size", Math.floor(idealFontSizeForBoxBasedOffTheLongestWord()))
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
                .append("<li><div class=outerContainer><div class=innerContainer>Status Cats will return shortly =(^.^)= ...</div></div></li>")
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