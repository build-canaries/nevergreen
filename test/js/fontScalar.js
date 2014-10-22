describe("Font Scalar", function() {

    it("constrained by width", function() {
        // height is larger than the width constraint

        // longest word is size 4, plus padding of 3 so longest line is 7 characters
        // width of single letter is 6, so longest line is 42
        // equation is (width / longestLineSize) * fontSizeForSingleLetter
        // (100 / 42) * 10 = 23
        var width = 100

        expect(new FontScaler(["word"], 50, width).ideal()).toEqual(23)
    })

    it("constrained by height", function() {
        // width is larger than the height constraint

        // work out maximum number of number of lines (set by the width), in this case 1
        // equation is (height / largestNumberOfLines) / heightOfSingleLetter * fontSizeForSingleLetter
        // (20 / 1) / 13 * 10 = 15

        expect(new FontScaler(["word"], 20, 100).ideal()).toEqual(15)
    })

    it("constrained by height over multiple lines", function() {
        // width is larger than the height constraint

        // work out maximum number of number of lines (set by the width), in this case 1
        // equation is (height / largestNumberOfLines) / heightOfSingleLetter * fontSizeForSingleLetter
        // (20 / 3) / 13 * 10 = 5

        expect(new FontScaler(["word word word"], 20, 100).ideal()).toEqual(5)
    })

})