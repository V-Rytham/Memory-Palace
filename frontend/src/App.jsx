import {
  useSelector,
  useDispatch
} from "react-redux";

import {
  Routes,
  Route,
  Navigate,
  useLocation
} from "react-router-dom";


import axios from "axios";
import { useEffect } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


import CreateMemory from "./pages/CreateMemory";
import Landing from "./pages/Landing";
import Recall from "./pages/Recall";
import Login from "./pages/Login";
import Signup from "./pages/Signup";


import {
  login,
  logout
} from "./redux/slices/authSlice.js";







function ProtectedRoute({ children }) {


  const user = useSelector(
    state => state.auth.user
  );


  const location = useLocation();



  useEffect(() => {


    if (user === null) {


      toast.error(
        "Please login to access your Memory Palace"
      );


    }


  }, [user]);





  if (!user) {

    return (

      <Navigate

        to="/login"

        replace

        state={{
          from: location.pathname
        }}

      />

    );

  }



  return children;


}









function App() {


  const dispatch = useDispatch();



  const user = useSelector(
    (state) => state.auth.user
  );






  useEffect(() => {


    const fetchMe = async () => {


      try {


        const response = await axios.get(

          "https://memory-palace-6pf8.onrender.com/api/auth/me",

          {
            withCredentials: true
          }

        );




        dispatch(

          login(

            response.data.data.user || null

          )

        );



      }

      catch (error) {


        dispatch(
          logout()
        );


      }


    };




    fetchMe();



  }, [dispatch]);









  if (user === undefined) {


    return (

      <h1>

        Loading...

      </h1>

    );


  }









  return (


    <>


      <Routes>






        <Route

          path="/login"

          element={

            user

              ?

              <Navigate to="/landing" />

              :

              <Login />

          }

        />








        <Route

          path="/signup"

          element={

            user

              ?

              <Navigate to="/landing" />

              :

              <Signup />

          }

        />









        <Route

          path="/landing"

          element={


            <ProtectedRoute>

              <Landing />

            </ProtectedRoute>


          }

        />








        <Route

          path="/create-memory"

          element={


            <ProtectedRoute>

              <CreateMemory />

            </ProtectedRoute>


          }

        />









        <Route

          path="/recall"

          element={


            <ProtectedRoute>

              <Recall />

            </ProtectedRoute>


          }

        />









        <Route

          path="*"

          element={

            <Navigate

              to={

                user

                  ?

                  "/recall"

                  :

                  "/login"

              }

            />

          }

        />




      </Routes>








      <ToastContainer

        position="top-right"

        autoClose={2500}

        theme="dark"

      />



    </>


  );


}



export default App;