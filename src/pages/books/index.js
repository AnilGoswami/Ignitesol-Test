import { Box, Container, Grid, InputAdornment, OutlinedInput, Stack, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { useLocation, useNavigate, Link } from "react-router-dom"
import { getBookData } from '../../services/Services'
import InfiniteScroll from "react-infinite-scroll-component";
import BookCard from "../../components/ui/bookCard";
import { ReactComponent as Back } from '../../assets/images/Back.svg'
import { Search, Close } from "@mui/icons-material";


const Books = () => {

    //states
    const [page, setPage] = useState(1)
    const [bookList, setBookList] = useState([])
    const [hasMore, setHasMore] = useState(true)
    const [searchText, setSearchText] = useState("")

    const navigate = useNavigate();

    // get prameters from URL
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());


    useEffect(() => {
        //get data on load
        getData()
    }, [])


    useEffect(() => {

        // get data again on search text change
        if (searchText == "") {
            setBookList([])
        }

        getData()
    }, [searchText])

    const getData = () => {


        if (searchText != "") {
            //search with url
            getBookData(`?topic=${params.topic}&search=${searchText.replace(/ /g, '%20')}&mime_type=image/jpeg`, bindBooks);
        }
        else {
            // without search
            getBookData(`?topic=${params.topic}&page=${page}&mime_type=image/jpeg`, bindBooks);
        }
    }

    const bindBooks = (res) => {

        // bind books only if data available
        if (res.results.length > 0) {

            setPage(page + 1); //increase page size to load next page

            setBookList(searchText ? res.results : bookList.concat(res.results)) // search text available then direct assign searched data else concat it.
            setHasMore(res.count > (bookList.length + res.results.length))
        }
    }

    const openBook = (id, url) => {

        //get keys and try to search mime type by priority. 1. html, 2. text, 3. Zip
        // what ever is available will be open (zip will be downloaded).
        let keys = Object.keys(url);

        let selectedKey = "";
        selectedKey = keys.filter((key, index) => {
            return key.indexOf("html") > -1
        })

        if (selectedKey.length == 0) {
            selectedKey = keys.filter((key, index) => {
                return key.indexOf("text") > -1
            })

            if (selectedKey.length == 0) {
                selectedKey = keys.filter((key, index) => {
                    return key.indexOf("/zip") > -1 // because +zip is also available in mime type. 
                })
            }
        }

        window.location.href = url[selectedKey]
    }


    const searchBook = () => {
        setPage(1)
        setHasMore(false)
        setBookList([])
        // can be uncommented to reduce the API calling
        //setTimeout(() => {
        getData();
        //}, 1000);
    }


    const clearSearch = () => {

        setSearchText("")
        searchBook()

    }


    return (
        <Container>
            <Box sx={{ backgroundColor: '#ffffff' }} py={3} px={2} display={'flex'} justifyContent={'center'} flexDirection={'column'} position={'fixed'} height={80} zIndex={1} top={0} left={0} right={0}>
                <Stack
                    mb={2}
                    direction={'row'}
                    spacing={1}
                    alignItems={'center'}
                >
                    <Back height={20} onClick={() => { navigate('/') }} />
                    <Typography variant="h5" className="text-primary" >{params.title}</Typography>
                </Stack>
                <OutlinedInput className="txtSearch"
                    startAdornment={
                        <InputAdornment position="start">
                            <Search />
                        </InputAdornment>
                    }

                    endAdornment={
                        searchText ?
                            <InputAdornment position="end">
                                <Close onClick={() => { clearSearch(); }} />
                            </InputAdornment> : <></>
                    }

                    placeholder="Search" onKeyUp={() => { searchBook() }} onChange={(e) => { setSearchText(e.target.value) }} value={searchText} key={'txtSearch'} />
            </Box>

            <Box pt={15}>
                {bookList.length > 0 ? <InfiniteScroll
                    dataLength={bookList.length}
                    next={getData}
                    hasMore={hasMore}
                    loader={<Box><Typography variant="h6" textAlign={'center'} my={5}>Loading More Books...</Typography></Box>}
                    endMessage={<Box my={4}><Typography mb={1} variant="h6" textAlign={'center'}>That's All !</Typography><Link className="Back" to={`/`}><Back /></Link></Box>}
                >
                    <Grid container>
                        {bookList.map((book, index) => (
                            <Grid item xs={4} sm={3} md={3} lg={2} xl={2} >
                                <BookCard id={book.id} onPress={(id, url) => { openBook(id, url) }} key={index} url={book.formats} image={book.formats['image/jpeg']} author={book.authors[0] ? book.authors[0]["name"] : ''} title={book.title} />
                            </Grid>
                        ))}
                    </Grid>
                </InfiniteScroll>
                    : <Typography variant="h6" textAlign={'center'} my={5}>{searchText ? "No Results Found !" : "Loading Books..."}</Typography>
                }
            </Box>


        </Container>
    )

}
export default Books