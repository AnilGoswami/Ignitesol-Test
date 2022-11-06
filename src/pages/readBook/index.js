import { Box } from "@mui/material"
import { useEffect } from "react"
import { useLocation, useRoutes } from "react-router-dom"

const ReadBook = () => {

    const location = useLocation();
    const router = useRoutes();

    return (
        <Box>
            {location}
        </Box>
    )

}
export default ReadBook