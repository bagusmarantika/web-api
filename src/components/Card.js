import { Box, ButtonBase, Grid } from '@material-ui/core'
import { Favorite, FavoriteBorder } from '@material-ui/icons'
import Rating from '@material-ui/lab/Rating';
import React, { useState } from 'react'
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import '../styles/card.css'

const Card = ({image, store, name, price, measure}) => {
    const [favorite, setFavorite] = useState(false)
    const [value, setValue] = useState(0);
    const handleClickFavorite = () => {
        setFavorite(!favorite)
    }
    return (
        <div className="card">
            <div className="card-img">
                {image.map((d, index) =>{
                    return (
                        <div key={index}>
                            <Zoom>
                                <img className="" src={`https://apis-dev.aspenku.com${d.thumbnail_image}`} alt={`https://apis-dev.aspenku.com${d.alternative_text}`} />
                            </Zoom>
                        </div>  
                    ) 
                })}
                <div className="card-like">
                    <span>
                        <Grid>
                        <ButtonBase onClick={handleClickFavorite}>
                            {favorite ? <Favorite style={{fill: 'red'}}/>:<FavoriteBorder />}
                        </ButtonBase>
                        </Grid>
                    </span>
                </div>
            </div>
            <div className="card-rating">
                <span>
                <Box component="fieldset" mb={3} borderColor="transparent">
                    <Rating
                    name="simple-controlled"
                    value={value}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                    }}
                    />
                </Box>
                </span>
            </div>
            <div className="card-store">
                <h5>{store}</h5>
            </div>
            <div className="card-name">
                <h3>{name}</h3>
            </div>
            <div className="card-price">
                $ {price}
                <span>/ {measure}</span>
            </div>
        </div>
    )
}

export default Card
