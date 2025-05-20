interface Promps extends React.InputHTMLAttributes<HTMLInputElement>{}

export default function Input(promps: Promps){
    return(
        <input {...promps} className="border-gray-200 bg-gray-300/30 shadow-2xs rounded p-2 my-1"></input>
    )
}