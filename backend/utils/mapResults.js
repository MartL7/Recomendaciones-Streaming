import { truncateBase64 } from "./truncate.js";

export const mapContentResults = (results) => {
    return results.map(item => {
        const posterBuffer = item.poster instanceof Buffer ? item.poster : Buffer.from(item.poster, 'binary')
        const base64String = posterBuffer.toString('base64')

        const truncatedBase64 = truncateBase64(base64String, 50)

        return { ...item, poster: truncatedBase64 }
    })
}
