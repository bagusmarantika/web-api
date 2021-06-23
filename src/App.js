import React, { Component } from 'react'
import Table from './components/Table'
import './styles/app.css'

const axios = require('axios');
const query = require('querystring')
const apiURL = 'https://apis-dev.aspenku.com/api/v1/product';
const apiToken = 'QXNwZW5rdTpBc3Blbmt1';
const auth = 'Basic '+ apiToken;

const headers  = {
  "Content-Type": "application/json",
  "Authorization": auth
}

const params = {
  limit: 100,
  skip: 0,
  price: {"min":"1","max":"1000"}
}

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: []
    }
  }

  componentDidMount() {
    axios.get(apiURL, {headers: headers }, query.stringify({params}))
    .then(res => res.data.data.rows)
    .then(datas => this.setState({'data' : datas}))
    .catch((error) => {
      console.log('error' + error)
    })

  }

  render() {
    console.log("dataa: ", this.state.data)
    return (
      <div className="App">
        <Table data = {this.state.data}/>
      </div>
    )
  }
}


// +++===========================+++


// import axios from "axios";
// import React, { useMemo, useState, useEffect } from "react";
// import Table from './components/Tables'

// function App() {

//   const query = require('querystring')
//   const apiURL = 'https://apis-dev.aspenku.com/api/v1/product';
//   const apiToken = 'QXNwZW5rdTpBc3Blbmt1';
//   const auth = 'Basic '+ apiToken;

//   const headers  = {
//     "Content-Type": "application/json",
//     "Authorization": auth
//   }

//   const params = {
//     limit: 100,
//     skip: 0,
//     price: {"min":"1","max":"1000"}
//   }

//   const [data, setData] = useState([]);

//   useEffect(() => {
//     (async () => {
//       const result = await axios.get(apiURL, {headers: headers }, query.stringify({params}))
//       setData(result.data.data.rows);
//     })();
//   }, []);
//   const columns = useMemo(
//     () => [
//       {
//         Header: "Id",
//         accessor: "id"
//       },
//       {
//         Header: "Nama",
//         accessor: "name"
//       },
//       {
//         Header: "Harga",
//         accessor: "sell_price"
//       },
//       {
//         Header: "Berat",
//         accessor: "unit_measure"
//       },
//       {
//         Header: "Foto",
//         accessor: "SpreeProductImages.main_image",
//         maxWidth: 70,
//         minWidth: 70,
//         Cell: props => <img src={props} alt={''}/>
//       },
//       {
//         Header: "Toko",
//         accessor: "SpreeStore.store_name"
//       }
//     ]
//   );
//   return(
//     <div className="App">
//       <Table columns={columns} data={data} />
//     </div>
//   )
// }

// export default App;