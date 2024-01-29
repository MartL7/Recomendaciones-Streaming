import swal from 'sweetalert2'

export const useAlerts = () => {
    const alertSuccess = (message) => {
        swal.fire({
            icon: 'success',
            title: message,
            showConfirmButton: false,
            footer: 'Contenido agregado correctamente',
            timer: 5000,
            timerProgressBar: true,
            customClass: {
                popup: 'bg-dark rounded-5'
            }
        })
    }

    const alertError = (message) => {
        swal.fire({
            icon: 'error',
            title: message,
            showConfirmButton: false,
            footer: 'Verifica los datos ingresados',
            timer: 5000,
            timerProgressBar: true,
            customClass: {
                popup: 'bg-dark rounded-5'
            }
        })
    }

    return { alertSuccess, alertError }
}