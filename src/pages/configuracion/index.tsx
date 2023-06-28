// ** React Imports
import { SyntheticEvent, useState,useEffect } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import { styled } from '@mui/material/styles'
import MuiTab, { TabProps } from '@mui/material/Tab'

// ** Icons Imports
import AccountOutline from 'mdi-material-ui/AccountOutline'
import LockOpenOutline from 'mdi-material-ui/LockOpenOutline'
import InformationOutline from 'mdi-material-ui/InformationOutline'

import { useCurrentUserQuery } from 'src/store/services/UserService'

// ** Demo Tabs Imports
import TabInfo from 'src/views/account-settings/TabInfo'
import TabAccount from 'src/views/account-settings/TabAccount'

import GlobalSpinner from 'src/components/Spinner/GlobalSpinner'

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'

const Tab = styled(MuiTab)<TabProps>(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    minWidth: 100
  },
  [theme.breakpoints.down('sm')]: {
    minWidth: 67
  }
}))

const TabName = styled('span')(({ theme }) => ({
  lineHeight: 1.71,
  fontSize: '0.875rem',
  marginLeft: theme.spacing(2.4),
  [theme.breakpoints.down('md')]: {
    display: 'none'
  }
}))



const AccountSettings = () => {
  // ** State
  const { data,  isLoading, refetch } = useCurrentUserQuery<any>({});
  const [userData, setUserData]  = useState<{
    id: number, 
    nombre : string,
    apellido : string,
    celular: string,
    email: string,
    fechaNacimiento: string,
    avatar : string | null,
  } | null >(null);

  const [configuracionData, setConfiguracionData]  = useState(null);

  const [value, setValue] = useState<string>('account');
  const defaultUserAvatar = '/images/avatars/1.png';


  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  useEffect(()=>{
      if(data){
        const { id,nombre , apellido ,avatar, celular, email ,fechaNacimiento, configuracion} = data;

        setUserData({
          id, 
          nombre,
          apellido,
          celular,
          email,
          fechaNacimiento,
          avatar: avatar ? avatar: defaultUserAvatar 
        });

        setConfiguracionData(configuracion);

      }
  }, [data]);

  if (isLoading) {
    return <GlobalSpinner />;
  }


  return (

    
    <Card>
      <TabContext value={value}>
        <TabList
          onChange={handleChange}
          aria-label='account-settings tabs'
          sx={{ borderBottom: theme => `1px solid ${theme.palette.divider}` }}
        >
          <Tab
            value='account'
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <AccountOutline />
                <TabName>Cuenta</TabName>
              </Box>
            }
          />
         
          <Tab
            value='info'
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <InformationOutline />
                <TabName>Configuraciones de aplicacion</TabName>
                
              </Box>
            }
          />
        </TabList>

        <TabPanel sx={{ p: 0 }} value='account'>
          {
            userData && (
              <TabAccount userData={userData} />

            )
          }
        </TabPanel>
       
        <TabPanel sx={{ p: 0 }} value='info'>
            {
              configuracionData && (
                <TabInfo configuracionData={configuracionData}  />


              )
            }
        </TabPanel>
      </TabContext>
    </Card>
  )
}

export default AccountSettings
