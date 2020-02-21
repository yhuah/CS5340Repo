import React,{Component} from 'react';
import './App.css';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';

import SimpleMenu from './components/MenuDemo'
import Todo from  './components/Todo'

import add from './add.png'
import Demo2 from './components/Canvas2'

// reference https://programmingwithmosh.com/react/localstorage-react/

import Header from "./components/Header";
import SearchRecipe from "./components/SearchRecipe";


class App extends Component{

    state ={
        user:'',
        rememberMe:false
    }

    componentDidMount() {
        const rememberMe = localStorage.getItem('rememberMe') === 'true';
        const user = rememberMe ? localStorage.getItem('user') : '';
        this.setState({ user, rememberMe });
    }

    handleChange = (event) => {
        const input = event.target;
        const value = input.type === 'checkbox' ? input.checked : input.value;

        this.setState({ [input.name]: value });
    };

    handleFormSubmit = () => {
        const { user, rememberMe } = this.state;
        localStorage.setItem('rememberMe', rememberMe);
        localStorage.setItem('user', rememberMe ? user : '');
    };



    render(){

        return (
            <div>
            <Header/>
          <div>

            <h1>A text label: TodoList</h1>
              <form  onSubmit = {this.handleFormSubmit}>
                   <input  name="user" type="text" placeholder ="Enter user name" value={this.state.user} onChange={this.handleChange}  />
                  <label>
                      <input name="rememberMe" checked={this.state.rememberMe} onChange={this.handleChange} type="checkbox" /> check me
                  </label>
                <Tooltip title="Click it and submit a user" arrow>

                    <Button  type="submit"   ><img src={add} alt="Add"/></Button>
                </Tooltip>
              </form>
          </div>

              { /*
            <FormControlLabel
                control={
                    <Checkbox
                        name="SomeName"
                        value="SomeValue"
                    />
                }
                label="MyCheckBox"/>
             </div> >*/}



              <SimpleMenu/>
                <Todo/>

                <div><Demo2/></div>

               <div>
                   <p>Here you can click the get ingredient button to load recipes   </p>
                <div> <SearchRecipe/></div>
               </div>




            </div>


        );
    }
}



export default App;
