import React,{Component} from 'react';
import axios from 'axios'


//reference https://www.techiediaries.com/react-json-fetch-rest-api-bootstrap/
//reference https://github.com/shivampdesai/recipe-app/blob/master/src/App.js
//https://medium.com/@shivamdesai_65083/fetching-data-from-rest-apis-with-react-25a2f6db5d7a

class SearchRecipe extends Component{

    constructor(props){
        super(props);
        this.state={
            query:'',
            recipes:[]
        }
    }


   /*
    async componentDidMount() {
        const url = "https://api.randomuser.me/"
        const response = await fetch(url);
        const data = await response.json();
        this.setState ({person:data.results[0], loading:false});
        console.log(data.results[0])


    };*/
    componentDidMount() {
        const list = window.localStorage.getItem('recipes');
        const parsedList = JSON.parse(list);
        if(list == null){
            return false
        }
        else{
            this.setState({
                recipes: parsedList,
            })
            console.log(this.state.recipes);
        }
    }


    getRecipes(){
        fetch(`https://forkify-api.herokuapp.com/api/search?&q=${this.state.query}`)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                this.setState({
                    recipes: data.recipes
                });

                console.log(data);
                localStorage.setItem('recipes',JSON.stringify(data.recipes))


            })
    }






   keywordChanged = event =>{
       console.log(event.target.value)
       this.setState({query: event.target.value})
   };

   searchRecipe = async () =>{
       console.log(this.state.query)
       const res = await axios(`https://forkify-api.herokuapp.com/api/search?&q=${this.state.query}`);
       /*axios.get(`https://forkify-api.herokuapp.com/api/search?&q=${this.state.query}`)
           .then(({ data }) => {
               this.setState({
                   recipes: data.data
               })
           })*/

       /*
       console.log(res)
       fetch (`https://forkify-api.herokuapp.com/api/search?&q=${this.state.query}`)
           .then(res => res.json()).then(json=> {this.setState({
           recipes: json.data
       });
           })*/};


    render(){
        return (
            <div>
                <h2>Search Recipes</h2>
                <div className="input-group">
                    <input value = {this.state.query}
                           onChange = {this.keywordChanged}
                           className="form-control"
                           placeholder="keyword"/>
                    <div className="input-group-append">
                        <button

                            onClick ={()=>this.getRecipes()}
                            className="btn btn-primary">
                            get Ingredient
                        </button>
                    </div>
                </div>
               <div>
                   {this.state.recipes.map(res => <div> <h3><a href={res.source_url}> {res.title} </a> </h3> <img src={res.image_url}/> </div>)}

               </div>
            </div>

        )
    }
}



export default SearchRecipe;
