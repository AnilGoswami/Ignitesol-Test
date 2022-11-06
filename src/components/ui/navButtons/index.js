import { Box, Typography } from "@mui/material"
import { ReactComponent as Back } from '../../../assets/images/Back.svg'

const NavButtons = ({ icon = <></>, text = "" }) => {

    return (
        <Box alignItems={'center'} justifyContent={'space-between'} flexDirection={'row'} display={'flex'} flex={1} overflow={'hidden'}>
            <Box flexDirection={'row'} display={'flex'}>
                {icon}
                <Typography variant="h6" pl={1}>
                    {text}
                </Typography>
            </Box>
            <Back transform="rotate(180)" height={25}/>
        </Box>
    )

}

export default NavButtons