export const truncateBase64 = (base64String, maxLength = 50) => {
    if (base64String.length > maxLength) {
        return base64String.substring(0, maxLength) + '...'
    }
    
    return base64String
}