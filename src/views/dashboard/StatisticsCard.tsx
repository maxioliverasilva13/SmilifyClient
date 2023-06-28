// ** React Imports
import { ReactElement, useEffect, useState } from 'react';

// ** MUI Imports
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Avatar from '@mui/material/Avatar';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';

// ** Icons Imports
import StarOutline from 'mdi-material-ui/StarOutline';
import CurrencyUsd from 'mdi-material-ui/CurrencyUsd';
import DotsVertical from 'mdi-material-ui/DotsVertical';
import AccountOutline from 'mdi-material-ui/AccountOutline';
import FormatListBulleted from 'mdi-material-ui/FormatListBulleted';

// ** Types
import { ThemeColor } from 'src/@core/layouts/types';
import { useEstadisticasQuery } from 'src/store/services/UserService';

interface DataType {
  stats: string;
  title: string;
  color: ThemeColor;
  icon: ReactElement;
}

const StatisticsCard = () => {
  const { data: estadisticas } = useEstadisticasQuery({});
  const [statsData, setStatsData] = useState<DataType[]>([]);

  useEffect(() => {
    if (estadisticas) {
      const newStatsData: DataType[] = [
        {
          stats: estadisticas[0]?.toString() ?? '',
          title: 'Pacientes Atendidos',
          color: 'warning',
          icon: <StarOutline sx={{ fontSize: '1.75rem' }} />,
        },
        {
          stats: estadisticas[1]?.toString() ?? '',
          title: 'Consultas Totales',
          color: 'primary',
          icon: <FormatListBulleted sx={{ fontSize: '1.75rem' }} />,
        },
        {
          stats: estadisticas[2]?.toString() ?? '',
          color: 'success',
          title: 'Pacientes Nuevos',
          icon: <AccountOutline sx={{ fontSize: '1.75rem' }} />,
        },
        {
          stats: `$${estadisticas[3]?.toString() ?? ''}`,
          color: 'info',
          title: 'Ingresos Totales',
          icon: <CurrencyUsd sx={{ fontSize: '1.75rem' }} />,
        },
      ];
      setStatsData(newStatsData);
    }
  }, [estadisticas]);

  return (
    <Card>
      <CardHeader
        title='Statistics Card'
        action={
          <IconButton size='small' aria-label='settings' className='card-more-options' sx={{ color: 'text.secondary' }}>
            <DotsVertical />
          </IconButton>
        }
        titleTypographyProps={{
          sx: {
            mb: 2.5,
            lineHeight: '2rem !important',
            letterSpacing: '0.15px !important',
          },
        }}
      />
      <CardContent sx={{ pt: theme => `${theme.spacing(3)} !important` }}>
        <Grid container spacing={[5, 0]}>
          {statsData.map((item: DataType, index: number) => (
            <Grid item xs={12} sm={3} key={index}>
              <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar
                  variant='rounded'
                  sx={{
                    mr: 3,
                    width: 44,
                    height: 44,
                    boxShadow: 3,
                    color: 'common.white',
                    backgroundColor: `${item.color}.main`,
                  }}
                >
                  {item.icon}
                </Avatar>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <Typography variant='caption'>{item.title}</Typography>
                  <Typography variant='h6'>{item.stats}</Typography>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default StatisticsCard;
