const fs = require('fs')

const k = [
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    'p',
    'm',
]

for(let i = 0; i < k.length; i++)
{
    const d1 = fs.readFileSync('./SVG/b-b-' + k[i] + '.svg')
    fs.writeFileSync('../../icons/svgs/b-b-' + k[i] + '.js', 'module.exports = `' + d1 + '`')
    
    const d2 = fs.readFileSync('./SVG/b-n-' + k[i] + '.svg')
    fs.writeFileSync('../../icons/svgs/b-n-' + k[i] + '.js', 'module.exports = `' + d2 + '`')
    
    const d3 = fs.readFileSync('./SVG/w-b-' + k[i] + '.svg')
    fs.writeFileSync('../../icons/svgs/w-b-' + k[i] + '.js', 'module.exports = `' + d3 + '`')
    
    const d4 = fs.readFileSync('./SVG/w-n-' + k[i] + '.svg')
    fs.writeFileSync('../../icons/svgs/w-n-' + k[i] + '.js', 'module.exports = `' + d4 + '`')
    
    const d5 = fs.readFileSync('./SVG/r-b-' + k[i] + '.svg')
    fs.writeFileSync('../../icons/svgs/r-b-' + k[i] + '.js', 'module.exports = `' + d5 + '`')
    
    const d6 = fs.readFileSync('./SVG/r-n-' + k[i] + '.svg')
    fs.writeFileSync('../../icons/svgs/r-n-' + k[i] + '.js', 'module.exports = `' + d6 + '`')
}