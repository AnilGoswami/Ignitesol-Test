import { Box, Button, Typography } from "@mui/material"

const BookCard = ({ id = "", url = "", title = "", image = "", author = "", onPress }) => {


    return (

        <Box sx={{ justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column' }} my={2} mx={'auto'} onClick={() => { onPress(id, url) }}>
            <Button onClick={() => { onPress(id, url) }}>
                <Box justifyContent={'center'} alignItems={'center'} display={'flex'} flexDirection={'column'} my={2}>
                    <Box className="book" display={'flex'} flexDirection={'column'} >
                        <Box className="Rectangle">
                            <img src={image} height={'100%'} width={'100%'} />
                        </Box>
                        <Typography title={title} display={'table-cell'} textOverflow={'ellipsis'} className="title" >{title}</Typography>
                        <Typography title={author} textOverflow={'ellipsis'} className="author" >{author}</Typography>
                    </Box>
                </Box>
            </Button>
        </Box>
    )


}
export default BookCard