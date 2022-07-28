import {Nav, Bio,Gallery} from './components';
import '../src/Responsive.css'
import '../src/App.css';

const App =()  => {
  return (

    <>
        <Nav/>
        <div className="container">
          <Bio/>
          <Gallery/>
        </div>
    </>
  );
}

export default App;
