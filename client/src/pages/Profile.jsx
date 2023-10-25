import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase.js";
import {
  updateUserSuccess,
  updateUserStart,
  updateUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signOutUserSuccess,
  signOutUserFailure,
  signOutUserStart,
} from "../redux/user/userSlice.js";
import { useDispatch } from "react-redux";
import {Link} from 'react-router-dom'

export default function Profile() {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [file, setFile] = useState(undefined);
  const dispatch = useDispatch()
  const [updateSuccess, setUpdateSuccess] = useState(false);
  

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, avatar: downloadURL });
        });
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart())
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      })
      const data = await res.json();
      if(data.success === false) {
        dispatch(updateUserFailure(data.message))
        return
      }
      dispatch(updateUserSuccess(data))
      setUpdateSuccess(true)
    } catch (error) {
      dispatch(updateUserFailure(error.message))
    }
  };

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart())
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
      })
      const data = await res.json();
      if(data.seccuss === false) {
        dispatch(deleteUserFailure(data.message))
      }
      dispatch(deleteUserSuccess())
    } catch (error) {
      dispatch(deleteUserFailure(error.message))
    }
  }

  const handleSignOutUser = async () => {
    try {
      dispatch(signOutUserStart())
      const res = await fetch('/api/auth/signout')

      const data = await res.json()
      if(data.success === false) {
        dispatch(signOutUserFailure(data.message))
        return
      }
      dispatch(signOutUserSuccess())
    } catch (error) {
      dispatch(signOutUserFailure(error.message))
    }
  }

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold my-7 text-center">Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
        />
        <img
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
          referrerPolicy="no-referrer"
          onClick={() => fileRef.current.click()}
          src={formData.avatar || currentUser.avatar}
          alt="profile"
        />
        <p className="text-center">
          {fileUploadError ? (
            <span className="text-red-700">
              Error Image upload (image must be less than 2 mb)
            </span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className="text-slate-700">{`Uploading ${filePerc}%`}</span>
          ) : filePerc === 100 ? (
            <span className="text-green-700">Image successfully uploaded!</span>
          ) : (
            ""
          )}
        </p>
        <input
          className="border p-3 rounded-lg"
          defaultValue={currentUser.username}
          onChange={handleChange}
          id="username"
          type="text"
          placeholder="username"
        />
        <input
          className="border p-3 rounded-lg"
          defaultValue={currentUser.email}
          onChange={handleChange}
          id="email"
          type="email"
          placeholder="email"
        />
        <input
          className="border p-3 rounded-lg"
          onChange={handleChange}
          id="password"
          type="password"
          placeholder="password"
        />
        <button disabled={loading} className="bg-slate-700 text-white p-3 rounded-xl uppercase hover:opacity-95 disabled:opacity-80">
          {loading ? 'Loading...' : "Update"}
        </button>
        <Link to={"/create-listing"}
        className="bg-green-700 text-white p-3 rounded-lg uppercase text-center hover:opacity-95">Create-listing</Link>
      </form>
      <div className="flex justify-between mt-5">
        <span onClick={handleDeleteUser} className="text-red-700 cursor-pointer">Delete Account</span>
        <span onClick={handleSignOutUser} className="text-red-700 cursor-pointer">Sign Out</span>
      </div>

      <p className="text-red-700 mt-5 text-center">{error ? error : ""}</p>
      <p className="text-green-700 mt-5 text-center">{updateSuccess ? "User is updated" : ""}</p>
    </div>
  );
}
