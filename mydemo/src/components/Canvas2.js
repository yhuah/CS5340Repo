import React from "react";
import ReactDOM from "react-dom";
import CanvasDraw from "react-canvas-draw";
import classNames from "./canvas2.css";

// reference "https://github.com/mBeierl/react-canvas-draw/tree/master/demo/src

export default class Demo2 extends React.Component {
    state = {
        color: "#ffc600",
        width: 400,
        height: 400,
        brushRadius: 10,
        lazyRadius: 12,
    };
    componentDidMount() {
        // let's change the color randomly every 2 seconds. fun!
        window.setInterval(() => {
            this.setState({
                color: "#" + Math.floor(Math.random() * 16777215).toString(16)
            });
        }, 2000);
    }
    render() {
        return (
            <div>
                <h1>React Canvas Draw</h1>
                <iframe
                    frameBorder="0"
                    scrolling="0"
                    width="160px"
                    height="30px"
                />

                <h2>Save & Load your draw canvas</h2>
                <p>
                    Here you can draw, save, undo, and clear your drawing. Your saved drawing
                    will be show immediately after you click save.
                    You can also edit the width, height, brush size and lazy radius figures.
                    <span>{`<CanvasDraw loadTimeOffset={10} />`}</span>
                </p>
                <p>Try it out! Draw something, hit "Save" and then "Load".</p>
                <div className={classNames.tools}>
                    <button className="btn btn-primary"
                        onClick={() => {
                            localStorage.setItem(
                                "savedDrawing",
                                this.saveableCanvas.getSaveData()
                            );
                        }}
                    >
                        Save
                    </button>
                    <button className="btn btn-danger"
                        onClick={() => {
                            this.saveableCanvas.clear();
                        }}
                    >
                        Clear
                    </button>
                    <button className="btn btn-warning"
                        onClick={() => {
                            this.saveableCanvas.undo();
                        }}
                    >
                        Undo
                    </button>
                    <div>
                        <label>Width:</label>
                        <input
                            type="number"
                            value={this.state.width}
                            onChange={e =>
                                this.setState({ width: parseInt(e.target.value, 10) })
                            }
                        />
                    </div>
                    <div>
                        <label>Height:</label>
                        <input
                            type="number"
                            value={this.state.height}
                            onChange={e =>
                                this.setState({ height: parseInt(e.target.value, 10) })
                            }
                        />
                    </div>
                    <div>
                        <label>Brush-Radius:</label>
                        <input
                            type="number"
                            value={this.state.brushRadius}
                            onChange={e =>
                                this.setState({ brushRadius: parseInt(e.target.value, 10) })
                            }
                        />
                    </div>
                    <div>
                        <label>Lazy-Radius:</label>
                        <input
                            type="number"
                            value={this.state.lazyRadius}
                            onChange={e =>
                                this.setState({ lazyRadius: parseInt(e.target.value, 10) })
                            }
                        />
                    </div>
                </div>
                <CanvasDraw
                    ref={canvasDraw => (this.saveableCanvas = canvasDraw)}
                    brushColor={this.state.color}
                    brushRadius={this.state.brushRadius}
                    lazyRadius={this.state.lazyRadius}
                    canvasWidth={this.state.width}
                    canvasHeight={this.state.height}
                />
                <p>
                    canvas to load & show your saved drawing.
                </p>
                <button
                    onClick={() => {
                        this.loadableCanvas.loadSaveData(
                            localStorage.getItem("savedDrawing")
                        );
                    }}
                >
                </button>
                <CanvasDraw
                    disabled
                    hideGrid
                    ref={canvasDraw => (this.loadableCanvas = canvasDraw)}
                    saveData={localStorage.getItem("savedDrawing")}
                />

            </div>
        );
    }
}
