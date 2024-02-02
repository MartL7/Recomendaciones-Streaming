import { useState } from "react"

export const activeInfoContent = () => {
    const [showInfo, setShowInfo] = useState(false)
    const [info, setInfo] = useState({})

    const handleClickImage = (result) => {
        setInfo(result)
        setShowInfo(!showInfo)
    }

    const handleHideInfo = () => {
        setShowInfo(false)
    }

    return { showInfo, info, handleClickImage, handleHideInfo }
}