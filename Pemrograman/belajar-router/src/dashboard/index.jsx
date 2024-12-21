import Navbar from './navbar.jsx'
import HeroComponent from './heroComponent.jsx'
import AccountStats from './accountStats.jsx'
import Table from './table.jsx';


function Index(){
    return (
      <div className="bg-slate-50">
          <Navbar></Navbar>
          <HeroComponent></HeroComponent>
          <AccountStats></AccountStats>
          <Table></Table>
      </div>
    );

}
// const Index = () => {

// };

export default Index;
