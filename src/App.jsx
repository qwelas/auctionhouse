import Car from "./Car"
import Data from './assets/vehicles_dataset.json';

function App() {

  return (
    <div style={{ display: 'grid', placeItems: 'center' }}>
      {Data.map((car, index) => (
        <Car key={index} {...car} /> // For each car, render a Car component with its data as props
      ))}
    </div>
  );
}

export default App
