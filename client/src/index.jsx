import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import Display from "./components/Display.jsx";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Header from "./components/Header.jsx";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      thumbnail: "",
      subscriberCount: "",
      videoCount: "",
      customUrl: ""
    };
    this.handleSearchedYoutuber = this.handleSearchedYoutuber.bind(this);
  }

  componentDidMount() {
    let bigYoutubers = [
      "pewdiepie",
      "corycotton",
      "jakepaulproductions",
      "tseries",
      "MrBeast6000",
      "ninjashyper"
    ];
    var randomYoutuber =
      bigYoutubers[Math.floor(bigYoutubers.length * Math.random())];
    axios
      .get("/getYoutuberData", {
        params: { username: randomYoutuber }
      })
      .then(data => {
        console.log(data.data[0]);
        this.setState({
          username: data.data[0].snippet.title,
          thumbnail: data.data[0].snippet.thumbnails.default.url,
          subscriberCount: data.data[0].statistics.subscriberCount,
          videoCount: data.data[0].statistics.videoCount,
          customUrl: randomYoutuber
        });
      })
      .catch(err => {
        console.log(err);
      });

    // setInterval(() => {
    //   console.log(this.state);
    //   axios
    //     .get("/getYoutuberData", {
    //       params: { username: this.state.customUrl }
    //     })
    //     .then(data => {
    //       console.log(data.data[0]);
    //       this.setState({
    //         username: data.data[0].snippet.title,
    //         thumbnail: data.data[0].snippet.thumbnails.default.url,
    //         subscriberCount: data.data[0].statistics.subscriberCount,
    //         videoCount: data.data[0].statistics.videoCount
    //       });
    //     })
    //     .catch(err => {
    //       console.log(err);
    //     });
    // }, 2000);
  }

  handleSearchedYoutuber(entry) {
    axios
      .get("/getYoutuberData", {
        params: { username: entry }
      })
      .then(data => {
        this.setState({
          username: data.data[0].snippet.title,
          thumbnail: data.data[0].snippet.thumbnails.default.url,
          subscriberCount: data.data[0].statistics.subscriberCount,
          videoCount: data.data[0].statistics.videoCount,
          customUrl: entry
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <div>
        <Container>
          <Header />

          <div style={{ paddingTop: 30 }}>
            <Grid container justify="center" alignItems="center">
              <Typography variant="h4" style={{ paddingBottom: 10 }}>
                YouTube Subscriber Count
              </Typography>
            </Grid>
            <Grid container justify="center" alignItems="center">
              <Typography variant="subtitle2" style={{ paddingBottom: 10 }}>
                Real-time count for YouTube Subscribers and media statistics
              </Typography>
            </Grid>
            <Display
              username={this.state.username}
              thumbnail={this.state.thumbnail}
              subscriberCount={this.state.subscriberCount}
              videoCount={this.state.videoCount}
              handleSearchedYoutuber={this.handleSearchedYoutuber}
              customUrl={this.state.customUrl}
            />
          </div>
        </Container>
      </div>
    );
  }
}

var mountNode = document.getElementById("app");
ReactDOM.render(<App name="Kevin" />, mountNode);
