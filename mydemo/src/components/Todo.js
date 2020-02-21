
import React, { Component } from 'react'
import uuid from "uuid";
import './todo.css'
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';



class Todo extends Component {

    constructor(props) {
        super(props)

        this.input=React.createRef()
        this.state={
            list:[],
        }
    }

    addTask=()=>{

        const Items={
            id:uuid.v4(),
            value:this.input.current.value,
            Date: new Date().toUTCString()
        };

        if(localStorage.getItem('list')==null){
            const list=[]
            list.push(Items);
            localStorage.setItem("list",JSON.stringify(list))
        }
        else{
            const list=JSON.parse(localStorage.getItem('list'))
            list.push(Items)
            localStorage.setItem("list",JSON.stringify(list))
        }
        this.setState({
            list:JSON.parse(localStorage.getItem('list'))
        });
    }

    componentDidMount() {
        const list = window.localStorage.getItem('list');
        const parsedList = JSON.parse(list);
        if(list == null){
            return false
        }
        else{
            this.setState({
                list: parsedList,
            })
            console.log(this.state.list);
        }
    }

    deleteItem=(event)=> {

        let index = event.target.getAttribute('data-key')
        let listValue=JSON.parse(localStorage.getItem('list'));
        listValue.splice(index,1)
        this.setState({list:listValue});
        localStorage.setItem('list',JSON.stringify(listValue))
    }



    render() {
        return (
            <div className="main-container">
                <h1>Todo</h1>
                <hr/>
                <div className="container">
                    <input type="text" placeholder="Add tasks here" ref={this.input}></input>
                    <Tooltip title="Add a text here" arrow>
                    <button onClick={this.addTask} className="button" >Add</button>
                    </Tooltip>
                    <ol>
                        {
                            this.state.list.map((item,index)=>
                            {
                                return(<li key={item.id}> {item.value}
                                    <Button  className="button"  variant = "contained" startIcon={<DeleteIcon /> } color="secondary"  value="delete" data-key={index} onClick={this.deleteItem}>Delete</Button></li>)
                            })
                        }
                    </ol>
                </div>


            </div>
        )
    }
}



export default Todo
