import React from 'react'
import { Stack } from 'react-bootstrap'

export const Underscore = ({ word }) => {
    return (
        <Stack direction='horizontal'>
            <div className='letter-display'>
                {word.split('').map((char, index) => (
                    <div key={index} className="letter">{char}</div>
                ))}
            </div>
        </Stack>
    )
}
