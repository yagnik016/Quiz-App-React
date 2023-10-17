const handlePhotoChange = (e) => {
    const file = e.target.files[0];
  
    // Create a function to resize the image
    const resizeImage = (image) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = 300;
      canvas.height = 300;
      ctx.beginPath();
      ctx.arc(150, 150, 150, 0, Math.PI * 2);
      ctx.closePath();
      ctx.clip();
      ctx.drawImage(image, 0, 0, 300, 300);
      return canvas.toDataURL('image/jpeg');
    };
  
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const image = new Image();
        image.src = event.target.result;
        image.onload = () => {
          // Resize the image and set it for display
          setProfileImage(resizeImage(image));
        };
      };
      reader.readAsDataURL(file);
      setUserDetails({ ...userDetails, photo: file });
    } else {
      // If no image is selected, set a placeholder image
      setProfileImage('https://cdn.pixabay.com/photo/2018/08/28/12/41/avatar-3637425_1280.png');
      setUserDetails({ ...userDetails, photo: null });
    }
  };