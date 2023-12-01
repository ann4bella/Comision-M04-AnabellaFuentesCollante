import { Card } from 'react-bootstrap';

import MyNavbar from '../src/components/Navbar';


const DefaultLayout = (props) => {
  const children = props.children;

    return (
        <>
            <MyNavbar />
            
            <div style={{ padding: 20 }}>
                <Card>
                    { children }
                </Card>
            </div>
        </>
    );
}

export default DefaultLayout
