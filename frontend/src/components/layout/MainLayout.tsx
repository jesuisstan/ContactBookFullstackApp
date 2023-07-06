import { Outlet } from 'react-router-dom';
import Menu from './Menu';
import Footer from './Footer';
import { User } from '../../types/User';

const MainLayout = ({ user }: { user: User }) => {
  return (
    <div>
      <Menu user={user} />
      <div style={{ marginTop: '92px', marginBottom: '90px' }}>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};
export default MainLayout;
