const { promisify } = require('util')
const exec = promisify(require('child_process').exec)
const path = require('path')

class Pdf2Txt {
    constructor(filename) {
        this.binDir = path.join(__dirname, 'bin')
        this.filename = filename
    }

    async extract(start=0, end=null, outname='output.txt') {
        const opts = `-layout -enc "UTF-8" -f ${start} ${  typeof end == 'number' ? '-l ' + end : ''}`
        await exec(`${path.join(this.binDir, 'pdftotext')} ${opts} ${this.filename} ${outname}`);

    }
}

module.exports = { Pdf2Txt }