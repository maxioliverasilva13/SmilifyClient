// ** Icon imports
import Login from 'mdi-material-ui/Login'
import Table from 'mdi-material-ui/Table'
import CubeOutline from 'mdi-material-ui/CubeOutline'
import HomeOutline from 'mdi-material-ui/HomeOutline'
import FormatLetterCase from 'mdi-material-ui/FormatLetterCase'
import AccountCogOutline from 'mdi-material-ui/AccountCogOutline'
import CreditCardOutline from 'mdi-material-ui/CreditCardOutline'
import AccountPlusOutline from 'mdi-material-ui/AccountPlusOutline'
import AlertCircleOutline from 'mdi-material-ui/AlertCircleOutline'
import GoogleCirclesExtended from 'mdi-material-ui/GoogleCirclesExtended'
import Users from 'mdi-material-ui/AccountGroup'
import ToolTipPlus from 'mdi-material-ui/ToolTipPlus'
import FormatListBulleted from 'mdi-material-ui/FormatListBulleted'



// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): VerticalNavItemsType => {
  return [
    {
      title: 'Dashboard',
      icon: HomeOutline,
      path: '/'
    },
    {
      title: 'Agenda',
      icon: AccountCogOutline,
      path: '/agenda'
    },
    {
      sectionTitle: 'Pacientes'
    },
    {
      title: 'Pacientes',
      icon: Users,
      path: '/pacientes',
    },
    {
      title: 'Agregar',
      icon: ToolTipPlus,
      path: '/pacientes/agregar',
    },
    {
      sectionTitle: 'Aranceles'
    },
    {
      title: 'Listado',
      icon: FormatListBulleted,
      path: '/aranceles'
    },
    {
      title: 'Agregar',
      path: '/Modal/ModalConsultaAgregar',
      icon: ToolTipPlus,
    },
  ]

}

export default navigation
