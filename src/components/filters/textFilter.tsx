import { useListContext } from "@/context/ListContextProvider"
import { useState } from "react"

export default function TextFilter() {
    const { setSearchString } = useListContext();
    const handleEvent = (event: React.KeyboardEvent<HTMLInputElement>) => {
        const string = event.currentTarget.value;

        setSearchString(string);
        // if(event.key === 'Enter' && onEnter) onEnter(event.currentTarget.value)
        // if(onEmpty && event.currentTarget.value === '') onEmpty('')
        // if(onChange) onChange(event.currentTarget.value)
    }
    return (
        <input type="text" onKeyUp={handleEvent}></input>
    )
}