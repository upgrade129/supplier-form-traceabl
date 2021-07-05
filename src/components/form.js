import { useParams } from "react-router-dom";

export default function Form(){
    let { id } = useParams();
    console.log("params", id);
    return <h1>Form Page</h1>
}

