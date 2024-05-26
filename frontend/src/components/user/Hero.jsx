import { Container, Card, Button } from 'react-bootstrap';

const Hero = () => {
  return (
    <div className=' py-5'>
      <Container className='d-flex justify-content-center'>
        <Card className='p-5 d-flex flex-column align-items-center hero-card bg-dark w-75'>
          <h1 className='text-center mb-4 text-white'>Welcome sample User👋</h1>
          <p className='text-center mb-4 text-white '>
          Greetings and welcome to my React Application, We are delighted to see you as a part of our community.
          </p>
          <p className='text-center mb-4 text-white '>
            Feel free to discover, interact, and collaborate with us to create something wonderful 
          </p>
          <div className='d-flex'>
            <Button variant='primary' href='/login' className='me-3'>
              Sign In
            </Button>
            <Button variant='secondary' href='/register'>
              Register
            </Button>
          </div>
        </Card>
      </Container>
    </div>
  );
};

export default Hero;