import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

const Toast = Swal.mixin({
  toast: true,
  position: "middle",
  showConfirmButton: false,
  timer: 1000,
  timerProgressBar: false
});