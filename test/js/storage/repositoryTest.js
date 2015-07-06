jest.dontMock('../../../src/js/storage/repository')

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

        it('returns a string if it exists', function () {
            localStorage.setItem('key', '"some-value"')
            expect(repository.getOr('key', 'some-default')).toEqual('some-value')
        })

        it('returns an array of strings if it exists', function () {
            localStorage.setItem('key', '["a","b","c"]')
            expect(repository.getOr('key', [])).toEqual(['a', 'b', 'c'])
        })
    })

    describe('get object or', function () {
        it('returns the given default if the key does not exist', function () {
            expect(repository.getObjectOr('missing-key', {foo: 'bar'})).toEqual({foo: 'bar'})
        })

        it('expects the stored value to be a json string', function () {
            localStorage.setItem('key', '{"foo":"bar"}')
            expect(repository.getObjectOr('key', {})).toEqual({foo: 'bar'})
        })

        it('merges the default values with the parsed object', function () {
            localStorage.setItem('key', '{"foo":"bar"}')
            expect(repository.getObjectOr('key', {bar: 'baz'})).toEqual({foo: 'bar', bar: 'baz'})
        })
    })

    describe('save', function () {
        it('trims', function () {
            repository.save('key', '  value  ')
            expect(localStorage.getItem('key')).toEqual('"value"')
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
                expect(localStorage.getItem('key')).toEqual('["a","b","c"]')
            })
        })

        it('handles objects', function () {
            repository.save('key', {foo: 'bar'})
            expect(localStorage.getItem('key')).toEqual('{"foo":"bar"}')
        })
    })

    describe('clear', function () {
        it('clears a given value', function () {
            localStorage.setItem('username', 'some-username')

            repository.clear('username')

            expect(repository.exists('username')).toBeFalsy()
        })
    })

    describe('is empty', function () {
        it('true if no keys have been saved', function () {
            expect(repository.isEmpty()).toBeTruthy()
        })

        it('false if any key has been saved', function () {
            localStorage.setItem('some-key', 'some-value')

            expect(repository.isEmpty()).toBeFalsy()
        })
    })
})