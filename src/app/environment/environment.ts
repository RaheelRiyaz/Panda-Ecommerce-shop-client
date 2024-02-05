import Swal from 'sweetalert2';

export const environment = {
  apiBaseUrl: 'http://localhost:5218/api/',
  imageBasePath: 'http://localhost:5218',
  fireSwal: (title: string, swalIcon: string = 'success') => {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 1000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
    });
    Toast.fire({
      icon: swalIcon === 'success' ? 'success' : 'error',
      title: title,
    });
  },
  fireConfirmSwal: (
    message: string,
    text: string = "You won't be able to revert this!"
  ) => {
    return Swal.fire({
      title: message,
      text: text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
    });
  },
};
