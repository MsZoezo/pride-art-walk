interface Props {
    onChange: any
}

export default function TextFilter({onChange}: Props) {
    return (
        <input type="text" onChange={onChange}></input>
    )
}