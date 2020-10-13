import React from 'react'
import styled from 'styled-components'

const SVGs = {
    'b-b-0': require('./svgs/b-b-0'),
    'b-b-1': require('./svgs/b-b-1'),
    'b-b-2': require('./svgs/b-b-2'),
    'b-b-3': require('./svgs/b-b-3'),
    'b-b-4': require('./svgs/b-b-4'),
    'b-b-5': require('./svgs/b-b-5'),
    'b-b-6': require('./svgs/b-b-6'),
    'b-b-7': require('./svgs/b-b-7'),
    'b-b-8': require('./svgs/b-b-8'),
    'b-b-9': require('./svgs/b-b-9'),
    'b-b-m': require('./svgs/b-b-m'),
    'b-b-p': require('./svgs/b-b-p'),

    'b-n-0': require('./svgs/b-n-0'),
    'b-n-1': require('./svgs/b-n-1'),
    'b-n-2': require('./svgs/b-n-2'),
    'b-n-3': require('./svgs/b-n-3'),
    'b-n-4': require('./svgs/b-n-4'),
    'b-n-5': require('./svgs/b-n-5'),
    'b-n-6': require('./svgs/b-n-6'),
    'b-n-7': require('./svgs/b-n-7'),
    'b-n-8': require('./svgs/b-n-8'),
    'b-n-9': require('./svgs/b-n-9'),
    'b-n-m': require('./svgs/b-n-m'),
    'b-n-p': require('./svgs/b-n-p'),

    'r-b-0': require('./svgs/r-b-0'),
    'r-b-1': require('./svgs/r-b-1'),
    'r-b-2': require('./svgs/r-b-2'),
    'r-b-3': require('./svgs/r-b-3'),
    'r-b-4': require('./svgs/r-b-4'),
    'r-b-5': require('./svgs/r-b-5'),
    'r-b-6': require('./svgs/r-b-6'),
    'r-b-7': require('./svgs/r-b-7'),
    'r-b-8': require('./svgs/r-b-8'),
    'r-b-9': require('./svgs/r-b-9'),
    'r-b-m': require('./svgs/r-b-m'),
    'r-b-p': require('./svgs/r-b-p'),

    'r-n-0': require('./svgs/r-n-0'),
    'r-n-1': require('./svgs/r-n-1'),
    'r-n-2': require('./svgs/r-n-2'),
    'r-n-3': require('./svgs/r-n-3'),
    'r-n-4': require('./svgs/r-n-4'),
    'r-n-5': require('./svgs/r-n-5'),
    'r-n-6': require('./svgs/r-n-6'),
    'r-n-7': require('./svgs/r-n-7'),
    'r-n-8': require('./svgs/r-n-8'),
    'r-n-9': require('./svgs/r-n-9'),
    'r-n-m': require('./svgs/r-n-m'),
    'r-n-p': require('./svgs/r-n-p'),

    'w-n-0': require('./svgs/w-n-0'),
    'w-n-1': require('./svgs/w-n-1'),
    'w-n-2': require('./svgs/w-n-2'),
    'w-n-3': require('./svgs/w-n-3'),
    'w-n-4': require('./svgs/w-n-4'),
    'w-n-5': require('./svgs/w-n-5'),
    'w-n-6': require('./svgs/w-n-6'),
    'w-n-7': require('./svgs/w-n-7'),
    'w-n-8': require('./svgs/w-n-8'),
    'w-n-9': require('./svgs/w-n-9'),
    'w-n-m': require('./svgs/w-n-m'),
    'w-n-p': require('./svgs/w-n-p'),
    'w-n-d': require('./svgs/w-n-d'),

    'w-b-0': require('./svgs/w-b-0'),
    'w-b-1': require('./svgs/w-b-1'),
    'w-b-2': require('./svgs/w-b-2'),
    'w-b-3': require('./svgs/w-b-3'),
    'w-b-4': require('./svgs/w-b-4'),
    'w-b-5': require('./svgs/w-b-5'),
    'w-b-6': require('./svgs/w-b-6'),
    'w-b-7': require('./svgs/w-b-7'),
    'w-b-8': require('./svgs/w-b-8'),
    'w-b-9': require('./svgs/w-b-9'),
    'w-b-m': require('./svgs/w-b-m'),
    'w-b-p': require('./svgs/w-b-p'),

    '4-10': require('./svgs/4-10'),
    'icon-facebook' : require('./svgs/icon-facebook'),
    'icon-play' : require('./svgs/icon-play'),
}

const Icon = styled.div`
    width: ${props => props.width}px !important;
    height: ${props => props.height}px !important;

    display: flex;

    svg
    {
        width: 100%;
        height: 100%;

        margin: auto;

        text
        {
            fill: ${props => props.color};
        }
    }
`

export default ({ style, icon, width, height, color }) =>
{
    const svg = SVGs[icon]

    return (
        <Icon 
            style={style}
            width={width}
            height={height}
            color={color}
            dangerouslySetInnerHTML={{ __html: svg }}
        />
    )
}