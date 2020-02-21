import {SketchField, Tools} from 'react-sketch';
import React from 'react'

export default class SketchFile extends React.Component {

    userData;
    constructor(props) {
        super(props);

        this.onDrawing = this.onDrawing.bind(this);

        this.state = {
        }
    }

    onDrawing(e){
        this.setState()
    }




    render() {
        return (

            <SketchField className="sketch" width='1024px'
                         height='768px'
                         tool={Tools.Pencil}
                         lineColor='black'
                         lineWidth={3}/>

        )
    }
}
