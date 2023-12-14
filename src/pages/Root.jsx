import AppNavbar from '../components/AppNavbar/AppNavbar';
import AppFooter from '../components/AppFooter';
import AppLayout from '../layouts/AppLayout';

function Root() {
  return (
    <div className='d-flex flex-column min-vh-100'>
      <AppNavbar />
      <div className='flex-grow-1'>
        <AppLayout />
      </div>
      <AppFooter />
    </div>
  );
}

export default Root;
