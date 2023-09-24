import {Button } from "react-bootstrap"

export const LetterButton = ({value,onClick}) => {
  return (
    
    <Button onClick={onClick}>{value} </Button>
   
  )
}
