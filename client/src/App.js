
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Footer from './components/footer';
import Login from './components/Login';
import Dashboard from './components/dashboard';
import { AssetTransactions } from './components/assetTransaction';
import Home from './components/home';
import Transaction from './components/transaction';
import { EditTransaction } from './components/editTransaction';

function App() {
  return (
    <>
     <Router>
       <Route path='/' exact component={Login}/>
       <Route path='/transaction' exact component={Transaction}/>
       <Route path='/home' exact component={Home}/>
       <Route path='/dashboard' exact component={Dashboard}/>
       <Route path='/assets' exact component={AssetTransactions}/>
       <Route path='/editTransaction' exact component={EditTransaction}/>


     </Router>
    
    <Footer/>
    </>
  );
}

export default App;
