import React from "react";
import { useSearchParams, useNavigate, json, redirect } from "react-router-dom";
import Profile from "../Components/userProfile/Profile";
import Address from "../Components/userProfile/Address";
import MainScreen from "../Components/UI/MainScreen";
import { getAuthToken } from "../util/auth";
const UserProfilePage = () => {
  const [searchParams] = useSearchParams();
  const profileMode = searchParams.get('mode');

  return (
    <MainScreen title="EDIT PROFILE">
      { profileMode === 'profile' ? <Profile/> : <Address/>}
    </MainScreen>
  )
};

export default UserProfilePage;

export async function loader() {
  const token = getAuthToken();
  const response = await fetch('http://127.0.0.1:8000/user/address/', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${token}` 
    }, 
  })
  if(!response.ok){
    //...
  }else {
    const resData = await response.json();
    return resData;
  }
}

export async function action({request}) {
  const searchParams = new URL(request.url).searchParams;
  const mode = searchParams.get('mode');

  if(mode!== 'profile' && mode !== 'address') {
    throw json({message: 'Unsupported mode.'}, {status: 422});
  }

    let response = null;
    const token = getAuthToken();
    const data = await request.formData();
    if(mode === 'profile'){
        // const authData = {
        //     username: data.get('username'),
        //     password: data.get('password'),
        // }
        // response = await fetch('http://localhost:8000/account/login/ ', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(authData)
        // });
    }else if(mode === 'address') {
        const authData = {
            street_name: data.get('street_name'),
            street_no: data.get('street_no'),
            government: data.get('government'),
            district: data.get('district'),
            house_no: data.get('house_no'),
            apartment_no: data.get('apartment_no'),
            floor_no: data.get('floor_no'),
            additional_info: data.get('additional_info'),
        }
        // console.log(authData);
        
        response = await fetch('http://127.0.0.1:8000/user/address/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}` 
            },
            body: JSON.stringify(authData)
        });
    }

    if(response.status === 422 || response.status === 401) {
      return response;
    }

    if(!response.ok) {
      // throw json({message: 'Could not authenticate user.'}, {status: 500});
      return response;
    }

    if(mode === 'address'){
      const resData = await response.json();
      console.log("tmam");
      // console.log("ana response",response);
      // console.log("ana resData",resData);
      return null;
    }  
  // }else if(mode === 'register'){
  //     return redirect('/auth?mode=login');
  // }

} 


















// import React, { useState, useEffect } from "react";
// import { Form, Button, Row, Col } from "react-bootstrap";
// import MainScreen from "../../components/MainScreen";
// import "./ProfileScreen.css";
// import { useDispatch, useSelector } from "react-redux";
// import { updateProfile } from "../../actions/userActions";
// import Loading from "../../components/Loading";
// import ErrorMessage from "../../components/ErrorMessage";

// const UserProfilePage = ({ location, history }) => {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [pic, setPic] = useState();
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [picMessage, setPicMessage] = useState();

//   const dispatch = useDispatch();

//   const userLogin = useSelector((state) => state.userLogin);
//   const { userInfo } = userLogin;

//   const userUpdate = useSelector((state) => state.userUpdate);
//   const { loading, error, success } = userUpdate;

//   useEffect(() => {
//     if (!userInfo) {
//       history.push("/");
//     } else {
//       setName(userInfo.name);
//       setEmail(userInfo.email);
//       setPic(userInfo.pic);
//     }
//   }, [history, userInfo]);

//   const postDetails = (pics) => {
//     setPicMessage(null);
//     if (pics.type === "image/jpeg" || pics.type === "image/png") {
//       const data = new FormData();
//       data.append("file", pics);
//       data.append("upload_preset", "notezipper");
//       data.append("cloud_name", "piyushproj");
//       fetch("https://api.cloudinary.com/v1_1/piyushproj/image/upload", {
//         method: "post",
//         body: data,
//       })
//         .then((res) => res.json())
//         .then((data) => {
//           setPic(data.url.toString());
//           console.log(pic);
//         })
//         .catch((err) => {
//           console.log(err);
//         });
//     } else {
//       return setPicMessage("Please Select an Image");
//     }
//   };

//   const submitHandler = (e) => {
//     e.preventDefault();

//     dispatch(updateProfile({ name, email, password, pic }));
//   };

//   return (
//     <MainScreen title="EDIT PROFILE">
//       <div>
//         <Row className="profileContainer">
//           <Col md={6}>
//             <Form onSubmit={submitHandler}>
//               {loading && <Loading />}
//               {success && (
//                 <ErrorMessage variant="success">
//                   Updated Successfully
//                 </ErrorMessage>
//               )}
//               {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
//               <Form.Group controlId="name">
//                 <Form.Label>Name</Form.Label>
//                 <Form.Control
//                   type="text"
//                   placeholder="Enter Name"
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                 ></Form.Control>
//               </Form.Group>
//               <Form.Group controlId="email">
//                 <Form.Label>Email Address</Form.Label>
//                 <Form.Control
//                   type="email"
//                   placeholder="Enter Email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                 ></Form.Control>
//               </Form.Group>
//               <Form.Group controlId="password">
//                 <Form.Label>Password</Form.Label>
//                 <Form.Control
//                   type="password"
//                   placeholder="Enter Password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                 ></Form.Control>
//               </Form.Group>
//               <Form.Group controlId="confirmPassword">
//                 <Form.Label>Confirm Password</Form.Label>
//                 <Form.Control
//                   type="password"
//                   placeholder="Confirm Password"
//                   value={confirmPassword}
//                   onChange={(e) => setConfirmPassword(e.target.value)}
//                 ></Form.Control>
//               </Form.Group>{" "}
//               {picMessage && (
//                 <ErrorMessage variant="danger">{picMessage}</ErrorMessage>
//               )}
//               <Form.Group controlId="pic">
//                 <Form.Label>Change Profile Picture</Form.Label>
//                 <Form.File
//                   onChange={(e) => postDetails(e.target.files[0])}
//                   id="custom-file"
//                   type="image/png"
//                   label="Upload Profile Picture"
//                   custom
//                 />
//               </Form.Group>
//               <Button type="submit" varient="primary">
//                 Update
//               </Button>
//             </Form>
//           </Col>
//           <Col
//             style={{
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//             }}
//           >
//             <img src={pic} alt={name} className="profilePic" />
//           </Col>
//         </Row>
//       </div>
//     </MainScreen>
//   );
// };

// export default UserProfilePage;