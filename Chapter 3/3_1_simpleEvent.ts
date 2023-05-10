import { EventEmitter } from 'events'
import { readFile } from 'fs'

class FindRegex extends EventEmitter {
    
    regex: string = ''
    files: string[] = []

    constructor (regex: string) {
        super()
        this.regex = regex
        this.files = []
    }

    addFile (file: string) {
        this.files.push(file)
        return this
    }

    find () {
        process.nextTick(() => this.emit('info', 'Find process started', this.files))

        for (const file of this.files) {
            readFile(file, 'utf-8', (err, content) => {
                if (err) {
                    return this.emit('error', err)
                }

                this.emit('fileread', file)

                const match = content.match(this.regex)
                if (match) {
                    match.forEach(elem => this.emit('found', file, elem))
                }
            })
        }

        return this
    }
}