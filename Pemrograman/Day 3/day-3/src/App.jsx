import ProductCard from './ProductCard';
import ProductList from './ProductList';
import BelajarState from './BelajarState';
import BSITaskManager from './BSITaskManager';
import BelajarContext from './BelajarContext';
import BelajarContextLocalStorage from './BelajarContextLocalStorage';
import ToDo from './todo'


function App() {
  return (
    <div>
      <ProductCard />
      <ProductList />
      <BelajarState />
      <BSITaskManager />
      <BelajarContext />
      <BelajarContextLocalStorage />
      <ToDo />
    </div>
  );
}

export default App;
