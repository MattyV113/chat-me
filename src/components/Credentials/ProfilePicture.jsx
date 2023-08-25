import PropTypes from 'prop-types';
import { useState } from 'react';
import { imageData } from '../../ImageData';
import '/src/App.css';

function ProfilePicture({ profileImage, setProfileImage }) {
  const images = imageData;
  const [userImgChosen, setUserImgChosen] = useState(false);

  const handleImgChange = (e) => {
    setProfileImage(e.target.src);
    setUserImgChosen(true);
  };
  console.log(profileImage);

  const handleChangeImage = () => {
    setUserImgChosen(false);
    setProfileImage('');
  };
  return (
    <>
      <div
        className={
          userImgChosen ? 'm-auto h-[300px]' : 'm-auto grid gap-6 grid-cols-3'
        }
      >
        {userImgChosen ? (
          <div>
            <h1>Image Chosen</h1>
            <img
              className="w-[100px] profileImg h-[100px]"
              src={profileImage}
            />
            <button
              className="bg-green-400 p-2 rounded"
              onClick={handleChangeImage}
            >
              Choose New
            </button>
          </div>
        ) : (
          images.map((image) => {
            return (
              <img
                key={image.id}
                onClick={handleImgChange}
                className="border rounded"
                src={image.src}
                alt="user-image"
              />
            );
          })
        )}
      </div>
    </>
  );
}

ProfilePicture.propTypes = {
  profileImage: PropTypes.string,
  setProfileImage: PropTypes.func,
};

export default ProfilePicture;
