import React from "react";
import { useState, useEffect } from "react";
import md5 from "js-md5";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import Container from "@material-ui/core/Container";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import axios from "axios";

const apikey = "d3117b862aa475e233f64f8d0198832b";
const ts = "mario";
const secret = "5d9c47f0d9b15b2bdc7f509f290056d784e55966";
const concatenacion = ts + secret + apikey;

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
});

const Marvel = () => {
  const [personajes, setPersonajes] = useState([]);

  const classes = useStyles();

  useEffect(() => {
    if (!navigator.online) {
      if (localStorage.getItem("personajes") === null) {
        setPersonajes([
          {
            name: "Error while connecting with API. Please try again later",
            description: "Try again later",
            thumbnail: {
              path:
                "https://blogs.unsw.edu.au/nowideas/files/2018/11/error-no-es-fracaso",
              extension: "jpg",
            },
          },
        ]);
      } else {
        setPersonajes(localStorage.getItem("personajes"));
      }
    } else {
      const params = { apikey: apikey, hash: md5(concatenacion), ts: ts };
      /*fetch(
    `https://gateway.marvel.com:443/v1/public/characters?apikey=${encodeURIComponent(
      params.apikey
    )}&hash=${encodeURIComponent(params.hash)}&ts=${encodeURIComponent(
      params.ts
    )}`
  ).then((response) => {
    setPersonajes(response.data.data.results);
    localStorage.setItem(response.data.data.results);
  });*/

      axios
        .get("https://gateway.marvel.com:443/v1/public/characters", {
          params: { apikey: apikey, hash: md5(concatenacion), ts: ts },
        })
        .then((response) => {
          setPersonajes(response.data.data.results);
          localStorage.setItem("personajes", response.data.data.results);
        });
    }
  }, []);

  return (
    <Container fixed>
      <Typography
        align="center"
        style={{ fontFamily: "Roboto" }}
        variant="h2"
        component="h2"
      >
        Marvel's Characters
      </Typography>
      <br></br>
      <Grid container spacing={3}>
        {personajes.map((personaje) => (
          <Grid item xs={4}>
            <Card className={classes.root}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  alt="Marvel Character"
                  height="140"
                  image={
                    personaje.thumbnail.path +
                    "." +
                    personaje.thumbnail.extension
                  }
                  title="Marvel Character"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {personaje.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {personaje.description === ""
                      ? "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut bibendum felis nec dui ultrices, vel congue orci interdum. Pellentesque nunc nisi, egestas eu sagittis maximus, venenatis ac est. Nullam sed dignissim nisi. In eu mi non velit laoreet tristique. Cras varius felis facilisis, aliquet orci vitae, egestas quam. Interdum et malesuada fames ac ante ipsum primis in faucibus. Cras et nisi sollicitudin, luctus dui nec, laoreet nisl."
                      : personaje.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button
                  size="small"
                  color="primary"
                  href={personaje.urls[0].url}
                  target="_blank"
                >
                  See comic info
                </Button>
                <Button
                  size="small"
                  color="primary"
                  href={personaje.urls[1].url}
                  target="_blank"
                >
                  Learn More
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Marvel;
