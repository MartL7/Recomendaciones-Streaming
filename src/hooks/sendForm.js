import { useState } from "react"
import { useNavigate  } from 'react-router-dom'
import { useAlerts } from "./alerts"

export const sendForm = () => {

    const { alertSuccess, alertError } = useAlerts()

    const navigate = useNavigate ()
    const [formData, setFormData] = useState({
        title: '',
        type: '',
        poster: null,
    })

    const handleSubmit = async (event) => {
        event.preventDefault()

        const formDataToSend = new FormData()

        formDataToSend.append('title', formData.title)
        formDataToSend.append('type', formData.type)
        formDataToSend.append('poster', formData.poster)
        formDataToSend.append('genre', formData.genre)

        try {
            const response = await fetch('http://localhost:3000/content', {
                method: 'POST',
                body: formDataToSend,
            })

            if (response.ok) {
                alertSuccess('Contenido agregado correctamente')
                navigate('/')
            } else {
                console.error('Error al procesar la solicitud POST')
            }

        } 
        
        catch (error) {
            alertError('Verifica los datos ingresados')
            console.error('Error en la Solicitud POST', error)
        }

    }

    const handleInputChange = (event) => {
        const { name, value, files } = event.target
    
        setFormData({
          ...formData,
          [name]: files ? files[0] : value,
        })

        console.log(formData)
    }

    return { handleSubmit, handleInputChange }
}