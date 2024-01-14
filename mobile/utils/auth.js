// auth.js

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
          // Handle login for 'citoyen' role
          console.log('Logged in as citoyen');
        } else if (responseData.role.id === 1) {
          // Handle login for 'admin' role
          console.log('Logged in as admin');
        }
      } else {
        console.error('Error while login');
        // Handle login failure
      }
    } catch (error) {
      console.error('Communication error with the server.', error);
      // Handle communication error with the server
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
        // Handle successful signup
      } else {
        console.error('Error while creating user.');
        // Handle signup failure
      }
    } catch (error) {
      console.error('Communication error with the server.', error);
      // Handle communication error with the server
      throw error;
    }
  };
  
  const logoutUser = async () => {
    // Implement logout logic if needed
    // For example, clear user session or tokens
    console.log('User logged out.');
  };
  
  export { loginUser, signUpUser, logoutUser };
  