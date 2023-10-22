import './App.css';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Summarizer from './components/Summarizer';
import Text from './components/Text';

function App() {
  return (
    <div className='background'>
        <Navbar/>
        <Text/>
        <Summarizer/>
        <Footer/>
    </div>
  );
}

export default App;
