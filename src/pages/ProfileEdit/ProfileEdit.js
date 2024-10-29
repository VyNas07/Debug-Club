import React, { useState, useEffect } from 'react';
import './ProfileEdit.css';
import Header from '../../components/Header2/Header2';
import { updateUserProfile } from '../../services/userService';
import { auth, db } from '../../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';


function ProfileEditPage() {
  const validateName = (name) => {
    return name.length >= 5 && name.length <=20
  }
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    name: "",
    profession: "",
    bio: "",
    profilePicture: ""
  });
  const [isValidName, setIsValidName] = useState(true);
  const [imagePreview, setImagePreview] = useState(profile.profilePicture);

  // Função para buscar dados do usuário no Firebase
  const fetchUserProfile = async (userId) => {
    const userDocRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      const userData = userDoc.data();
      setProfile(prevProfile => ({
        ...prevProfile,
        name: userData.name || "", // Preenche o nome já salvo
        profession: userData.profession || "", // Preenche a profissão se existir
        bio: userData.bio || "", // Preenche a bio se existir
        profilePicture: userData.profilePicture || "" // Preenche a imagem se existir
      }));
      setImagePreview(userData.profilePicture || ""); // Prepara a imagem para visualização
    }
  };

  useEffect(() => {
    const userId = auth.currentUser.uid;
    fetchUserProfile(userId); // Chama a função ao montar o componente
  }, []);

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

  const handleSubmit = async (event) => {
    event.preventDefault();

    const userId = auth.currentUser.uid;

    try {
      await updateUserProfile(userId, profile);
      console.log('Perfil salvo:', profile);
      navigate('/profile');
    } catch (error) {
      console.error("Erro ao salvar o perfil: ", error);
    }
  };

  return (
    <>
      <div><Header /></div>
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
              ) : null}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="name">Nome:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={profile.name}
              onChange={(e) => {
                handleInputChange(e);
                setIsValidName(validateName(e.target.value));
              }}
              className={!validateName(profile.name) ? 'input-error' : ''}
            />
            {!validateName(profile.name) && (
              <p className="error-message">Nome deve ter entre 5 e 20 caracteres.</p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="profession">Profissão:</label>
            <input
              type="text"
              id="profession"
              name="profession"
              value={profile.profession}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="bio">Bio:</label>
            <textarea
              id="bio"
              name="bio"
              value={profile.bio}
              onChange={handleInputChange}
              rows="4"
              maxLength="320"
            />
          </div>

          <button type="submit" className="save-button">Salvar</button>
        </form>
      </div>
    </>
  );
}

export default ProfileEditPage;
