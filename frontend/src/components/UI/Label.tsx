interface Promps extends React.LabelHTMLAttributes<HTMLLabelElement>{}

export default function Label(promps: Promps){
    return(
        <label {...promps} className="py-2 font-bold my-1"></label>
    )
}