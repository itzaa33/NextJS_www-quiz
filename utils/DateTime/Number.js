
function minify (number = 0)
{
    if (number >= 1000000)
    {
        return prettify(parseInt (number / 1000000 * 10, 10) / 10) + 'M'
    }

    if (number >= 10000)
    {
        return prettify(parseInt (number / 1000 * 10, 10) / 10) + 'K'
    }

    return prettify (number)
}

function prettify (number = 0)
{
    return number.toLocaleString('en', {maximumSignificantDigits : 21})
}

function floatify (number = 0)
{
    const f = parseFloat (number).toFixed (2)
    const arr = f.split ('.')

    const a = parseInt (arr[0])
    return `${prettify(a)}.${arr[1]}`
}

module.exports = {
    minify,
    prettify,
    floatify,
}