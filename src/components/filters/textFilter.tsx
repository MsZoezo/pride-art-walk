import { useState } from "react"

interface Props {
    onChange?: (value: string) => void,
    onEnter?: (value?: string) => void,
    onEmpty?: (value?: string) => void
}

export default function TextFilter({onChange, onEnter, onEmpty}: Props) {
    const handleEvent = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if(event.key === 'Enter' && onEnter) onEnter(event.currentTarget.value)
        if(onEmpty && event.currentTarget.value === '') onEmpty('')
        if(onChange) onChange(event.currentTarget.value)
    }
    return (
        <input type="text" onKeyUp={handleEvent}></input>
    )
}