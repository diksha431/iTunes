import React, { Component } from "react";
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import {fade, withStyles } from "@material-ui/core/styles";
import { Card, CardContent } from "@material-ui/core";
import AppBar from '@material-ui/core/AppBar';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { Itunesapi, mediaTypes } from './Itunesapi';
import GridList from '@material-ui/core/GridList';
import Grid from '@material-ui/core/Grid';


class Itunes extends Component {  
    constructor(props) 
        {
            super(props);
            this.state = {
                searchText: '',
                searchMedia: 'all',
                searchResults: []
            }
            this.startSearch = this.startSearch.bind(this);
        }
    
        handleSearchTextChange = event =>
            this.setState({ searchText: event.target.value });
    
        handleSearchMediaChange = event =>
            this.setState({ searchMedia: event.target.value });
        
        async startSearch(searchText, searchMedia) {
            const response = await Itunesapi(searchText, searchMedia);
            this.setState({ searchResults: response.results });
        }

    render()
    {
        const Item = ({ kind, artistName, trackName, artworkUrl100 }) => (
            <Card style={{marginBottom:"2em",marginRight:"2em",height:"15em",width:"12em"}}>
                <div > <Typography variant="p" style={{color:"darkblue", marginLeft:"1rem"}}>
                    {kind} </Typography>
                </div>
                <CardContent> <Typography variant="p">
                    {artistName} </Typography>
                </CardContent>
                <CardContent> <Typography variant="p" style={{color:"crimson"}}>
                    {trackName} </Typography>
                </CardContent>
                <div  style={{marginLeft:"1em"}}>
                    <img src={artworkUrl100} />
                </div>
            </Card>
        );
        const ItemsList = ({ items }) => { 
            const itemsArray = items.map((item, index) => <Item key={index} {...item} />);
            return <Container maxWidth="md"  style={{marginTop:"5em"}}>
                <Grid container spacing={1} >
                <Grid container item xs={12} spacing={3} >
                    {itemsArray}       
                </Grid>
                </Grid>
            </Container>
        };

        const { mediaTypes, startSearch } = this.props;
		const { searchText, searchMedia } = this.state;
         
        const useStyles = withStyles((theme) => ({
            grow: {
              flexGrow: 1,
            },
            search: {
              position: 'relative',
              borderRadius: theme.shape.borderRadius,
              backgroundColor: fade(theme.palette.common.white, 0.15),
              '&:hover': {
                backgroundColor: fade(theme.palette.common.white, 0.25),
              },
              marginRight: theme.spacing(2),
              marginLeft: 0,
              width: '100%',
              [theme.breakpoints.up('sm')]: {
                marginLeft: theme.spacing(3),
                width: 'auto',
              },
            },
            searchIcon: {
              padding: theme.spacing(0, 2),
              height: '100%',
              position: 'absolute',
              pointerEvents: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            },
            gridList: {
                width: 500,
                height: 450,
            },  
        }));
              
        const { searchResults } = this.state;
		
        return(
            <div style={{height:"240rem",width: "76.6rem",backgroundImage:"url('i2.jpg')",backgroundSize:"cover"}}>
                <div style={{backgroundColor:"#120f24",height:"4rem"}}>
                    <Typography variant="h4" style={{color:"white",padding:"1rem"}}>iTunes</Typography>
                </div>
                <Typography variant="h5" style={{color:"white",paddingLeft:"22rem",paddingTop:"4rem"}}>Search :</Typography><br/>
                <Container maxWidth="xs"  >
                    <div className={useStyles.grow}>
                    <AppBar position="static" style={{backgroundColor:"silver"}}>
                        <div className={useStyles.search}>
                            <div className={useStyles.searchIcon}>
                                <SearchIcon style={{cursor:"pointer"}}
                                    onClick={() => this.startSearch(searchText, searchMedia)}
                                />
                                <InputBase
                                    placeholder="Search…"
                                    type="text"
                                    value={searchText}
                                    onChange={this.handleSearchTextChange.bind(this)}
                                    inputProps={{ 'aria-label': 'search' }}
                                />
                            </div>
                        </div>
                    </AppBar>
                    </div>
                </Container>
                <div>
                    <ItemsList items={searchResults} />
				</div>
            </div>

        )
    }
}
export default Itunes;
