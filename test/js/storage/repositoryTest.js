var repository = require('../../../src/js/storage/repository')

describe('repository', function () {
    beforeEach(function () {
        localStorage.clear()
    })

    describe('exists?', function () {
        it('returns false if the key is missing', function () {
            expect(repository.exists('missing-key')).toBeFalsy()
        })

        it('returns false if the key exists but has a empty value', function () {
            localStorage.setItem('empty-key', '')
            expect(repository.exists('empty-key')).toBeFalsy()
        })

        it('returns false if the key exists but has a blank value', function () {
            localStorage.setItem('blank-key', '       ')
            expect(repository.exists('blank-key')).toBeFalsy()
        })

        it('returns true if the key exists and has a value', function () {
            localStorage.setItem('key', 'some-value')
            expect(repository.exists('key')).toBeTruthy()
        })
    })

    describe('get or', function () {
        it('returns the given default if key does not exist', function () {
            expect(repository.getOr('missing-key', 'some-default')).toEqual('some-default')
        })

        it('returns the keys value if it exists', function () {
            localStorage.setItem('key', 'some-value')
            expect(repository.getOr('key', 'some-default')).toEqual('some-value')
        })
    })

    describe('get array or', function () {
        it('returns the given default if key does not exist', function () {
            expect(repository.getArrayOr('missing-key', [])).toEqual([])
        })

        it('returns the keys value as an array if it exists', function () {
            localStorage.setItem('key', 'a,b,c')
            expect(repository.getArrayOr('key', [])).toEqual(['a', 'b', 'c'])
        })

        it('unescapes commas', function () {
            localStorage.setItem('key', 'a&#44;b,c&#44;d')
            expect(repository.getArrayOr('key', [])).toEqual(['a,b', 'c,d'])
        })
    })

    describe('save', function () {
        it('trims', function () {
            repository.save('key', '  value  ')
            expect(localStorage.getItem('key')).toEqual('value')
        })

        it('handles null', function () {
            repository.save('key', null)
            expect(localStorage.getItem('key')).toBeNull()
        })

        it('handles undefined', function () {
            var neverInitialisedVar
            repository.save('key', neverInitialisedVar)
            expect(localStorage.getItem('key')).toBeNull()
        })

        it('handles numbers', function () {
            repository.save('key', 123)
            expect(localStorage.getItem('key')).toEqual('123')
        })

        describe('handles arrays', function () {
            it('trims each entry', function () {
                repository.save('key', [' a ', ' b', 'c '])
                expect(localStorage.getItem('key')).toEqual('a,b,c')
            })

            it('escapes commas', function () {
                repository.save('key', ['a,b', 'c,d'])
                expect(localStorage.getItem('key')).toEqual('a&#44;b,c&#44;d')
            })
        })
    })

    describe('clear', function () {
        it('clears a given value', function () {
            localStorage.setItem('username', 'some-username')

            repository.clear('username')

            expect(repository.exists('username')).toBeFalsy()
        })
    })
})