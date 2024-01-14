
const loginUser = async (email, password) => {
    try {
      const response = await fetch('http://localhost:8085/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData.role.id);
        if (responseData.role.id === 2) {
          console.log('Logged in as citoyen');
        } else if (responseData.role.id === 1) {
          console.log('Logged in as admin');
        }
      } else {
        console.error('Error while login');
      }
    } catch (error) {
      console.error('Communication error with the server.', error);
      throw error;
    }
  };
  
  const signUpUser = async (userData) => {
    try {
      const response = await fetch('http://localhost:8085/utilisateurs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
  
      if (response.ok) {
        console.log('User created successfully.');
      } else {
        console.error('Error while creating user.');
      }
    } catch (error) {
      console.error('Communication error with the server.', error);
      throw error;
    }
  };
  
  const logoutUser = async () => {

    console.log('User logged out.');
  };
  
  export { loginUser, signUpUser, logoutUser };
  