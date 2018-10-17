import React from "react";
import ReactDOM from "react-dom";
import { Header, TileView, Photo, Frame } from "./components";
import "./styles.css";

class App extends React.Component {
  state = {
    images: [],
    currentPhotoId: null
  };
  componentDidMount() {
    fetch("https://picsum.photos/list")
      .then(response => response.json())
      .then(data => {
        this.setState({
          images: data.slice(0, 30)
        });
      });
  }
  render() {
    console.log(this.state);
    return (
      <div>
        <Header>
          <h1>Picsum</h1>
        </Header>
        <TileView spacing={20}>
          {this.state.images.map(image => {
            const isActive = this.state.currentPhotoId === image.id;
            return (
              <Photo
                key={image.id}
                src={`https://picsum.photos/1000/1000?images=${image.id}`}
                isActive={isActive}
                onClick={() =>
                  this.setState({ currentPhotoId: isActive ? null : image.id })
                }
                alt=""
              />
            );
          })}
        </TileView>
        {this.state.currentPhotoId !== null && <Frame />}
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
