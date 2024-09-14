import Image from "next/image"

const CardAbogCategory = ({icon, title, description}) => {
  return (
    <div>
      <Image src={icon} alt="Tipo de Abogado" />
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  )
}

export default CardAbogCategory