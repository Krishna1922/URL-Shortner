import logo from './logo.svg';
import './App.css';


export default function MyApp() {
  return (
    <div className='middle'>
      <div className='content'>
        <h1>Welcome to URL shortner</h1>
        <input  name="myInput" className='text-box'/>
        <button className='butoon'>
          Generate
        </button>
      </div>
      
    </div>
  );
}
