import React, { useState } from 'react';
import './ProfileEdit.css';
import Header from '../../components/Header2/Header2';

function ProfileEditPage() {

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    bio: "",
    profilePicture: ""
  });

  const [imagePreview, setImagePreview] = useState(profile.profilePicture);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProfile({
      ...profile,
      [name]: value
    });
  };


  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setProfile({
          ...profile,
          profilePicture: reader.result
        });
      };
      reader.readAsDataURL(file);
    }
  };


  const handleRemoveImage = () => {
    setImagePreview("");
    setProfile({
      ...profile,
      profilePicture: ""
    });
  };


  const handleSubmit = (event) => {
    event.preventDefault();

    console.log('Perfil salvo:', profile);
  };

  return (
    <><div><Header /></div>
    <div className="profile-edit-page">
      <h2>Editar Perfil</h2>
      <form onSubmit={handleSubmit} className="edit-form">

        <div className="form-group">
          <input
            type="file"
            id="profilePicture"
            name="profilePicture"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: "none" }} />


          {!imagePreview && (
            <label htmlFor="profilePicture" className="custom-file-upload">
              Escolher foto
            </label>
          )}

          <div className="image-preview">
            {imagePreview ? (
              <>
                <img src={imagePreview} alt="Profile" />
                <button type="button" onClick={handleRemoveImage} className="remove-button">
                  Remover Foto
                </button>
              </>
            ) : (
              null
            )}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="name">Nome:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={profile.name}
            onChange={handleInputChange}
            required />
        </div>

        <div className="form-group">
          <label htmlFor="email">E-mail:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={profile.email}
            onChange={handleInputChange}
            required />
        </div>

        <div className="form-group">
          <label htmlFor="bio">Bio:</label>
          <textarea
            id="bio"
            name="bio"
            value={profile.bio}
            onChange={handleInputChange}
            rows="4" />
        </div>

        <button type="submit" className="save-button">Salvar</button>
      </form>
    </div></>
  );
}

export default ProfileEditPage;
