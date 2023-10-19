import { useState, useEffect } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import Alert from "./Alert";
import LoadingBar from "react-top-loading-bar"; // Import LoadingBar

const UserProfile = () => {
  // eslint-disable-next-line
  const [loading, setLoading] = useState(false); // Add loading state
  const [progress, setProgress] = useState(0); // State for the loading bar

  const [userDetails, setUserDetails] = useState({
    firstname: "",
    lastname: "",
    photo: null,
  });

  const [token, setToken] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [updatedFullName, setUpdatedFullName] = useState("");

  const [alert, setAlert] = useState({
    type: null,
    message: "",
  });

  useEffect(() => {
    const storedToken = localStorage.getItem("userToken");
    if (storedToken) {
      setToken(storedToken);
    }

    function decodeToken() {
      if (storedToken) {
        try {
          const decodedToken = jwt_decode(storedToken);
          if (decodedToken && decodedToken.name) {
            return decodedToken.name;
          }
        } catch (error) {
          console.error("Error decoding the token:", error);
        }
      }
      return null;
    }

    const decodedName = decodeToken();

    if (decodedName) {
      setUpdatedFullName(decodedName);
    }

    // Retrieve user's full name from local storage
    const storedFullName = localStorage.getItem("userFullName");
    if (storedFullName) {
      setUpdatedFullName(storedFullName);
    }

    // Retrieve the profile image from local storage
    const storedProfileImage = localStorage.getItem("profileImage");
    if (storedProfileImage) {
      setProfileImage(storedProfileImage);
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];

    const resizeImage = (image) => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      canvas.width = 300;
      canvas.height = 300;
      ctx.beginPath();
      ctx.arc(150, 150, 150, 0, Math.PI * 2);
      ctx.closePath();
      ctx.clip();
      ctx.drawImage(image, 0, 0, 300, 300);
      return canvas.toDataURL("image/jpeg");
    };

    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const image = new Image();
        image.src = event.target.result;
        image.onload = () => {
          const profileImageBase64 = resizeImage(image);
          setProfileImage(profileImageBase64);

          // Save the updated profile picture in local storage
          localStorage.setItem("profileImage", profileImageBase64);
        };
      };
      reader.readAsDataURL(file);
      setUserDetails({ ...userDetails, photo: file });
    } else {
      setProfileImage(
        "https://cdn.pixabay.com/photo/2018/08/28/12/41/avatar-3637425_1280.png"
      );
      setUserDetails({ ...userDetails, photo: null });
    }
  };

  const handleUpdateProfile = async () => {
    setLoading(true); // Start loading

    // Reset the alert state
    setAlert({
      type: null,
      message: "",
    });

    const requestData = {
      locale: "en-US",
      firstname: userDetails.firstname,
      lastname: userDetails.lastname,
    };

    try {
      // eslint-disable-next-line
      const response = await axios.post(
        "https://www.api.greenweblab.com/v1/user/profile-update",
        requestData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setProgress(99.9999);
      // console.log(response.data);

      const newFullName = `${userDetails.firstname} ${userDetails.lastname}`;
      setUpdatedFullName(newFullName);
      localStorage.setItem("userFullName", newFullName);

      setAlert({
        type: "success",
        message: "Profile updated successfully",
      });

      // Delay the hiding of the progress bar after 1 second
      setTimeout(() => {
        setLoading(false); // Stop loading
        setProgress(100); // Reset the progress
      }, 1000);
    } catch (error) {
      console.error("Error updating profile", error);
      setAlert({
        type: "danger",
        message: "Error updating profile",
      });
      setLoading(false); // Stop loading in case of an error
    }
  };

  return (
    <div className="container" style={{ marginTop: "100px" }}>
      <LoadingBar color="#f11946" progress={progress} />
      <div className="text-center">
        {alert.type && alert.message && (
          <Alert type={alert.type} message={alert.message} />
        )}
      </div>

      <div className="user-name " style={{ textAlign: "center" }}>
        <h1 className="mb-3">{updatedFullName}</h1>
      </div>
      <div className="profile-image">
        <div className="circular-image" style={{ marginLeft: "38%" }}>
          <img
            src={
              profileImage
                ? profileImage
                : "https://cdn.pixabay.com/photo/2018/08/28/12/41/avatar-3637425_1280.png"
            }
            alt="Profile"
            className="profile-image-circular"
          />
        </div>

        <input
          type="file"
          onChange={handlePhotoChange}
          className="form-control-file"
        />
      </div>
      <div className="form-group">
        <label>First Name:</label>
        <input
          type="text"
          name="firstname"
          value={userDetails.firstname}
          onChange={handleInputChange}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label>Last Name:</label>
        <input
          type="text"
          name="lastname"
          value={userDetails.lastname}
          onChange={handleInputChange}
          className="form-control"
        />
      </div>
      <button
        onClick={handleUpdateProfile}
        className="btn btn-primary mt-3"
        style={{ marginLeft: "45%" }}
      >
        Update Profile
      </button>
    </div>
  );
};

export default UserProfile;
