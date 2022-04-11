import { inputLengthChecker, getArrOfUrls } from '../src/utils/helpers'
import { randomCharacter, shortNameCharacter, shortSpeciesCharacter, shortOriginCharacter, shortStatusCharacter, shortCharacter } from '../src/utils/mocked_data'

describe('inputLengthChecker', () => {
    describe('when a valid character is provided', () => {
        test('should return true', () => { 
            const validInput = inputLengthChecker(randomCharacter)
            expect(validInput).toBe(true)
        })
    })
    describe('when "name" property has a length < 3', () => {
        test('should return false', () => { 
            const invalidInput = inputLengthChecker(shortNameCharacter)
            expect(invalidInput).toBe(false)
        })
    })
    describe('when "species" property has a length < 3', () => {
        test('should return false', () => { 
            const invalidInput = inputLengthChecker(shortSpeciesCharacter)
            expect(invalidInput).toBe(false)
        })
    })

    describe('when "origin" property has a length < 3', () => {
        test('should return false', () => { 
            const invalidInput = inputLengthChecker(shortOriginCharacter)
            expect(invalidInput).toBe(false)
        })
    })

    describe('when "status" property has a length < 3', () => {
        test('should return false', () => { 
            const invalidInput = inputLengthChecker(shortStatusCharacter)
            expect(invalidInput).toBe(false)
        })
    })
    describe('when all properties has a length < 3', () => {
        test('should return false', () => { 
            const invalidInput = inputLengthChecker(shortCharacter)
            expect(invalidInput).toBe(false)
        })
    })
    
})

describe('getArrOfUrls', () => {
    test('should return an array', () => { 
        const urls = getArrOfUrls()
        expect(urls).toBeInstanceOf(Array)
    })
    describe('when no parameters are provided', () => {
        test('should return an empty array', () => { 
            const urls = getArrOfUrls()
            expect(urls).toHaveLength(0)
        })
    })
    describe('when only "url" parameter is provided', () => {
        test('should return an array with only one element and must contain the provided url', () => {
            const url = 'http://someurl'
            const urls = getArrOfUrls(url)
            expect(urls).toHaveLength(1)
            expect(urls[0]).toMatch(url)
        })
    })

    describe('when "url" and "pages" parameters are provided', () => {
        test('should return an array with length === pages', () => {
            const url = 'http://someurl'
            const urls = getArrOfUrls(url,6)
            expect(urls).toHaveLength(6)
            expect(urls[0]).toMatch(url)
        })
        test('should return an array with length === pages', () => {
            const url = 'http://someurl'
            const urls = getArrOfUrls(url,2)
            expect(urls).toHaveLength(2)
            expect(urls[0]).toMatch(url)
        })
    })

    describe('when "url", "pages" and "pageInit" parameters are provided', () => {
        test('should return an array with length === (pages - pageInit + 1)', () => {
            const url = 'http://someurl'
            const urls = getArrOfUrls(url,10,8)
            expect(urls).toHaveLength((10-8+1))
            expect(urls[0]).toMatch(url)
        })
        test('should return an array with length === (pages - pageInit + 1)', () => {
            const url = 'http://someurl'
            const urls = getArrOfUrls(url,1,1)
            expect(urls).toHaveLength((1-1+1))
            expect(urls[0]).toMatch(url)
        })

        test('should return an array with length === (pages - pageInit + 1)', () => {
            const url = 'http://someurl'
            const urls = getArrOfUrls(url,0,1)
            expect(urls).toHaveLength((0-1+1))
        })
    })

    describe('when "pages" and "pageInit" parameters are provided as negative values', () => {
        test('should return an empty array', () => {
            const url = 'http://someurl'
            const urls = getArrOfUrls(url,-10,-8)
            expect(urls).toHaveLength(0)
        })
        test('should return an empty array', () => {
            const url = 'http://someurl'
            const urls = getArrOfUrls(url,-5,-33)
            expect(urls).toHaveLength(0)
        })
    })
})