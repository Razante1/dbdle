import { useState } from "react";
import { Personagem } from "../../interface/personagemProps";
import { ChoicesProps } from "../../interface/ChoicesProps";

export function Choices({choices}:ChoicesProps) {

    return(<>
    {choices? 
    <div>
        {choices.map((c,index) => (
            <li key={index}>{c.name}</li>
        ))}
    </div>

    :
    
    'teste'
    }
    
    </>)
}